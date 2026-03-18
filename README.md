# Buyer Price Table
calculate the buyer's price

Kalkulator tabel sederhana untuk menghitung harga pembeli dari 1Kg sampai 50Kg.

## Akses Langsung

https://maimaina2se.github.io/buyers-price-calculator/

## Fitur

- Tabel harga otomatis 1Kg sampai 50Kg.
- Perhitungan total belanja berdasarkan harga/Kg, jumlah Kg, tambahan belanja, hutang, dan simpanan.
- Hitung kembalian/kurang dari uang yang dibayar.
- Format angka otomatis dengan pemisah ribuan.
- Tombol `Reset` untuk menghapus semua input.

## Cara Pakai

1. Buka `index.html` di browser.
2. Isi `Harga per Kg`, `Berapa Kg`, dan kebutuhan lainnya.
3. Total belanja dan kembalian akan terhitung otomatis.
4. Klik `Reset` untuk menghapus semua input.

## Rumus

- Total tabel per baris = Kg x harga per Kg
- Total belanja = (harga per Kg x berapa Kg) + tambahan belanja + hutang - simpanan
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
