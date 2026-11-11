# RuangKarir

RuangKarir adalah landing page rekrutmen RuangRaya. Halaman ini membantu calon pelamar mengenal budaya kerja, melihat posisi yang tersedia, dan memahami tahapan seleksi.

## Fitur utama

- Navigasi responsif, termasuk menu untuk perangkat mobile.
- Daftar lowongan dengan filter berdasarkan tipe pekerjaan dan divisi.
- Dialog detail posisi yang menampilkan ringkasan, tanggung jawab, dan kualifikasi.
- Bagian budaya kerja, benefit, alur seleksi, dan pertanyaan umum.
- Animasi saat scroll, statistik, marquee, FAQ accordion, dan latar DotGrid interaktif.
- Dukungan aksesibilitas, termasuk navigasi keyboard dan pengaturan reduced motion.

## Tech stack

- React 19 dan JavaScript untuk antarmuka.
- Vite 6 untuk development server dan build.
- Tailwind CSS 3 untuk konfigurasi styling proyek.
- Lucide React untuk ikon.
- CSS untuk styling dan animasi halaman.

## Persyaratan

- Node.js 18 atau lebih baru.
- npm.

## Instalasi dan menjalankan proyek

1. Buka terminal di direktori proyek.
2. Instal dependensi:

   ```bash
   npm install
   ```

3. Jalankan server development:

   ```bash
   npm run dev
   ```

4. Buka alamat lokal yang ditampilkan Vite di browser.

Untuk membuat dan melihat build produksi:

```bash
npm run build
npm run preview
```

## Penggunaan AI

GitHub Copilot di VS Code digunakan sebagai alat bantu pengembangan untuk menyusun dan menyempurnakan kode, interaksi, dan dokumentasi. AI bukan fitur yang ditawarkan kepada pengguna di dalam landing page ini.

## Struktur proyek

```text
├── src/
│   ├── components/   # Komponen antarmuka, termasuk DotGrid
│   └── main.jsx      # Aplikasi React dan konten halaman
├── styles.css        # Styling dan animasi halaman
├── index.html        # Dokumen HTML utama
├── package.json      # Dependensi dan perintah proyek
└── README.md
```
