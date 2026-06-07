# SiteGround'a Otomatik Dağıtım / Automatic Deployment to SiteGround

Bu proje statik bir site (Vite) olarak build edilir ve SSH/rsync ile
SiteGround `public_html` dizinine yüklenir. SPA yönlendirmesi
`public/.htaccess` (Apache) ile sağlanır.

> **Not:** SiteGround paylaşımlı hosting Docker desteklemez; bu yüzden
> container yerine `dist/` çıktısı yüklenir.
>
> **Note:** SiteGround shared hosting does not support Docker, so the built
> `dist/` output is uploaded instead of running a container.

İki yöntem vardır:

1. **GitHub Actions** — `main` dalına her push'ta otomatik deploy.
2. **Yerel script** — kendi makinenizden tek komutla deploy.

---

## Web kökü / Document root

```
~/www/<alanadiniz.com>/public_html
```

SSH'ta doğrulamak için: `cd ~ && ls www` (domain klasörlerini gösterir).
SiteGround SSH portu varsayılan **18765**'tir.

---

## 1. GitHub Actions ile Otomatik Deploy / Automatic deploy via GitHub Actions

`.github/workflows/deploy-siteground.yml` her `main` push'unda siteyi build
edip rsync ile yükler. Passphrase korumalı SSH anahtarını `ssh-agent`'a
yükler. Secret'lar ayarlı değilse iş sessizce atlanır (yeşil kalır).

**Secrets** (Settings → Secrets and variables → Actions → Secrets):

| Secret                      | Açıklama / Description                            |
| --------------------------- | ------------------------------------------------ |
| `SITEGROUND_SSH_KEY`        | SiteGround'a yetkili özel anahtar (tam içerik)    |
| `SITEGROUND_SSH_PASSPHRASE` | Özel anahtarın parolası                          |
| `SITEGROUND_SSH_HOST`       | SSH adresi / IP                                  |
| `SITEGROUND_SSH_USER`       | SSH kullanıcı adı (Site Tools'tan)               |
| `SITEGROUND_SSH_PORT`       | SSH portu (genelde `18765`)                      |
| `SITEGROUND_DEPLOY_PATH`    | Hedef dizin, örn. `~/www/alanadiniz.com/public_html` |

SiteGround SSH anahtarını Site Tools → **Devs → SSH Keys Manager** üzerinden
ekleyin; özel anahtarı `SITEGROUND_SSH_KEY`, parolasını
`SITEGROUND_SSH_PASSPHRASE` secret'ına yapıştırın. Ayarladıktan sonra Actions
sekmesinden **Run workflow** ile elle de tetikleyebilirsiniz.

---

## 2. Yerel Script ile Deploy / Deploy with the local script

```bash
cp deploy/siteground.env.example deploy/siteground.env
# deploy/siteground.env içini doldurun:
#   SG_HOST, SG_USER, SG_PORT, SG_KEY, SG_REMOTE_DIR

./deploy/siteground-deploy.sh             # build + rsync ile yükle
./deploy/siteground-deploy.sh --no-build  # mevcut dist/'i yükle
```

`deploy/siteground.env` dosyası `.gitignore` ile dışlanmıştır; sırlarınız
yerelde kalır. Anahtarınız passphrase korumalıysa, SSH bağlantı sırasında
parolayı soracaktır (veya yerel `ssh-agent`'ınızdan alır).

---

## Dosyalar / Files

| Dosya                                    | Görev / Purpose                                       |
| ---------------------------------------- | ----------------------------------------------------- |
| `deploy/siteground-deploy.sh`            | SiteGround: build + rsync ile `public_html`'e yükle   |
| `deploy/siteground.env.example`          | SiteGround yapılandırma şablonu                       |
| `public/.htaccess`                       | Apache SPA yönlendirme + cache + güvenlik başlıkları  |
| `.github/workflows/deploy-siteground.yml`| `main` push'ta SiteGround rsync deploy                |

## Sorun Giderme / Troubleshooting

- **Permission denied (publickey):** Genel anahtarın SiteGround Site Tools →
  SSH Keys Manager'a ekli olduğundan ve doğru özel anahtarı kullandığınızdan
  emin olun.
- **rsync passphrase'de takılıyor (CI):** `SITEGROUND_SSH_PASSPHRASE`
  secret'ının doğru ayarlandığını kontrol edin.
- **404 / sayfa yenilenince bozuluyor:** `public/.htaccess`'in `public_html`
  içine yüklendiğini doğrulayın (SPA yönlendirmesini sağlar).
- **Yanlış dizine yükleniyor:** `SITEGROUND_DEPLOY_PATH` değerini sunucuda
  `cd ~ && ls www` ile doğrulayın.
