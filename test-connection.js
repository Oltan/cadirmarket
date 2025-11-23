const { createClient } = require('next-sanity');

const client = createClient({
    projectId: 'pge31kjb',
    dataset: 'production',
    apiVersion: '2024-02-22',
    useCdn: false,
});

async function testConnection() {
    try {
        console.log("Bağlantı test ediliyor...");
        const result = await client.fetch('*[_type == "product"]');
        console.log("BAŞARILI! Sanity'den gelen veri:", result);
        console.log("Toplam ürün sayısı:", result.length);
    } catch (error) {
        console.error("HATA: Bağlantı sağlanamadı.", error.message);
    }
}

testConnection();
