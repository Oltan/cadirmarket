// fix-csv.js - CSV dosyasındaki kolon hizalama sorunlarını düzeltir
const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '..', 'gema_politek_urunler.csv');
const content = fs.readFileSync(csvPath, 'utf-8');
const lines = content.split('\n');

const header = lines[0];
const headerCols = header.split(',');
console.log(`Header kolonları (${headerCols.length}):`, headerCols);

const fixedLines = [header];
let fixed12 = 0, fixed11 = 0, fixed13 = 0;

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  const cols = line.split(',');

  if (cols.length === 12) {
    // Normal - doğru kolon sayısı
    fixedLines.push(line);
  } else if (cols.length === 13) {
    // Fazla virgül var - 11. kolonu (boş) atla
    // cols[0-9] = KOD-s, cols[10] = boş, cols[11] = BIRIM_PAKET, cols[12] = KATEGORI
    const fixed = [
      cols[0], cols[1], cols[2], cols[3], cols[4],
      cols[5], cols[6], cols[7], cols[8], cols[9],
      cols[11], cols[12]
    ].join(',');
    fixedLines.push(fixed);
    fixed13++;
  } else if (cols.length === 11) {
    // Eksik virgül var - s kolonu eksik
    // cols[0-8] = KOD-h, cols[9] = BIRIM_PAKET, cols[10] = KATEGORI
    const fixed = [
      cols[0], cols[1], cols[2], cols[3], cols[4],
      cols[5], cols[6], cols[7], cols[8], '',  // s boş
      cols[9], cols[10]
    ].join(',');
    fixedLines.push(fixed);
    fixed11++;
  } else {
    console.error(`Satır ${i+1}: Beklenmeyen kolon sayısı (${cols.length}):`, line.substring(0, 100));
    fixedLines.push(line);
  }
}

fs.writeFileSync(csvPath, fixedLines.join('\n'), 'utf-8');
console.log(`\n✅ CSV düzeltildi!`);
console.log(`   - 13 kolonlu ${fixed13} satır düzeltildi`);
console.log(`   - 11 kolonlu ${fixed11} satır düzeltildi`);
console.log(`   - Toplam ${fixedLines.length} satır yazıldı`);
