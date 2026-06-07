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

## Dosyalar / Files

| Dosya                          | Görev / Purpose                                    |
| ------------------------------ | -------------------------------------------------- |
| `deploy/deploy.sh`             | Yerelden SSH ile deploy tetikler                   |
| `deploy/server-deploy.sh`      | Sunucuda çalışır: çek + derle + yeniden başlat     |
| `deploy/deploy.env.example`    | SSH yapılandırma şablonu                            |
| `.github/workflows/deploy.yml` | `main` push'ta otomatik deploy                     |

## Sorun Giderme / Troubleshooting

- **Permission denied (publickey):** Genel anahtarın sunucudaki
  `~/.ssh/authorized_keys` içinde olduğundan ve `SSH_KEY` yolunun doğru
  olduğundan emin olun.
- **docker compose bulunamadı:** Deploy'u `--setup` ile çalıştırın veya
  sunucuya Docker'ı elle kurun.
- **Health check geçmedi:** Sunucuda `docker compose logs -f` ile logları
  inceleyin; portun (`HOST_PORT`) başka bir servis tarafından kullanılmadığını
  doğrulayın.
