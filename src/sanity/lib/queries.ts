import { defineQuery } from "next-sanity";

export const PRODUCTS_QUERY = defineQuery(`*[_type == "product"]{
  _id,
  "name": coalesce(name, title),
  title,
  code,
  slug,
  price,
  stock,
  description,
  material,
  coating,
  packaging,
  "imageUrl": coalesce(gallery[0].asset->url, images[0].asset->url, mainImage.asset->url),
  "category": category->title
}`);

export const PRODUCT_QUERY = defineQuery(`*[_type == "product" && slug.current == $slug][0]{
  _id,
  "name": coalesce(name, title),
  title,
  code,
  slug,
  price,
  stock,
  description,
  material,
  coating,
  packaging,
  dimensions,
  brand,
  sku,
  seo,
  "images": coalesce(gallery[].asset->url, images[].asset->url, [mainImage.asset->url]),
  "category": category->title
}`);

export const CATEGORIES_QUERY = defineQuery(`*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug
}`);

// Ana sayfa icin one cikan urunler (8 adet, gorseli olan urunlerden)
export const FEATURED_PRODUCTS_QUERY = defineQuery(`*[_type == "product" && defined(mainImage)] | order(_createdAt desc) [0...8] {
  _id,
  "name": coalesce(name, title),
  title,
  code,
  slug,
  price,
  "imageUrl": coalesce(gallery[0].asset->url, images[0].asset->url, mainImage.asset->url),
  "category": category->title
}`);

// Footer icin ana kategoriler (en cok urun iceren 10 kategori)
export const MAIN_CATEGORIES_QUERY = defineQuery(`*[_type == "category"] {
  _id,
  title,
  slug,
  "productCount": count(*[_type == "product" && references(^._id)])
} | order(productCount desc) [0...10]`);

export const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`*[_type == "product" && category->slug.current == $categorySlug]{
  _id,
  "name": coalesce(name, title),
  title,
  code,
  slug,
  price,
  stock,
  description,
  material,
  coating,
  packaging,
  "imageUrl": coalesce(gallery[0].asset->url, images[0].asset->url, mainImage.asset->url),
  "category": category->title
}`);

// Paginated products queries
export const PRODUCTS_PAGINATED_QUERY = defineQuery(`*[_type == "product"] | order(_createdAt desc) [$start...$end] {
  _id,
  "name": coalesce(name, title),
  title,
  code,
  slug,
  price,
  stock,
  description,
  material,
  coating,
  packaging,
  "imageUrl": coalesce(gallery[0].asset->url, images[0].asset->url, mainImage.asset->url),
  "category": category->title
}`);

export const PRODUCTS_BY_CATEGORY_PAGINATED_QUERY = defineQuery(`*[_type == "product" && category->slug.current == $categorySlug] | order(_createdAt desc) [$start...$end] {
  _id,
  "name": coalesce(name, title),
  title,
  code,
  slug,
  price,
  stock,
  description,
  material,
  coating,
  packaging,
  "imageUrl": coalesce(gallery[0].asset->url, images[0].asset->url, mainImage.asset->url),
  "category": category->title
}`);

// Count queries for pagination
export const PRODUCTS_COUNT_QUERY = defineQuery(`count(*[_type == "product"])`);

export const PRODUCTS_BY_CATEGORY_COUNT_QUERY = defineQuery(`count(*[_type == "product" && category->slug.current == $categorySlug])`);

// Search queries
export const PRODUCTS_SEARCH_QUERY = defineQuery(`*[_type == "product" && (
  coalesce(title, name) match $searchTerm + "*" ||
  description match $searchTerm + "*" ||
  code match $searchTerm + "*" ||
  sku match $searchTerm + "*" ||
  brand match $searchTerm + "*" ||
  model match $searchTerm + "*" ||
  material match $searchTerm + "*"
)] | order(_createdAt desc) [$start...$end] {
  _id,
  "name": coalesce(name, title),
  title,
  code,
  slug,
  price,
  stock,
  description,
  material,
  coating,
  packaging,
  "imageUrl": coalesce(gallery[0].asset->url, images[0].asset->url, mainImage.asset->url),
  "category": category->title
}`);

export const PRODUCTS_SEARCH_COUNT_QUERY = defineQuery(`count(*[_type == "product" && (
  coalesce(title, name) match $searchTerm + "*" ||
  description match $searchTerm + "*" ||
  code match $searchTerm + "*" ||
  sku match $searchTerm + "*" ||
  brand match $searchTerm + "*" ||
  model match $searchTerm + "*" ||
  material match $searchTerm + "*"
)])`);

