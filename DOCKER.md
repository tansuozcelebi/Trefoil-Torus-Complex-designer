# Docker Deployment Guide / Docker Dağıtım Kılavuzu

## English

### Prerequisites
- Docker installed (version 20.10 or higher)
- Docker Compose installed (version 2.0 or higher)

### Quick Start

1. **Copy the environment file**
   ```bash
   cp .env.example .env
   ```

2. **Build and run with Docker Compose**
   ```bash
   docker compose up -d
   ```

3. **Access the application**
   Open your browser and navigate to: `http://localhost:8080`

### Configuration

Edit the `.env` file to customize your deployment:

- `HOST_PORT`: The port on your host machine (default: 8080)
- `APP_NAME`: Docker image name
- `APP_VERSION`: Application version tag
- `COMPOSE_PROJECT_NAME`: Docker Compose project name

### Docker Commands

#### Build and start containers
```bash
docker compose up -d
```

#### Stop containers
```bash
docker compose down
```

#### View logs
```bash
docker compose logs -f
```

#### Rebuild image
```bash
docker compose build --no-cache
docker compose up -d
```

#### Check container status
```bash
docker compose ps
```

#### Access container shell
```bash
docker compose exec trefoil-torus-app sh
```

### Using Standalone Docker

If you prefer not to use Docker Compose:

1. **Build the image**
   ```bash
   docker build -t trefoil-torus-complex:latest .
   ```

2. **Run the container**
   ```bash
   docker run -d -p 8080:80 --name trefoil-torus trefoil-torus-complex:latest
   ```

3. **Stop and remove the container**
   ```bash
   docker stop trefoil-torus
   docker rm trefoil-torus
   ```

### Health Check

The application includes a health check endpoint at `/health`. You can verify it's running:

```bash
curl http://localhost:8080/health
```

### Production Deployment

For production deployments:

1. Update the `.env` file with production values
2. Consider using a reverse proxy (nginx, Traefik) for SSL/TLS
3. Set appropriate resource limits in docker-compose.yml
4. Enable log rotation
5. Use Docker secrets for sensitive data

### Troubleshooting

**Container won't start**
```bash
docker compose logs trefoil-torus-app
```

**Port already in use**
Change `HOST_PORT` in `.env` to a different port.

**Build fails**
Ensure all dependencies are correctly installed:
```bash
docker compose build --no-cache
```

---

## Türkçe

### Gereksinimler
- Docker kurulu (sürüm 20.10 veya üzeri)
- Docker Compose kurulu (sürüm 2.0 veya üzeri)

### Hızlı Başlangıç

1. **Ortam dosyasını kopyalayın**
   ```bash
   cp .env.example .env
   ```

2. **Docker Compose ile derleyin ve çalıştırın**
   ```bash
   docker compose up -d
   ```

3. **Uygulamaya erişin**
   Tarayıcınızı açın ve şu adrese gidin: `http://localhost:8080`

### Yapılandırma

Dağıtımınızı özelleştirmek için `.env` dosyasını düzenleyin:

- `HOST_PORT`: Ana makinenizdeki port (varsayılan: 8080)
- `APP_NAME`: Docker imaj adı
- `APP_VERSION`: Uygulama sürüm etiketi
- `COMPOSE_PROJECT_NAME`: Docker Compose proje adı

### Docker Komutları

#### Container'ları derle ve başlat
```bash
docker compose up -d
```

#### Container'ları durdur
```bash
docker compose down
```

#### Logları görüntüle
```bash
docker compose logs -f
```

#### İmajı yeniden derle
```bash
docker compose build --no-cache
docker compose up -d
```

#### Container durumunu kontrol et
```bash
docker compose ps
```

#### Container shell'ine eriş
```bash
docker compose exec trefoil-torus-app sh
```

### Tek Başına Docker Kullanımı

Docker Compose kullanmayı tercih etmiyorsanız:

1. **İmajı derleyin**
   ```bash
   docker build -t trefoil-torus-complex:latest .
   ```

2. **Container'ı çalıştırın**
   ```bash
   docker run -d -p 8080:80 --name trefoil-torus trefoil-torus-complex:latest
   ```

3. **Container'ı durdurun ve kaldırın**
   ```bash
   docker stop trefoil-torus
   docker rm trefoil-torus
   ```

### Sağlık Kontrolü

Uygulama `/health` adresinde bir sağlık kontrol noktası içerir. Çalıştığını doğrulayabilirsiniz:

```bash
curl http://localhost:8080/health
```

### Üretim Dağıtımı

Üretim ortamı için:

1. `.env` dosyasını üretim değerleriyle güncelleyin
2. SSL/TLS için bir reverse proxy (nginx, Traefik) kullanmayı düşünün
3. docker-compose.yml'de uygun kaynak limitleri belirleyin
4. Log rotasyonunu etkinleştirin
5. Hassas veriler için Docker secrets kullanın

### Sorun Giderme

**Container başlamıyor**
```bash
docker compose logs trefoil-torus-app
```

**Port zaten kullanımda**
`.env` dosyasında `HOST_PORT` değerini farklı bir port ile değiştirin.

**Derleme başarısız**
Tüm bağımlılıkların doğru yüklendiğinden emin olun:
```bash
docker compose build --no-cache
```

### Dizin Yapısı

```
Trefoil-Torus-Complex-designer/
├── .dockerignore          # Docker build'den hariç tutulan dosyalar
├── .env.example           # Örnek ortam değişkenleri
├── Dockerfile             # Docker imaj tanımı
├── docker-compose.yml     # Docker Compose yapılandırması
├── nginx.conf             # Nginx web sunucusu yapılandırması
├── DOCKER.md              # Bu dosya
└── ... (diğer proje dosyaları)
```
