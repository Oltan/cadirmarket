// scripts/fix-categories.ts
// Yanlış oluşturulan kategorileri siler

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

// Doğru kategori listesi (PDF'den)
const VALID_CATEGORIES = [
  'KAYAR-SABIT CATI SISTEMLERI',
  'YAN KAYAR PERDE AKSESUARLARI',
  'KAPSUL',
  'CATI KAPSULU',
  'OVAL KAPSUL',
  'O 45 X 14 KAPSUL',
  'KOPRU',
  'KANCA',
  'HALKA',
  'HALKA UCU',
  'TOKA',
  'HALAT UCU',
  'HALAT',
  'LASTIK',
  'KAYIS',
  'KOLAN',
  'GERDIRME APARAT',
  'IP',
  'KALIP - DELGI',
  'MAKAS',
  'CIT CIT',
  'PERCIN',
  'FERMUAR',
  'DIKIS IPI',
  'TEKSTIL BANT',
  'MIKNATIS',
  'TENTE AKSESUAR',
  'PRES',
  'PVC BRANDA',
  'PVC BRANDA HEYTEX',
  'P.E. BRANDA',
  'SEFFAF PVC',
  'SICAK HAVA KAYNAK MAKINALARI',
  'PNOMATIK KAPSUL CAKMA MAKINALARI',
  'HIDROLIK KAPSUL CAKMA MAKINALARI',
]

async function fixCategories() {
  console.log('🔧 Kategoriler düzeltiliyor...\n')

  // Tüm kategorileri al
  const allCategories = await client.fetch(`*[_type == "category"]{_id, title}`)
  console.log(`📊 Toplam ${allCategories.length} kategori bulundu\n`)

  // Yanlış kategorileri bul
  const invalidCategories = allCategories.filter(
    (cat: any) => !VALID_CATEGORIES.includes(cat.title)
  )

  console.log(`❌ Silinecek yanlış kategoriler (${invalidCategories.length}):`)
  invalidCategories.forEach((cat: any) => console.log(`   - ${cat.title}`))

  if (invalidCategories.length === 0) {
    console.log('\n✅ Silinecek yanlış kategori yok!')
    return
  }

  // Yanlış kategorileri sil
  console.log('\n🗑️ Siliniyor...')
  const transaction = client.transaction()
  for (const cat of invalidCategories) {
    transaction.delete(cat._id)
  }
  await transaction.commit()

  console.log(`\n✅ ${invalidCategories.length} yanlış kategori silindi!`)

  // Kalan kategorileri göster
  const remainingCategories = await client.fetch(`*[_type == "category"]{title} | order(title)`)
  console.log(`\n📁 Kalan kategoriler (${remainingCategories.length}):`)
  remainingCategories.forEach((cat: any) => console.log(`   ✓ ${cat.title}`))
}

fixCategories().catch(console.error)
