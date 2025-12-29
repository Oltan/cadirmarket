// scripts/import-products.ts
// Gema Politek Ürün Kataloğu Import Script

import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'
import { parse } from 'csv-parse/sync'

// ============================================
// YAPILANDIRMA - BU ALANLARI DOLDURUN
// ============================================
const CONFIG = {
  projectId: 'pge31kjb',              // Sanity project ID
  dataset: 'production',              // veya 'development'
  apiVersion: '2024-01-01',
  token: 'skwVEeeAs1kxPE7pOXK4MPOskcEOvVN5q2Z8mVrC0hYfMLJE6i0YshSuAicM5ZVLz4tpoizQrVK0Hw88RIkOL6LPrt076XwkT5hn4GyH88F1t2CcnfOFuzpaAmtjtpqIlYxVj9iGG2srOjeYG02BlUJittf3bej3PRCwEe6sGTjoxP4SXOzu',        // Write yetkili token
  csvPath: './gema_politek_urunler.csv',
  imagesDir: './images',              // Görsel klasörü (opsiyonel)
}

// Sanity Client
const client = createClient({
  projectId: CONFIG.projectId,
  dataset: CONFIG.dataset,
  apiVersion: CONFIG.apiVersion,
  token: CONFIG.token,
  useCdn: false,
})

// ============================================
// YARDIMCI FONKSİYONLAR
// ============================================

// Türkçe karakterleri slug'a uygun hale getir
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

// SEO meta description oluştur
function generateMetaDescription(product: any): string {
  const parts: string[] = []
  
  if (product.title) parts.push(product.title)
  if (product.material) parts.push(`${product.material} malzeme`)
  if (product.coating) parts.push(`${product.coating} kaplama`)
  if (product.category) parts.push(`${product.category} kategorisinde`)
  
  let desc = parts.join(', ')
  if (desc.length > 155) {
    desc = desc.substring(0, 152) + '...'
  }
  
  return desc || `${product.title} - Gema Politek kalitesiyle`
}

// SEO anahtar kelimeleri oluştur
function generateKeywords(product: any): string[] {
  const keywords: string[] = []
  
  if (product.title) {
    // Ürün adından kelimeler
    product.title.split(/[\s-]+/).forEach((word: string) => {
      if (word.length > 2) keywords.push(word.toLowerCase())
    })
  }
  
  if (product.category) keywords.push(product.category.toLowerCase())
  if (product.material) keywords.push(product.material.toLowerCase())
  if (product.coating) keywords.push(product.coating.toLowerCase())
  if (product.model) keywords.push(product.model.toLowerCase())
  if (product.code) keywords.push(product.code)
  
  // Genel terimler
  keywords.push('gema politek', 'branda', 'aksesuar', 'tır', 'tente')
  
  // Benzersiz yap
  return [...new Set(keywords)].slice(0, 10)
}

// Alt text oluştur (görsel için)
function generateAltText(product: any): string {
  const parts = [product.title]
  if (product.code) parts.unshift(product.code)
  if (product.material) parts.push(product.material)
  return parts.join(' - ')
}

// ============================================
// KATEGORİ İMPORT
// ============================================

interface CategoryMap {
  [key: string]: string // kategori adı -> sanity _id
}

async function importCategories(products: any[]): Promise<CategoryMap> {
  console.log('\n📁 Kategoriler oluşturuluyor...')
  
  // Benzersiz kategorileri çıkar
  const uniqueCategories = [...new Set(products.map(p => p.KATEGORI).filter(Boolean))]
  const categoryMap: CategoryMap = {}
  
  for (let i = 0; i < uniqueCategories.length; i++) {
    const categoryName = uniqueCategories[i]
    const slug = slugify(categoryName)
    const docId = `category-${slug}`
    
    const categoryDoc = {
      _id: docId,
      _type: 'category',
      title: categoryName,
      slug: { _type: 'slug', current: slug },
      description: `${categoryName} ürünleri - Gema Politek kalitesiyle`,
      order: i + 1,
      seo: {
        metaTitle: `${categoryName} | Gema Politek`,
        metaDescription: `${categoryName} kategorisindeki tüm ürünler. Kaliteli branda ve aksesuar ürünleri.`,
        keywords: [
          categoryName.toLowerCase(),
          'gema politek',
          'branda',
          'aksesuar',
        ],
      },
    }
    
    try {
      await client.createOrReplace(categoryDoc)
      categoryMap[categoryName] = docId
      console.log(`  ✅ ${categoryName}`)
    } catch (error) {
      console.error(`  ❌ ${categoryName}:`, error)
    }
  }
  
  console.log(`\n📊 ${Object.keys(categoryMap).length} kategori oluşturuldu.`)
  return categoryMap
}

// ============================================
// GÖRSEL UPLOAD
// ============================================

async function uploadImage(imagePath: string, filename: string): Promise<string | null> {
  if (!fs.existsSync(imagePath)) {
    return null
  }
  
  try {
    const imageBuffer = fs.readFileSync(imagePath)
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename,
    })
    return asset._id
  } catch (error) {
    console.error(`  ⚠️ Görsel yüklenemedi: ${filename}`)
    return null
  }
}

// ============================================
// ÜRÜN İMPORT
// ============================================

async function importProducts(products: any[], categoryMap: CategoryMap): Promise<void> {
  console.log('\n📦 Ürünler oluşturuluyor...')
  
  let successCount = 0
  let errorCount = 0
  
  for (const product of products) {
    // Boş satırları atla
    if (!product.URUN && !product.KOD) continue

    const title = product.URUN || 'Isimsiz Urun'
    const code = product.KOD || ''
    const slug = slugify(code ? `${code}-${title}` : title)
    const docId = `product-${slug}`
    
    // Kategori referansı
    const categoryRef = product.KATEGORI && categoryMap[product.KATEGORI]
      ? { _type: 'reference', _ref: categoryMap[product.KATEGORI] }
      : null
    
    // Ürün dokümanı
    const productDoc: any = {
      _id: docId,
      _type: 'product',
      code: code || undefined,
      title: title,
      slug: { _type: 'slug', current: slug },
      description: generateMetaDescription({
        title,
        material: product.MALZEME,
        coating: product.KAPLAMA,
        category: product.KATEGORI,
      }),
      model: product.MODEL || undefined,
      material: product.MALZEME || undefined,
      coating: product.KAPLAMA || undefined,
      quantity: product.MIKTAR || undefined,
      packaging: product.BIRIM_PAKET || undefined,
      brand: 'Gema Politek',
      sku: code || undefined,
      isActive: true,
    }
    
    // Kategori ekle
    if (categoryRef) {
      productDoc.category = categoryRef
    }
    
    // Ölçüler
    const hasDimensions = product.A || product.B || product.D || product.L || product.h || product.s
    if (hasDimensions) {
      productDoc.dimensions = {
        a: product.A || undefined,
        b: product.B || undefined,
        d: product.D || undefined,
        l: product.L || undefined,
        h: product.h || undefined,
        s: product.s || undefined,
      }
    }
    
    // SEO
    productDoc.seo = {
      metaTitle: `${code ? code + ' ' : ''}${title} | Gema Politek`.substring(0, 70),
      metaDescription: generateMetaDescription({
        title,
        material: product.MALZEME,
        coating: product.KAPLAMA,
        category: product.KATEGORI,
      }),
      keywords: generateKeywords({
        title,
        code,
        material: product.MALZEME,
        coating: product.KAPLAMA,
        category: product.KATEGORI,
        model: product.MODEL,
      }),
    }
    
    // Görsel varsa yükle
    const possibleImageNames = [
      `${code}.jpg`,
      `${code}.png`,
      `${slug}.jpg`,
      `${slug}.png`,
    ]
    
    for (const imageName of possibleImageNames) {
      const imagePath = path.join(CONFIG.imagesDir, imageName)
      if (fs.existsSync(imagePath)) {
        const assetId = await uploadImage(imagePath, imageName)
        if (assetId) {
          productDoc.mainImage = {
            _type: 'image',
            asset: { _type: 'reference', _ref: assetId },
            alt: generateAltText({ title, code, material: product.MALZEME }),
          }
        }
        break
      }
    }
    
    // Kaydet
    try {
      await client.createOrReplace(productDoc)
      successCount++
      if (successCount % 50 === 0) {
        console.log(`  📊 ${successCount} ürün işlendi...`)
      }
    } catch (error) {
      errorCount++
      console.error(`  ❌ ${code || title}:`, error)
    }
  }
  
  console.log(`\n✅ ${successCount} ürün başarıyla oluşturuldu.`)
  if (errorCount > 0) {
    console.log(`❌ ${errorCount} ürün hata aldı.`)
  }
}

// ============================================
// ANA FONKSİYON
// ============================================

async function main() {
  console.log('🚀 Gema Politek Ürün Import Başlıyor...\n')
  
  // CSV'yi oku
  console.log('📄 CSV dosyası okunuyor...')
  const csvContent = fs.readFileSync(CONFIG.csvPath, 'utf-8')
  const products = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    relax_column_count: true,
    relax_quotes: true,
  })
  
  console.log(`📊 ${products.length} satır bulundu.`)
  
  // Kategorileri import et
  const categoryMap = await importCategories(products)
  
  // Ürünleri import et
  await importProducts(products, categoryMap)
  
  console.log('\n🎉 Import tamamlandı!')
}

// Çalıştır
main().catch(console.error)
