# Özel Domain (Alan Adı) Bağlama Rehberi

Satın aldığınız domaini (örn: `cadirmarket.com`) Vercel'deki projenize bağlamak için aşağıdaki adımları izleyin.

## 1. Adım: Vercel'e Domain Ekleme
1. [Vercel Dashboard](https://vercel.com/dashboard) üzerinden `cadirmarket` projenize girin.
2. **Settings** (Ayarlar) sekmesine tıklayın.
3. Sol menüden **Domains** seçeneğine tıklayın.
4. Domain adınızı (örn: `cadirmarket.com`) kutuya yazın ve **Add** butonuna basın.
5. Vercel size önerilen bir yönlendirme seçeneği sunacaktır (genelde `www.cadirmarket.com` ve `cadirmarket.com` ikisini de ekler). **Add** diyerek devam edin.

## 2. Adım: DNS Ayarlarını Yapılandırma
Domaini satın aldığınız firmanın (GoDaddy, Namecheap, Google Domains, Natro, vb.) paneline gidip DNS ayarlarını değiştirmeniz gerekecek. Vercel size 2 seçenek sunar:

### Seçenek A: Nameservers (Önerilen)
Domaininizin tüm yönetimini Vercel'e devretmek isterseniz, domain firmanızın panelinden "Nameservers" (Ad Sunucuları) kısmını şu şekilde değiştirin:
- `ns1.vercel-dns.com`
- `ns2.vercel-dns.com`

### Seçenek B: A Record ve CNAME (Sadece yönlendirme)
Eğer nameserver değiştirmek istemiyorsanız, DNS yönetimi sayfasından şu kayıtları ekleyin:

| Type | Name (Host) | Value (Target) |
|------|-------------|----------------|
| A    | @           | `76.76.21.21`  |
| CNAME| www         | `cname.vercel-dns.com` |

*Not: Bu ayarların dünya genelinde yayılması (propagation) 1-24 saat sürebilir, ancak genelde 15-30 dakikada aktif olur.*

## 3. Adım: Sanity CORS Ayarını Güncelleme (Çok Önemli!)
Domaininiz aktif olduğunda, ürünlerin sitede görünebilmesi için Sanity'ye bu yeni adresi bildirmeniz şarttır.

1. [Sanity Manage](https://www.sanity.io/manage) adresine gidin.
2. Projenizi seçin (`pge31kjb`).
3. **API** sekmesine > **CORS Origins** kısmına gelin.
4. **Add CORS Origin** butonuna basın.
5. Yeni domaininizi ekleyin (örn: `https://cadirmarket.com` ve `https://www.cadirmarket.com`).
6. **Allow credentials** kutucuğunu işaretleyip kaydedin.

Artık siteniz kendi domaininiz üzerinden yayında! 🚀

## Natro İçin Özel Adımlar

Natro panelinde işlem yapmak bazen karışık olabilir. İşte adım adım Natro rehberi:

### Yöntem 1: Name Server Değiştirme (En Kolayı)
1. **Natro Müşteri Paneli**ne giriş yapın.
2. Üst menüden **Alan Adı Yönetimi** > **Aktif Alan Adlarınız** sayfasına gidin.
3. Domaininizin yanındaki **Yönet** butonuna tıklayın.
4. Açılan sayfada **Name Server (NS) Güncelleme** veya benzeri bir seçenek göreceksiniz.
5. Mevcut NS kayıtlarını silin ve Vercel'inkileri yazın:
   - **NS1:** `ns1.vercel-dns.com`
   - **NS2:** `ns2.vercel-dns.com`
6. Kaydet/Güncelle butonuna basın.

### Yöntem 2: DNS Kaydı Ekleme (A ve CNAME)
Eğer NS değiştirmek istemiyorsanız (örneğin mailleriniz Natro'da kalsın istiyorsanız):
1. Yine domain yönetim sayfasına gidin.
2. **Gelişmiş DNS Yönetimi** veya **DNS Kayıtları** sekmesini bulun.
3. **Yeni Kayıt Ekle** diyerek şu iki kaydı girin:

   **Kayıt 1 (Ana Domain için):**
   - **Kayıt Tipi:** A Record
   - **Host/Alt Alan Adı:** @ (veya boş bırakın)
   - **IP Adresi/Değer:** `76.76.21.21`

   **Kayıt 2 (www için):**
   - **Kayıt Tipi:** CNAME
   - **Host/Alt Alan Adı:** www
   - **Değer/Hedef:** `cname.vercel-dns.com`

4. Kaydedin.

