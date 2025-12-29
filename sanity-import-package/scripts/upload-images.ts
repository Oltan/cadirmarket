// upload-images.ts
// Cikarilan gorselleri Sanity'ye yukler

import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'

const CONFIG = {
  projectId: 'pge31kjb',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skwVEeeAs1kxPE7pOXK4MPOskcEOvVN5q2Z8mVrC0hYfMLJE6i0YshSuAicM5ZVLz4tpoizQrVK0Hw88RIkOL6LPrt076XwkT5hn4GyH88F1t2CcnfOFuzpaAmtjtpqIlYxVj9iGG2srOjeYG02BlUJittf3bej3PRCwEe6sGTjoxP4SXOzu',
  imagesDir: path.join(__dirname, '..', 'images'),
}

const client = createClient({
  projectId: CONFIG.projectId,
  dataset: CONFIG.dataset,
  apiVersion: CONFIG.apiVersion,
  token: CONFIG.token,
  useCdn: false,
})

// PDF sayfa -> kategori eslestirmesi (PDF yapisina gore)
const PAGE_CATEGORY_MAP: Record<number, string[]> = {
  3: ['KAYAR-SABIT CATI SISTEMLERI'],
  4: ['KAYAR-SABIT CATI SISTEMLERI', 'YAN KAYAR PERDE AKSESUARLARI'],
  5: ['YAN KAYAR PERDE AKSESUARLARI'],
  6: ['KAPSUL'],
  7: ['KAPSUL', 'CATI KAPSULU'],
  8: ['CATI KAPSULU', 'OVAL KAPSUL', 'O 45 X 14 KAPSUL'],
  9: ['KOPRU'],
  10: ['KANCA'],
  11: ['KANCA'],
  12: ['HALKA', 'HALKA UCU', 'TOKA'],
  13: ['TOKA'],
  14: ['TOKA', 'HALAT UCU', 'HALAT'],
  15: ['LASTIK', 'KAYIS', 'KOLAN'],
  16: ['KOLAN', 'GERDIRME APARAT'],
  17: ['IP', 'KALIP - DELGI'],
  18: ['KALIP - DELGI', 'MAKAS'],
  19: ['CIT CIT', 'PERCIN'],
  20: ['FERMUAR'],
  21: ['DIKIS IPI'],
  22: ['TEKSTIL BANT'],
  23: ['MIKNATIS', 'TENTE AKSESUAR'],
  24: ['TENTE AKSESUAR', 'PRES'],
  25: ['PVC BRANDA'],
  26: ['PVC BRANDA'],
  27: ['PVC BRANDA HEYTEX'],
  28: ['PVC BRANDA HEYTEX'],
  29: ['P.E. BRANDA', 'SEFFAF PVC'],
  30: ['SICAK HAVA KAYNAK MAKINALARI'],
  31: ['SICAK HAVA KAYNAK MAKINALARI'],
  32: ['SICAK HAVA KAYNAK MAKINALARI'],
  33: ['PNOMATIK KAPSUL CAKMA MAKINALARI'],
  34: ['HIDROLIK KAPSUL CAKMA MAKINALARI'],
}

async function uploadImage(filePath: string): Promise<string | null> {
  try {
    const imageBuffer = fs.readFileSync(filePath)
    const filename = path.basename(filePath)

    const asset = await client.assets.upload('image', imageBuffer, {
      filename,
    })

    return asset._id
  } catch (error) {
    console.error(`  ! Gorsel yuklenemedi: ${filePath}`, error)
    return null
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ş/g, 's')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/ı/g, 'i')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

async function main() {
  console.log('📸 Gorsel yukleme baslıyor...\n')

  // Tum gorselleri listele
  const imageFiles = fs.readdirSync(CONFIG.imagesDir)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
    .sort()

  console.log(`📁 ${imageFiles.length} gorsel bulundu\n`)

  // Sayfa bazli gruplama
  const pageImages: Record<number, string[]> = {}
  for (const file of imageFiles) {
    const match = file.match(/page(\d+)_img(\d+)/)
    if (match) {
      const pageNum = parseInt(match[1])
      if (!pageImages[pageNum]) pageImages[pageNum] = []
      pageImages[pageNum].push(file)
    }
  }

  // Kategori -> gorsel asset ID eslestirmesi
  const categoryImageMap: Record<string, string> = {}

  // Her sayfa icin en buyuk gorseli bul ve kategorilere ata
  for (const [pageStr, images] of Object.entries(pageImages)) {
    const pageNum = parseInt(pageStr)
    const categories = PAGE_CATEGORY_MAP[pageNum]

    if (!categories || categories.length === 0) continue

    // En buyuk gorseli bul (genelde ana urun gorseli)
    let largestImage = ''
    let largestSize = 0

    for (const img of images) {
      const filePath = path.join(CONFIG.imagesDir, img)
      const stats = fs.statSync(filePath)
      if (stats.size > largestSize) {
        largestSize = stats.size
        largestImage = img
      }
    }

    if (!largestImage) continue

    // Gorseli yukle
    const filePath = path.join(CONFIG.imagesDir, largestImage)
    console.log(`📤 Sayfa ${pageNum}: ${largestImage} (${(largestSize/1024).toFixed(1)} KB)`)

    const assetId = await uploadImage(filePath)
    if (assetId) {
      // Bu sayfadaki tum kategorilere ata
      for (const cat of categories) {
        if (!categoryImageMap[cat]) {
          categoryImageMap[cat] = assetId
          console.log(`   ✅ ${cat} -> ${assetId}`)
        }
      }
    }
  }

  console.log('\n📊 Kategorilere gorsel ataniyor...\n')

  // Kategorileri guncelle
  for (const [categoryName, assetId] of Object.entries(categoryImageMap)) {
    const slug = slugify(categoryName)
    const categoryId = `category-${slug}`

    try {
      await client
        .patch(categoryId)
        .set({
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: assetId,
            },
          },
        })
        .commit()

      console.log(`  ✅ ${categoryName}`)
    } catch (error: any) {
      console.log(`  ❌ ${categoryName}: ${error.message}`)
    }
  }

  // Urunlere de kategori gorsellerini ata (kategorisi olan urunler icin)
  console.log('\n📦 Urunlere gorsel ataniyor...\n')

  const products = await client.fetch(`*[_type == "product" && defined(category)]{
    _id,
    title,
    "categoryTitle": category->title
  }`)

  let updatedCount = 0
  for (const product of products) {
    const assetId = categoryImageMap[product.categoryTitle]
    if (assetId) {
      try {
        await client
          .patch(product._id)
          .set({
            mainImage: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: assetId,
              },
              alt: product.title,
            },
          })
          .commit()

        updatedCount++
        if (updatedCount % 50 === 0) {
          console.log(`  📊 ${updatedCount} urun guncellendi...`)
        }
      } catch (error) {
        // Sessizce devam et
      }
    }
  }

  console.log(`\n✅ ${updatedCount} urun gorseli guncellendi!`)
  console.log('\n🎉 Gorsel yukleme tamamlandi!')
}

main().catch(console.error)
