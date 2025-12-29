// scripts/generate-ndjson.ts
// CSV'yi NDJSON formatına dönüştürür - Sanity CLI ile doğrudan import edilebilir

import * as fs from 'fs'
import { parse } from 'csv-parse/sync'

const CSV_PATH = './gema_politek_urunler.csv'
const OUTPUT_PATH = './data/products.ndjson'

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

function generateMetaDescription(product: any): string {
  const parts: string[] = []
  if (product.ÜRÜN) parts.push(product.ÜRÜN)
  if (product.MALZEME) parts.push(`${product.MALZEME} malzeme`)
  if (product.KAPLAMA) parts.push(`${product.KAPLAMA} kaplama`)
  if (product.KATEGORİ) parts.push(`${product.KATEGORİ} kategorisinde`)
  
  let desc = parts.join(', ')
  return desc.length > 155 ? desc.substring(0, 152) + '...' : desc
}

function generateKeywords(product: any): string[] {
  const keywords: string[] = []
  
  if (product.ÜRÜN) {
    product.ÜRÜN.split(/[\s-]+/).forEach((word: string) => {
      if (word.length > 2) keywords.push(word.toLowerCase())
    })
  }
  
  if (product.KATEGORİ) keywords.push(product.KATEGORİ.toLowerCase())
  if (product.MALZEME) keywords.push(product.MALZEME.toLowerCase())
  if (product.KAPLAMA) keywords.push(product.KAPLAMA.toLowerCase())
  if (product.KOD) keywords.push(product.KOD)
  
  keywords.push('gema politek', 'branda', 'aksesuar')
  
  return [...new Set(keywords)].slice(0, 10)
}

async function main() {
  console.log('📄 CSV okunuyor...')
  
  const csvContent = fs.readFileSync(CSV_PATH, 'utf-8')
  const products = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  })
  
  console.log(`📊 ${products.length} satır bulundu.`)
  
  // Output klasörünü oluştur
  if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data', { recursive: true })
  }
  
  const documents: any[] = []
  const categoryMap: { [key: string]: string } = {}
  
  // Kategorileri oluştur
  console.log('\n📁 Kategoriler oluşturuluyor...')
  const uniqueCategories = [...new Set(products.map((p: any) => p.KATEGORİ).filter(Boolean))]
  
  uniqueCategories.forEach((categoryName: string, index: number) => {
    const slug = slugify(categoryName)
    const docId = `category-${slug}`
    categoryMap[categoryName] = docId
    
    documents.push({
      _id: docId,
      _type: 'category',
      title: categoryName,
      slug: { _type: 'slug', current: slug },
      description: `${categoryName} ürünleri - Gema Politek kalitesiyle`,
      order: index + 1,
      seo: {
        metaTitle: `${categoryName} | Gema Politek`,
        metaDescription: `${categoryName} kategorisindeki tüm ürünler. Kaliteli branda ve aksesuar ürünleri.`,
        keywords: [categoryName.toLowerCase(), 'gema politek', 'branda', 'aksesuar'],
      },
    })
  })
  
  console.log(`  ✅ ${uniqueCategories.length} kategori`)
  
  // Ürünleri oluştur
  console.log('\n📦 Ürünler oluşturuluyor...')
  let productCount = 0
  
  for (const product of products) {
    if (!product.ÜRÜN && !product.KOD) continue
    
    const title = product.ÜRÜN || 'İsimsiz Ürün'
    const code = product.KOD || ''
    const slug = slugify(code ? `${code}-${title}` : title)
    const docId = `product-${slug}`
    
    const productDoc: any = {
      _id: docId,
      _type: 'product',
      title: title,
      slug: { _type: 'slug', current: slug },
      description: generateMetaDescription(product),
      brand: 'Gema Politek',
      isActive: true,
    }
    
    // Opsiyonel alanlar
    if (code) {
      productDoc.code = code
      productDoc.sku = code
    }
    if (product.MODEL) productDoc.model = product.MODEL
    if (product.MALZEME) productDoc.material = product.MALZEME
    if (product.KAPLAMA) productDoc.coating = product.KAPLAMA
    if (product.MİKTAR) productDoc.quantity = product.MİKTAR
    if (product.BİRİM_PAKET) productDoc.packaging = product.BİRİM_PAKET
    
    // Kategori referansı
    if (product.KATEGORİ && categoryMap[product.KATEGORİ]) {
      productDoc.category = {
        _type: 'reference',
        _ref: categoryMap[product.KATEGORİ],
      }
    }
    
    // Ölçüler
    const hasDimensions = product.A || product.B || product.D || product.L || product.h || product.s
    if (hasDimensions) {
      productDoc.dimensions = {}
      if (product.A) productDoc.dimensions.a = product.A
      if (product.B) productDoc.dimensions.b = product.B
      if (product.D) productDoc.dimensions.d = product.D
      if (product.L) productDoc.dimensions.l = product.L
      if (product.h) productDoc.dimensions.h = product.h
      if (product.s) productDoc.dimensions.s = product.s
    }
    
    // SEO
    productDoc.seo = {
      metaTitle: `${code ? code + ' ' : ''}${title} | Gema Politek`.substring(0, 70),
      metaDescription: generateMetaDescription(product),
      keywords: generateKeywords(product),
    }
    
    documents.push(productDoc)
    productCount++
  }
  
  console.log(`  ✅ ${productCount} ürün`)
  
  // NDJSON olarak yaz
  console.log('\n💾 NDJSON dosyası yazılıyor...')
  const ndjsonContent = documents.map(doc => JSON.stringify(doc)).join('\n')
  fs.writeFileSync(OUTPUT_PATH, ndjsonContent, 'utf-8')
  
  console.log(`\n✅ ${OUTPUT_PATH} oluşturuldu!`)
  console.log(`   Toplam: ${documents.length} döküman`)
  console.log('\n📌 Sanity CLI ile import etmek için:')
  console.log(`   sanity dataset import ${OUTPUT_PATH} production --replace`)
}

main().catch(console.error)
