# Buyer Price Table
calculate the buyer's price

Kalkulator tabel sederhana untuk menghitung harga pembeli dari 1kg sampai 50kg.

## Akses Langsung

https://maimaina2se.github.io/buyers-price-calculator/

## Fitur

- Tabel harga otomatis 1kg sampai 50kg.
- Perhitungan total belanja berdasarkan harga/kg, jumlah kg, tambahan belanja, hutang, dan simpanan.
- Hitung kembalian/kurang dari uang yang dibayar.
- Format angka otomatis dengan pemisah ribuan.
- Tombol `Reset` untuk menghapus semua input.

## Cara Pakai

1. Buka `index.html` di browser.
2. Isi `Harga per Kg`, `Berapa Kg`, dan kebutuhan lainnya.
3. Total belanja dan kembalian akan terhitung otomatis.
4. Klik `Reset` untuk menghapus semua input.

## Rumus

- Total tabel per baris = kg x harga per kg
- Total belanja = (harga per kg x berapa kg) + tambahan belanja + hutang - simpanan
- Kembalian/Kurang = uang - total belanja

## Input

- Harga per Kg
- Berapa Kg
- Tambahan Belanja
- Hutang
- Simpanan
- Uang

## Struktur File

- `index.html` - Tampilan utama
- `styles.css` - Desain dan tema
- `app.js` - Logika perhitungan
- `README.md` - Deskripsi proyek
