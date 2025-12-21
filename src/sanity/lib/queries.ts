import { defineQuery } from "next-sanity";

export const PRODUCTS_QUERY = defineQuery(`*[_type == "product"]{
  _id,
  name,
  slug,
  price,
  stock,
  description,
  "imageUrl": images[0].asset->url,
  "category": category->title
}`);

export const PRODUCT_QUERY = defineQuery(`*[_type == "product" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  price,
  stock,
  description,
  "images": images[].asset->url,
  "category": category->title
}`);

export const CATEGORIES_QUERY = defineQuery(`*[_type == "category"]{
  _id,
  title,
  slug
}`);

export const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`*[_type == "product" && category->slug.current == $categorySlug]{
  _id,
  name,
  slug,
  price,
  stock,
  description,
  "imageUrl": images[0].asset->url,
  "category": category->title
}`);

