# NORXSTORE 💠

Platform storefront web untuk layanan game top-up, joki, dan jual beli akun game (Genshin Impact, Honkai Star Rail, Mobile Legends, Wuthering Waves, dll.) yang terhubung dengan **Firebase Realtime Database** dan **Firebase Authentication**.

---

## 🚀 Fitur Utama

- **Katalog Layanan & Game**: Pemilihan kategori, diskon promo otomatis, dan pencarian cepat.
- **Firebase Realtime Database**: Sinkronisasi katalog produk, pesanan, banner promo, dan status reservasi secara langsung.
- **Firebase Auth (Google Login & Anonim)**: Mendukung login dengan Google (`signInWithPopup`) untuk menyimpan keranjang dan riwayat pesanan lintas perangkat.
- **Panel Admin Terintegrasi**: Pengelolaan produk, pemrosesan pesanan, update banner, dan kata sandi admin.
- **Checkout Cepat ke WhatsApp**: Integrasi pemesanan langsung ke admin WhatsApp dengan format pesan otomatis.
- **Responsif & Mobile First**: Tampilan halus untuk perangkat smartphone dan desktop dengan mode katalog dan testimoni.

---

## 🛠️ Cara Menjalankan di Komputer Lokal

### Prasyarat
- [Node.js](https://nodejs.org/) versi 18 atau lebih baru.

### Langkah Instalasi

1. Clone repositori ini:
   ```bash
   git clone https://github.com/USERNAME/Norxstore.git
   cd Norxstore
   ```

2. Pasang dependensi:
   ```bash
   npm install
   ```

3. Jalankan server:
   ```bash
   npm start
   # atau
   npm run dev
   ```

4. Buka browser dan akses:
   ```
   http://localhost:3000
   ```

> **Catatan**: File `index.html` juga dapat dibuka langsung di browser atau di-hosting di layanan statis seperti **GitHub Pages**, **Vercel**, **Firebase Hosting**, atau **Netlify**.

---

## ⚙️ Konfigurasi Firebase

Proyek ini menggunakan konfigurasi Firebase pada `index.html`. Jika Anda ingin menggunakan proyek Firebase Anda sendiri:
1. Buat proyek baru di [Firebase Console](https://console.firebase.google.com/).
2. Aktifkan **Authentication** (Metode Sign-in: Google & Anonymous).
3. Aktifkan **Realtime Database** (Pilih region asia-southeast1 atau lainnya).
4. Daftarkan Web App dan perbarui objek `firebaseConfig` di dalam `index.html`.
5. Tambahkan domain web Anda di **Firebase Console** > **Authentication** > **Settings** > **Authorized domains**.
