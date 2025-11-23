# Siteyi İnternete Yayınlama Rehberi (Vercel ile)

Bu proje Next.js ve Sanity CMS kullandığı için, en iyi ve en kolay yayınlama yöntemi **Vercel** kullanmaktır (Next.js'in yaratıcıları).

## 1. Adım: Kodları GitHub'a Yükleyin
Eğer projeniz henüz GitHub'da değilse:
1. [GitHub](https://github.com/) hesabınıza giriş yapın.
2. Sağ üstteki **+** ikonuna tıklayıp **New repository** seçin.
3. Repository adını girin (örn: `cadirmarket`) ve **Create repository** deyin.
4. VS Code terminalinde şu komutları sırasıyla çalıştırın (GitHub'daki size verilen linki kullanın):

```bash
git remote add origin https://github.com/KULLANICI_ADINIZ/cadirmarket.git
git branch -M main
git push -u origin main
```

## 2. Adım: Vercel'e Dağıtım (Deploy)
1. [Vercel](https://vercel.com/) hesabınıza gidin (GitHub ile giriş yapabilirsiniz).
2. **Add New...** > **Project** butonuna tıklayın.
3. GitHub hesabınızı bağlayın ve `cadirmarket` projesini seçip **Import** deyin.

## 3. Adım: Çevre Değişkenleri (Environment Variables)
Vercel'deki "Configure Project" ekranında **Environment Variables** kısmını açın ve `.env.local` dosyanızdaki değerleri ekleyin:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `pge31kjb` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-02-22` |

Bunları ekledikten sonra **Deploy** butonuna tıklayın.

## 4. Adım: Sanity CORS Ayarları
Siteniz yayınlandıktan sonra (örn: `https://cadirmarket.vercel.app`), Sanity'nin bu adrese izin vermesi gerekir:
1. [Sanity Manage](https://www.sanity.io/manage) adresine gidin.
2. Projenizi seçin (`pge31kjb`).
3. **API** sekmesine gidin.
4. **CORS Origins** kısmına Vercel'in size verdiği site adresini ekleyin (örn: `https://cadirmarket.vercel.app`).
5. "Allow credentials" seçeneğini işaretleyin ve kaydedin.

Tebrikler! Siteniz artık yayında. 🎉
