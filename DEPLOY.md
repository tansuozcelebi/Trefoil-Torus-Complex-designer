# Otomatik Dağıtım (SSH) / Automatic Deployment (SSH)

Bu proje Docker + nginx ile paketlenmiştir. Bu kılavuz, SSH üzerinden
otomatik dağıtım için iki yöntem açıklar:

1. **Elle / yerel script** — kendi makinenizden tek komutla sunucuya deploy.
2. **GitHub Actions** — `main` dalına her push'ta otomatik deploy.

This project is packaged with Docker + nginx. This guide covers two ways to
deploy automatically over SSH: a local one-command script, and a GitHub
Actions workflow that deploys on every push to `main`.

---

## 1. Yerel Script ile Deploy / Deploy with the local script

### Hazırlık / Setup

```bash
# Yapılandırmayı kopyala / copy the config
cp deploy/deploy.env.example deploy/deploy.env

# deploy/deploy.env içini sunucu bilgilerinizle doldurun:
#   SSH_HOST, SSH_USER, SSH_PORT, SSH_KEY, REMOTE_DIR, DEPLOY_BRANCH, HOST_PORT
```

`deploy/deploy.env` dosyası `.gitignore` ile dışlanmıştır; sırlarınız yerelde kalır.

### İlk kurulum (sunucuya Docker yükler) / First-time provisioning

Sunucuda Docker yoksa, bir kez `--setup` ile çalıştırın:

```bash
./deploy/deploy.sh --setup
```

Bu, sunucuya Docker kurar, repoyu klonlar, imajı derler ve başlatır.

### Sonraki dağıtımlar / Subsequent deploys

```bash
./deploy/deploy.sh
```

Bu komut SSH ile bağlanır, en güncel kodu çeker (`git reset --hard`),
Docker imajını yeniden derler, container'ı yeniden başlatır ve
`/health` üzerinden sağlık kontrolü yapar.

---

## 2. GitHub Actions ile Otomatik Deploy / Automatic deploy via GitHub Actions

`.github/workflows/deploy.yml` her `main` push'unda çalışır (ayrıca elle de
tetiklenebilir). SSH üzerinden sunucuya bağlanıp `deploy/server-deploy.sh`
scriptini çalıştırır.

### Gerekli Secrets / Required repository secrets

GitHub → **Settings → Secrets and variables → Actions → Secrets**:

| Secret             | Açıklama / Description                              |
| ------------------ | -------------------------------------------------- |
| `SSH_PRIVATE_KEY`  | Sunucuya erişen özel anahtar (tam içerik)          |
| `SSH_HOST`         | Sunucu adı veya IP                                 |
| `SSH_USER`         | SSH kullanıcısı                                    |
| `SSH_PORT`         | SSH portu (varsayılan 22)                          |

### Gerekli Variables / Required repository variables

GitHub → **Settings → Secrets and variables → Actions → Variables**:

| Variable      | Örnek / Example                                                             |
| ------------- | -------------------------------------------------------------------------- |
| `REMOTE_DIR`  | `/opt/trefoil-torus-complex`                                               |
| `REPO_URL`    | `https://github.com/tansuozcelebi/Trefoil-Torus-Complex-designer.git`      |
| `HOST_PORT`   | `8080`                                                                      |

### SSH anahtarı oluşturma / Generating the SSH key

Yerel makinenizde / on your machine:

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f deploy_key
```

- `deploy_key` (özel anahtar) → GitHub `SSH_PRIVATE_KEY` secret'ına yapıştırın.
- `deploy_key.pub` (genel anahtar) → sunucuda `~/.ssh/authorized_keys`
  dosyasına ekleyin:

```bash
ssh-copy-id -i deploy_key.pub ${SSH_USER}@${SSH_HOST}
# veya manuel: cat deploy_key.pub >> ~/.ssh/authorized_keys
```

Secrets/variables ayarlandıktan sonra `main`'e push yaptığınızda deploy
otomatik çalışır. **Actions** sekmesinden ilerlemeyi izleyebilirsiniz.

---

---

## 3. SiteGround'a Deploy / Deploy to SiteGround

> **Önemli:** SiteGround paylaşımlı hosting **Docker desteklemez.** Bu yüzden
> SiteGround için Docker akışı yerine statik site `dist/` çıktısı build edilip
> SSH/rsync ile `public_html`'e yüklenir. SPA yönlendirmesi `public/.htaccess`
> (Apache) ile sağlanır.
>
> **Note:** SiteGround shared hosting does not support Docker, so we build the
> static `dist/` and rsync it into `public_html`. SPA routing is handled by
> `public/.htaccess` (Apache).

### Web kökü / Document root

```
~/www/<alanadiniz.com>/public_html
```

SSH'ta doğrulamak için: `cd ~ && ls www` (domain klasörlerini gösterir).
SiteGround SSH portu varsayılan **18765**'tir.

### Yerel script ile / With the local script

```bash
cp deploy/siteground.env.example deploy/siteground.env
# deploy/siteground.env içini doldurun: SG_HOST, SG_USER, SG_PORT, SG_KEY, SG_REMOTE_DIR

./deploy/siteground-deploy.sh             # build + rsync ile yükle
./deploy/siteground-deploy.sh --no-build  # mevcut dist/'i yükle
```

### GitHub Actions ile / With GitHub Actions

`.github/workflows/deploy-siteground.yml` her `main` push'unda build edip rsync'ler.
Passphrase korumalı SSH anahtarını `ssh-agent`'a yükler.

**Secrets** (Settings → Secrets and variables → Actions → Secrets):

| Secret                      | Açıklama / Description                       |
| --------------------------- | -------------------------------------------- |
| `SITEGROUND_SSH_KEY`        | SiteGround'a yetkili özel anahtar (tam içerik) |
| `SITEGROUND_SSH_PASSPHRASE` | Özel anahtarın parolası                       |
| `SITEGROUND_SSH_HOST`       | SSH adresi / IP                               |
| `SITEGROUND_SSH_USER`       | SSH kullanıcı adı (Site Tools'tan)            |
| `SITEGROUND_SSH_PORT`       | SSH portu (genelde `18765`)                   |
| `SITEGROUND_DEPLOY_PATH`    | Hedef dizin, örn. `~/www/alanadiniz.com/public_html` |

SiteGround SSH anahtarını Site Tools → **Devs → SSH Keys Manager** üzerinden
ekleyin; özel anahtarı `SITEGROUND_SSH_KEY`, parolasını
`SITEGROUND_SSH_PASSPHRASE` secret'ına yapıştırın.

---

## Dosyalar / Files

| Dosya                                    | Görev / Purpose                                    |
| ---------------------------------------- | -------------------------------------------------- |
| `deploy/deploy.sh`                       | Yerelden SSH ile Docker deploy tetikler            |
| `deploy/server-deploy.sh`                | Sunucuda: çek + derle + yeniden başlat (Docker)    |
| `deploy/deploy.env.example`              | SSH/Docker yapılandırma şablonu                    |
| `deploy/siteground-deploy.sh`            | SiteGround: build + rsync ile `public_html`'e yükle |
| `deploy/siteground.env.example`          | SiteGround yapılandırma şablonu                    |
| `public/.htaccess`                       | Apache SPA yönlendirme + cache + güvenlik başlıkları |
| `.github/workflows/deploy.yml`           | `main` push'ta Docker SSH deploy                   |
| `.github/workflows/deploy-siteground.yml`| `main` push'ta SiteGround rsync deploy             |

## Sorun Giderme / Troubleshooting

- **Permission denied (publickey):** Genel anahtarın sunucudaki
  `~/.ssh/authorized_keys` içinde olduğundan ve `SSH_KEY` yolunun doğru
  olduğundan emin olun.
- **docker compose bulunamadı:** Deploy'u `--setup` ile çalıştırın veya
  sunucuya Docker'ı elle kurun.
- **Health check geçmedi:** Sunucuda `docker compose logs -f` ile logları
  inceleyin; portun (`HOST_PORT`) başka bir servis tarafından kullanılmadığını
  doğrulayın.
