#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PDF'den urun fotograflarini cikarir
"""

import fitz  # PyMuPDF
import os
import sys

# Yollar
PDF_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'Gema_Politek_Genel_Katalog_2010.pdf')
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'images')

def extract_images():
    # Cikti klasorunu olustur
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print(f"PDF: {PDF_PATH}")
    print(f"Cikti klasoru: {OUTPUT_DIR}")

    # PDF'i ac
    doc = fitz.open(PDF_PATH)
    print(f"Toplam {len(doc)} sayfa")

    image_count = 0

    for page_num in range(len(doc)):
        page = doc[page_num]
        image_list = page.get_images(full=True)

        if not image_list:
            continue

        print(f"\nSayfa {page_num + 1}: {len(image_list)} gorsel bulundu")

        for img_index, img in enumerate(image_list):
            xref = img[0]  # Image XREF

            try:
                base_image = doc.extract_image(xref)
                image_bytes = base_image["image"]
                image_ext = base_image["ext"]

                # Dosya adi: sayfa_gorsel.ext
                filename = f"page{page_num + 1:02d}_img{img_index + 1:02d}.{image_ext}"
                filepath = os.path.join(OUTPUT_DIR, filename)

                # Kaydet
                with open(filepath, "wb") as f:
                    f.write(image_bytes)

                # Boyut bilgisi
                size_kb = len(image_bytes) / 1024
                print(f"  - {filename} ({size_kb:.1f} KB)")

                image_count += 1

            except Exception as e:
                print(f"  ! Gorsel {img_index + 1} cikarilmadi: {e}")

    doc.close()

    print(f"\n{'='*50}")
    print(f"Toplam {image_count} gorsel cikarildi")
    print(f"Konum: {OUTPUT_DIR}")

if __name__ == "__main__":
    extract_images()
