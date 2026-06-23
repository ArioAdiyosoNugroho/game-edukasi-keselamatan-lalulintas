# 🚦 LAJUAMAN — Vibe Coding README
> **Game Edukasi Keselamatan Lalu Lintas & Angkutan Jalan**  
> PPKLAJ Provinsi Jawa Tengah 2026  
> Tema: *"Inovasi Teknologi dan Etika Transportasi sebagai Manifestasi Keselamatan Jalan di Era Digital"*

---

## 🎯 KONTEKS LOMBA (Baca Dulu!)

Game ini dibuat untuk **Pemilihan Pelajar Pelopor Keselamatan LLAJ Tingkat Provinsi Jawa Tengah 2026**. Aspek penilaian yang relevan dengan game:

| Komponen Nilai | Bobot | Relevansi Game |
|---|---|---|
| Administrasi | 10% | QR Code / link aktif = nilai plus |
| Video Content | 10% | Demo gameplay di Reels Instagram |
| Tes Tulis | 30% | — |
| Keaktifan | 10% | — |
| **Wawancara/KTI** | **40%** | **Game = alat peraga KTI** |

**Sub-tema yang dipilih:** Kampanye dan Gamifikasi Keselamatan dalam Membentuk Karakter Pengguna Jalan yang Beretika.

**Deadline kritis:**
- Upload video Instagram Reels: **26 Juni – 1 Juli 2026**
- Pendaftaran peserta: **25 Juni 2026**
- Pelaksanaan lomba: **7–8 Juli 2026, Hotel Puri Garden Semarang**
- Presentasi KTI: **15 menit** (7 menit paparan + 8 menit tanya jawab)

---

## 🧠 KONSEP GAME: LajuAman

**Tagline:** *Laju = Berkendara. Aman = Selamat. Berkendara selalu harus aman.*

LajuAman adalah **web game edukasi single-page** di mana pemain berperan sebagai pelajar pengendara yang menghadapi skenario lalu lintas nyata dan harus membuat keputusan yang benar sesuai UU No. 22 Tahun 2009.

### Filosofi Desain
- **Zero instalasi** — buka browser, langsung main
- **Mobile-first** — mayoritas pelajar pakai HP Android
- **Feedback instan** — setiap keputusan langsung diberi penjelasan hukum
- **Tidak menghukum** — jawaban salah = 0 poin (bukan minus), agar tidak frustrasi
- **Visual memorable** — palet biru-kuning warna resmi rambu jalan Indonesia

---

## 🛠️ TECH STACK

```
HTML5       → Struktur & layout semua layar (satu file index.html)
CSS3        → Animasi, transisi layar, responsive design
JavaScript  → Game logic, skor, timer, level, badge
Canvas API  → Animasi jalan bergerak & kendaraan
LocalStorage → Simpan progres, skor, badge (offline, tanpa server)
```

**Tidak pakai framework** — murni Vanilla JS agar:
- Bisa jalan di HP Android murah (low-end)
- File kecil, loading cepat di jaringan 3G
- Mudah dipahami juri (transparansi kode)

**Deploy gratis:** GitHub Pages atau Netlify → hasilkan QR Code untuk demo presentasi.

---

## 🎨 DESIGN SYSTEM

### Palet Warna (Wajib Diikuti)
```css
--bg-primary:    #1A3A6B;  /* Biru tua — warna rambu resmi Indonesia */
--accent:        #FFC000;  /* Kuning — marka jalan, peringatan */
--success:       #70AD47;  /* Hijau — aman, jawaban benar, lampu hijau */
--danger:        #C00000;  /* Merah — bahaya, salah, lampu merah */
--bg-card:       #1E4A8A;  /* Biru medium — kartu/panel */
--text-primary:  #FFFFFF;  /* Putih — teks utama */
--text-muted:    #B8D4F5;  /* Biru muda — teks sekunder */
```

### Tipografi
```css
font-family: 'Poppins', Arial, sans-serif;
/* Poppins dari Google Fonts — bisa fallback ke Arial */

font-size-base:    16px;
font-size-title:   28px (mobile) / 36px (desktop);
font-size-button:  15px, font-weight: 600;
font-size-min:     14px (jangan lebih kecil untuk aksesibilitas);
```

### Visual Identity
- **Ikon rambu lalu lintas** sebagai dekorasi di seluruh UI
- **Animasi jalan bergerak** (scrolling road) di Canvas sebagai background gameplay
- **Efek partikel** saat jawaban benar (confetti kecil warna kuning-hijau)
- **Shake animation** saat jawaban salah

---

## 📐 STRUKTUR LAYAR (5 Layar Utama)

### 1. 🏠 Main Menu
```
┌─────────────────────────────────┐
│  🚦  LOGO LAJUAMAN              │
│   "Jadilah Pelopor Keselamatan" │
│                                 │
│  [ Input Nama Pemain ]          │
│                                 │
│  [🚦 Mode Skenario]             │
│  [📚 Mode Kuis UU]              │
│  [🏁 Mode Tantangan]            │
│  [📖 Mode Belajar]              │
│                                 │
│  [🏆 Leaderboard]               │
└─────────────────────────────────┘
```

### 2. 🎮 Game Screen
```
┌─────────────────────────────────┐
│ Skor: 0  |  Level: Siswa  |  ⏱️ │
│─────────────────────────────────│
│                                 │
│   [CANVAS: Animasi Jalan]       │
│   🏍️ kendaraan bergerak         │
│                                 │
│─────────────────────────────────│
│ Skenario 1/10                   │
│                                 │
│ "Lampu baru hijau, tapi ada     │
│  pejalan kaki menyeberang..."   │
│                                 │
│ [A] Tekan klakson keras         │
│ [B] Tunggu pejalan kaki ✅      │
│ [C] Maju pelan-pelan            │
│                                 │
│ ████████░░░░ Progress           │
└─────────────────────────────────┘
```

### 3. 💡 Feedback Screen
```
┌─────────────────────────────────┐
│         ✅ BENAR!               │
│      +10 Poin                   │
│                                 │
│  📖 PENJELASAN:                 │
│  "Pejalan kaki memiliki         │
│   prioritas di zebra cross.     │
│   Pasal 106 UU 22/2009          │
│   mewajibkan pengemudi          │
│   mendahulukan pejalan kaki."   │
│                                 │
│  [➡️ Lanjut]                    │
└─────────────────────────────────┘
```

### 4. 🏆 Result Screen
```
┌─────────────────────────────────┐
│  🎖️ SELAMAT, [NAMA]!            │
│                                 │
│  Total Skor:  85                │
│  Rank:        ⭐ Pelopor        │
│  Akurasi:     8/10 (80%)        │
│                                 │
│  🏅 Badge Baru: Rambu Master    │
│                                 │
│  [🔄 Main Lagi] [🏆 Lihat Top] │
└─────────────────────────────────┘
```

### 5. 📊 Leaderboard
```
┌─────────────────────────────────┐
│  🏆 PAPAN JUARA                 │
│                                 │
│  1. Ahmad    95 🥇 Pahlawan     │
│  2. Budi     80 🥈 Pelopor      │
│  3. Citra    75 🥉 Pengendara   │
│  ...                            │
│  → KAMU: 85 (Posisi 2)          │
│                                 │
│  [← Kembali ke Menu]           │
└─────────────────────────────────┘
```

---

## 🎮 SISTEM GAME (Logic Detail)

### Sistem Poin
```
Jawaban Benar:          +10 poin
Combo 3x beruntun:      +5 poin bonus (munculkan notif "COMBO!")
Jawaban Salah:          +0 (tidak dikurangi)
Selesai semua soal:     +20 poin bonus (completion bonus)
Waktu < 5 detik:        +3 poin speed bonus (hanya Mode Tantangan)
```

### Sistem Level (7 Tingkat)
```javascript
const LEVELS = [
  { name: "Pesepeda",    minPoin: 0   },
  { name: "Pejalan Kaki",minPoin: 20  },
  { name: "Siswa",       minPoin: 50  },
  { name: "Pelajar",     minPoin: 100 },
  { name: "Pengendara",  minPoin: 200 },
  { name: "Pelopor",     minPoin: 350 },
  { name: "Pahlawan Jalan", minPoin: 500 }
];
```

### Sistem Badge (10 Badge)
```javascript
const BADGES = [
  { id: "rambu_master",  label: "🔴 Rambu Master",   cond: "jawab 5 soal rambu beruntun benar" },
  { id: "zero_violation",label: "✅ Zero Violation",  cond: "sempurna 10/10 tanpa salah" },
  { id: "speed_learner", label: "⚡ Speed Learner",   cond: "jawab dalam < 3 detik rata-rata" },
  { id: "etika_hero",    label: "🦸 Etika Hero",      cond: "selesaikan Mode Skenario 100%" },
  { id: "uu_master",     label: "📚 UU Master",       cond: "skor Mode Kuis > 80" },
  { id: "combo_king",    label: "🔥 Combo King",      cond: "raih combo 5x beruntun" },
  { id: "all_modes",     label: "🌟 All Rounder",     cond: "mainkan semua 4 mode" },
  { id: "first_play",    label: "🎯 Pelopor Pertama", cond: "main pertama kali" },
  { id: "persistent",    label: "💪 Pantang Menyerah",cond: "main 3 sesi berbeda" },
  { id: "top_scorer",    label: "🏆 Juara Lokal",     cond: "masuk top 3 leaderboard" }
];
```

---

## 📝 DATA SKENARIO (15 Skenario Utama)

Setiap skenario berbentuk objek JS seperti ini:

```javascript
{
  id: 1,
  kategori: "etika",
  situasi: "Lampu lalu lintas baru saja berubah hijau, tetapi masih ada pejalan kaki yang belum selesai menyeberang di zebra cross.",
  pilihan: [
    { id: "A", teks: "Tekan klakson keras agar pejalan kaki menyingkir" },
    { id: "B", teks: "Tunggu hingga pejalan kaki selesai menyeberang dengan aman" },
    { id: "C", teks: "Maju pelan-pelan sambil memberikan ruang" }
  ],
  jawaban: "B",
  penjelasan: "Pejalan kaki yang sedang menyeberang di zebra cross memiliki hak prioritas penuh. Pengemudi wajib menunggu hingga mereka aman. Ini diatur dalam Pasal 106 ayat (2) UU No. 22 Tahun 2009.",
  pasal: "Pasal 106 UU 22/2009",
  poin: 10
}
```

**15 Skenario yang harus dibuat:**
1. Lampu hijau + pejalan kaki di zebra cross *(etika)*
2. Menyalip di garis putus-putus *(regulasi)*
3. HP berbunyi saat berkendara *(distraksi)*
4. Persimpangan tanpa lampu lalu lintas *(prioritas)*
5. Naik motor tanpa helm *(keselamatan)*
6. Parkir di depan hydran/akses pemadam *(regulasi)*
7. Jalan licin/hujan, kecepatan aman *(keselamatan)*
8. Lampu belakang motor mati malam hari *(kewajiban kendaraan)*
9. Pengemudi di depan mendadak rem *(jarak aman)*
10. Hendak berbelok di persimpangan *(tanda belok)*
11. Trotoar kosong, motor melintas di trotoar *(regulasi)*
12. Teman minta diantar padahal SIM belum punya *(legalitas)*
13. Jalan berlubang, pilih lajur *(adaptasi)*
14. Kendaraan darurat (ambulans) dari belakang *(prioritas darurat)*
15. Dua pengendara saling mengalah di jalan sempit *(etika)*

---

## 🖼️ ANIMASI CANVAS (Spesifikasi)

```javascript
// Canvas: Jalan bergerak ke bawah (illusi kendaraan melaju)
// Elemen yang dirender:
// 1. Aspal abu-abu gelap sebagai background
// 2. Garis marka putih bergerak dari atas ke bawah (gap & solid)
// 3. Sprite kendaraan pemain (motor/sepeda) di tengah, diam
// 4. Pohon/objek pinggir jalan bergerak (parallax effect)
// 5. Rambu lalu lintas relevan per skenario (muncul dari atas)
// 6. Efek partikel: confetti kuning-hijau saat benar
// 7. Efek flash merah + shake saat salah
```

---

## 💾 LOCALSTORAGE SCHEMA

```javascript
// Key-value yang disimpan:
localStorage.setItem('lajuaman_player', JSON.stringify({
  nama: "Ahmad",
  totalPoin: 150,
  currentLevel: "Pelopor",
  badges: ["first_play", "etika_hero"],
  modesDimainkan: ["skenario", "kuis"],
  sessionCount: 3,
  highScore: 150,
  lastPlayed: "2026-06-25"
}));

localStorage.setItem('lajuaman_leaderboard', JSON.stringify([
  { nama: "Ahmad", skor: 150, rank: "Pelopor", badge: "Etika Hero" },
  // ... max 10 entri
]));
```

---

## 📋 CHECKLIST BUILD (Urutan Pengerjaan)

### FASE 1 — Prototype Bisa Dimainkan (Prioritas Lomba)
- [ ] Struktur HTML dasar (semua layar dalam 1 file, toggled dengan CSS)
- [ ] CSS: palet warna, font Poppins, responsive grid
- [ ] Main Menu: input nama + 4 tombol mode
- [ ] Game Screen: tampil skenario + 3 pilihan tombol
- [ ] Feedback Screen: benar/salah + penjelasan
- [ ] Sistem poin dasar + counter soal
- [ ] Result Screen: total skor + rank
- [ ] 15 skenario dalam `scenarios.js`
- [ ] LocalStorage: simpan nama & skor

### FASE 2 — Fitur Lengkap
- [ ] Animasi Canvas jalan bergerak
- [ ] Timer per soal (Mode Tantangan)
- [ ] Sistem level (7 tingkat, naik otomatis)
- [ ] Sistem badge (10 badge, unlock otomatis)
- [ ] Combo streak notification
- [ ] Leaderboard lokal (top 10)
- [ ] Mode Kuis UU (20 soal pilihan ganda)
- [ ] Mode Belajar (ensiklopedia rambu)
- [ ] Animasi transisi antar layar

### FASE 3 — Siap Presentasi
- [ ] Deploy ke GitHub Pages atau Netlify
- [ ] Generate QR Code untuk link game
- [ ] Test di HP Android (minimal 2 tipe berbeda)
- [ ] Rekam video gameplay 90 detik untuk Instagram Reels
- [ ] Screenshot untuk slide KTI

---

## 🚀 INSTRUKSI UNTUK AI (Vibe Coding Prompts)

Gunakan prompt-prompt ini secara berurutan saat vibe coding:

### Prompt 1 — Scaffolding Awal
```
Buat game web edukasi LajuAman dalam satu file HTML lengkap. 
Gunakan palet warna: bg #1A3A6B, aksen #FFC000, sukses #70AD47, danger #C00000.
Font: Poppins dari Google Fonts.
Buat 5 layar: main-menu, game-screen, feedback-screen, result-screen, leaderboard.
Semua layar ada dalam satu HTML, tampil/sembunyikan dengan class 'active'.
Tidak butuh backend — hanya HTML, CSS, JavaScript vanilla.
```

### Prompt 2 — Game Logic
```
Tambahkan game logic di JavaScript:
- Array 15 skenario dalam format objek (situasi, pilihan A/B/C, jawaban, penjelasan, pasal)
- Fungsi startGame(mode) untuk memulai
- Fungsi showScenario(index) untuk tampilkan soal
- Fungsi checkAnswer(pilihan) untuk cek + tampilkan feedback
- Sistem poin: benar +10, combo 3x +5 bonus
- Fungsi showResult() untuk tampilkan hasil akhir
- Simpan ke LocalStorage
```

### Prompt 3 — Canvas Animasi
```
Buat animasi HTML5 Canvas untuk background game screen:
- Canvas ukuran 100% width, 200px height
- Animasi jalan bergerak ke bawah (garis marka putih bergerak)
- Sprite motor kecil di tengah jalan
- Gunakan requestAnimationFrame
- Efek confetti kuning saat jawaban benar
- Efek flash merah saat jawaban salah
```

### Prompt 4 — Sistem Gamifikasi
```
Tambahkan sistem gamifikasi:
- 7 level: Pesepeda/Pejalan Kaki/Siswa/Pelajar/Pengendara/Pelopor/Pahlawan Jalan
- Level naik otomatis saat poin mencapai threshold
- 5 badge dasar: first_play, zero_violation, etika_hero, combo_king, uu_master
- Badge unlock otomatis, muncul notifikasi popup
- Leaderboard lokal: simpan top 10 ke LocalStorage
- Tampilkan combo streak notification saat 3x beruntun benar
```

### Prompt 5 — Polish & Mobile
```
Perbaiki UI/UX:
- Pastikan responsive di layar 360px (HP Android kecil) sampai 1200px
- Tombol pilihan jawaban min height 50px (mudah disentuh)
- Animasi transisi antar layar (fade 0.3s)
- Loading animation saat pertama buka
- Tambahkan sound effect (Web Audio API): ding! saat benar, buzz saat salah
- Tambahkan progress bar soal (misal: soal 3 dari 10)
- Test dan fix semua edge case
```

---

## ⚠️ PENTING UNTUK PRESENTASI

1. **Bawa charger HP dan laptop** — pastikan baterai penuh saat demo
2. **Test offline** — pastikan game tetap jalan tanpa WiFi (LocalStorage based)
3. **Siapkan backup** — screenshot gameplay di HP, kalau internet hotel lambat
4. **QR Code** — print A4 di stopmap biru, tempel di halaman cover KTI
5. **Demo flow yang direkomendasikan:**
   - Buka menu → input nama juri → pilih Mode Skenario
   - Mainkan 3–4 skenario sambil menjelaskan fitur
   - Tunjukkan feedback edukatif + pasal hukum
   - Tunjukkan Result Screen + badge yang didapat
   - Tunjukkan Leaderboard
   - Tunjukkan QR Code agar juri bisa coba sendiri

---

## 📊 POIN JUAL (untuk Sesi Tanya Jawab KTI)

Siapkan jawaban untuk pertanyaan ini:

**Q: Apa yang membedakan LajuAman dari aplikasi edukasi lain?**  
A: Konteks sangat spesifik untuk pelajar Indonesia + UU 22/2009. Feedback langsung kutip pasal hukum. Bisa offline. Gratis tanpa instalasi.

**Q: Bagaimana mengukur efektivitasnya?**  
A: Sistem skor & akurasi merekam progres. Perbandingan skor awal vs ulangan menunjukkan peningkatan pengetahuan.

**Q: Bisa dikembangkan ke mana?**  
A: Backend online → leaderboard antar sekolah se-Jawa Tengah. PWA → install di HP. Kerjasama Dishub → QR Code di pos penyuluhan.

**Q: Kenapa pilih Vanilla JS bukan React/dll?**  
A: Agar bisa diakses pelajar di daerah dengan HP murah. Tidak butuh Node.js. Lebih transparan dan mudah direplikasi sekolah lain.

---

*Dibuat untuk PPKLAJ Provinsi Jawa Tengah 2026*  
*#LajuAman #PPKLLAJProvJateng2026 #SelamatDiJalan*
