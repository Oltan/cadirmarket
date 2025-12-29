// scripts/delete-all.ts
// Sanity'deki tüm ürün ve kategorileri siler

import { createClient } from '@sanity/client'

const CONFIG = {
  projectId: 'pge31kjb',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skwVEeeAs1kxPE7pOXK4MPOskcEOvVN5q2Z8mVrC0hYfMLJE6i0YshSuAicM5ZVLz4tpoizQrVK0Hw88RIkOL6LPrt076XwkT5hn4GyH88F1t2CcnfOFuzpaAmtjtpqIlYxVj9iGG2srOjeYG02BlUJittf3bej3PRCwEe6sGTjoxP4SXOzu',
}

const client = createClient({
  projectId: CONFIG.projectId,
  dataset: CONFIG.dataset,
  apiVersion: CONFIG.apiVersion,
  token: CONFIG.token,
  useCdn: false,
})

async function deleteAll() {
  console.log('🗑️ Sanity verilerini temizleme başlıyor...\n')

  // Ürünleri sil
  console.log('📦 Ürünler siliniyor...')
  const products = await client.fetch(`*[_type == "product"]._id`)
  console.log(`   ${products.length} ürün bulundu`)

  if (products.length > 0) {
    const productTransaction = client.transaction()
    for (const id of products) {
      productTransaction.delete(id)
    }
    await productTransaction.commit()
    console.log(`   ✅ ${products.length} ürün silindi`)
  }

  // Kategorileri sil
  console.log('\n📁 Kategoriler siliniyor...')
  const categories = await client.fetch(`*[_type == "category"]._id`)
  console.log(`   ${categories.length} kategori bulundu`)

  if (categories.length > 0) {
    const categoryTransaction = client.transaction()
    for (const id of categories) {
      categoryTransaction.delete(id)
    }
    await categoryTransaction.commit()
    console.log(`   ✅ ${categories.length} kategori silindi`)
  }

  console.log('\n🎉 Temizleme tamamlandı!')
}

deleteAll().catch(console.error)
