// ============================================================
// LajuAman — Data Layer
// Game Edukasi Keselamatan Lalu Lintas
// PPKLAJ Provinsi Jawa Tengah 2026
// ============================================================

// Level Data
const LEVELS = [
    { name: "Pesepeda",       minPoin: 0,   ikon: "🚲" },
    { name: "Pejalan Kaki",   minPoin: 20,  ikon: "🚶" },
    { name: "Siswa",          minPoin: 50,  ikon: "🎒" },
    { name: "Pelajar",        minPoin: 100, ikon: "📚" },
    { name: "Pengendara",     minPoin: 200, ikon: "🏍️" },
    { name: "Pelopor",        minPoin: 350, ikon: "⭐" },
    { name: "Pahlawan Jalan", minPoin: 500, ikon: "🏆" }
];

// Badge Data
const BADGES = [
    { id: "first_play",    label: "🎯 Pelopor Pertama",  cond: "Main pertama kali" },
    { id: "zero_violation", label: "✅ Zero Violation",   cond: "Sempurna tanpa salah" },
    { id: "etika_hero",    label: "🦸 Etika Hero",       cond: "Selesaikan Mode Skenario" },
    { id: "uu_master",     label: "📚 UU Master",        cond: "Skor Mode Kuis > 80" },
    { id: "rambu_master",  label: "🛑 Rambu Master",     cond: "Selesaikan Tebak Rambu" },
    { id: "combo_king",    label: "🔥 Combo King",       cond: "Combo 5x beruntun" },
    { id: "persistent",    label: "💪 Pantang Menyerah", cond: "Main 3 sesi berbeda" },
    { id: "top_scorer",    label: "🏆 Juara Lokal",      cond: "Masuk top 3 leaderboard" },
    { id: "speed_learner", label: "⚡ Speed Learner",    cond: "Jawab < 5 detik rata-rata" },
    { id: "all_modes",     label: "🌟 All Rounder",      cond: "Mainkan semua mode" }
];

// ============================================================
// SKENARIO DATA (15 Skenario Situasi Lalu Lintas)
// ============================================================
const SCENARIOS = [
    {
        id: 1,
        kategori: "etika",
        gambar: "https://res.cloudinary.com/dtjbvmrow/image/upload/v1782293533/traffic_light_singapore_aesthetic_lololol_enboev.jpg",
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
    },
    {
        id: 2,
        kategori: "regulasi",
        gambar: "https://res.cloudinary.com/dtjbvmrow/image/upload/v1782293718/121808364918797788_lton4a.jpg",
        situasi: "Anda sedang berkendara di jalan dua arah. Kendaraan di depan Anda melaju lambat, dan marka jalan di tengah adalah garis putih putus-putus.",
        pilihan: [
            { id: "A", teks: "Boleh menyalip jika dari arah berlawanan aman" },
            { id: "B", teks: "Dilarang menyalip karena jalan dua arah" },
            { id: "C", teks: "Menyalip dari sebelah kiri karena aman" }
        ],
        jawaban: "A",
        penjelasan: "Garis putih putus-putus menandakan pengemudi diperbolehkan melintasi marka tersebut untuk berpindah lajur atau menyalip jika situasi lalu lintas aman.",
        pasal: "Permenhub Marka Jalan",
        poin: 10
    },
    {
        id: 3,
        kategori: "distraksi",
        gambar: "https://res.cloudinary.com/dtjbvmrow/image/upload/v1782293834/Teaching_Teens_About_Distracted_Driving_in_the_Smartphone_Age_sjytv5.jpg",
        situasi: "Handphone Anda berbunyi keras dan ada pesan masuk yang sangat penting saat Anda mengendarai sepeda motor.",
        pilihan: [
            { id: "A", teks: "Baca pesan sekilas sambil terus melaju" },
            { id: "B", teks: "Menepi di tempat aman, berhenti, lalu buka HP" },
            { id: "C", teks: "Minta teman yang dibonceng memegang kemudi sebentar" }
        ],
        jawaban: "B",
        penjelasan: "Menggunakan handphone saat berkendara sangat berbahaya dan melanggar hukum karena mengganggu konsentrasi. Pasal 283 UU 22/2009 melarang hal ini.",
        pasal: "Pasal 283 UU 22/2009",
        poin: 10
    },
    {
        id: 4,
        kategori: "prioritas",
        gambar: "https://res.cloudinary.com/dtjbvmrow/image/upload/v1782294132/ChatGPT_Image_24_Jun_2026_16.41.44_v77v6x.png",
        situasi: "Anda tiba di persimpangan empat jalan yang tidak memiliki lampu lalu lintas. Pada saat bersamaan, ada kendaraan lain di sebelah kiri Anda.",
        pilihan: [
            { id: "A", teks: "Kendaraan yang datang dari cabang persimpangan sebelah kiri mendapat prioritas" },
            { id: "B", teks: "Kendaraan Anda (di sebelah kanan) mendapat prioritas" },
            { id: "C", teks: "Siapa yang paling cepat maju, dia yang prioritas" }
        ],
        jawaban: "A",
        penjelasan: "Pada persimpangan sebidang tak bersinyal, pengemudi wajib mendahulukan kendaraan yang datang dari cabang persimpangan sebelah kiri.",
        pasal: "Pasal 113 UU 22/2009",
        poin: 10
    },
    {
        id: 5,
        kategori: "keselamatan",
        gambar: "https://placehold.co/600x400/1A3A6B/FFFFFF/png?text=Helm+SNI",
        situasi: "Jarak sekolah hanya 200 meter dari rumah. Anda hendak ke sekolah naik motor.",
        pilihan: [
            { id: "A", teks: "Tidak perlu pakai helm karena sangat dekat" },
            { id: "B", teks: "Tetap memakai helm standar SNI dengan diklik" },
            { id: "C", teks: "Bawa helm tapi tidak usah dipakai, taruh di setang" }
        ],
        jawaban: "B",
        penjelasan: "Kecelakaan bisa terjadi di mana saja, tanpa memandang jarak. Helm SNI wajib digunakan dengan benar (sampai bunyi klik) setiap saat berkendara sepeda motor.",
        pasal: "Pasal 106 ayat 8 UU 22/2009",
        poin: 10
    },
    {
        id: 6,
        kategori: "regulasi",
        gambar: "https://placehold.co/600x400/1A3A6B/FFFFFF/png?text=Parkir+Dekat+Hidran",
        situasi: "Anda sedang mencari tempat parkir di area yang padat dan melihat ruang kosong tepat di depan hidran pemadam kebakaran.",
        pilihan: [
            { id: "A", teks: "Parkir di situ sebentar saja, menyalakan lampu hazard" },
            { id: "B", teks: "Boleh parkir asal tidak mengunci setang" },
            { id: "C", teks: "Cari tempat lain, dilarang parkir di depan hidran" }
        ],
        jawaban: "C",
        penjelasan: "Dilarang keras memarkir kendaraan di tempat yang dapat menutupi akses keadaan darurat seperti hidran pemadam kebakaran.",
        pasal: "Pasal 287 ayat 3 UU 22/2009",
        poin: 10
    },
    {
        id: 7,
        kategori: "keselamatan",
        gambar: "https://placehold.co/600x400/1A3A6B/FFFFFF/png?text=Berkendara+Saat+Hujan",
        situasi: "Cuaca tiba-tiba hujan deras. Jalanan menjadi sangat licin dan jarak pandang berkurang.",
        pilihan: [
            { id: "A", teks: "Kurangi kecepatan, nyalakan lampu utama, dan jaga jarak aman" },
            { id: "B", teks: "Nyalakan lampu hazard agar terlihat jelas sambil jalan terus" },
            { id: "C", teks: "Pacu kendaraan lebih cepat agar lekas sampai berteduh" }
        ],
        jawaban: "A",
        penjelasan: "Lampu hazard HANYA untuk kendaraan berhenti dalam kondisi darurat. Saat hujan, kurangi kecepatan dan nyalakan lampu utama (headlamp) biasa.",
        pasal: "Keselamatan Dasar Berkendara",
        poin: 10
    },
    {
        id: 8,
        kategori: "kewajiban kendaraan",
        gambar: "https://placehold.co/600x400/1A3A6B/FFFFFF/png?text=Lampu+Rem+Mati",
        situasi: "Anda menyadari lampu rem belakang motor Anda putus/mati saat malam hari.",
        pilihan: [
            { id: "A", teks: "Tidak masalah, yang penting lampu depan menyala" },
            { id: "B", teks: "Segera perbaiki sebelum berkendara karena berbahaya bagi pengendara di belakang" },
            { id: "C", teks: "Berkendara sambil terus memencet klakson agar orang tahu" }
        ],
        jawaban: "B",
        penjelasan: "Lampu rem berfungsi memberi tanda pada kendaraan di belakang bahwa kita mengurangi kecepatan. Jika mati, risiko tertabrak dari belakang sangat besar.",
        pasal: "Pasal 285 ayat 1 UU 22/2009",
        poin: 10
    },
    {
        id: 9,
        kategori: "jarak aman",
        gambar: "https://placehold.co/600x400/1A3A6B/FFFFFF/png?text=Jarak+Aman",
        situasi: "Kendaraan di depan Anda mendadak mengerem keras.",
        pilihan: [
            { id: "A", teks: "Banting setir ke kiri sekuat tenaga" },
            { id: "B", teks: "Rem mendadak dan berharap tidak menabrak" },
            { id: "C", teks: "Jika menjaga jarak aman, Anda bisa mengerem secara bertahap tanpa menabrak" }
        ],
        jawaban: "C",
        penjelasan: "Menjaga jarak aman sangat krusial. Rumus umum adalah 'Aturan 3 Detik' dengan kendaraan di depan untuk memberikan ruang reaksi jika ada pengereman mendadak.",
        pasal: "Pasal 62 PP 43/1993",
        poin: 10
    },
    {
        id: 10,
        kategori: "tanda belok",
        gambar: "https://placehold.co/600x400/1A3A6B/FFFFFF/png?text=Memberi+Lampu+Sein",
        situasi: "Anda hendak berbelok ke kanan di persimpangan yang jaraknya tinggal 10 meter.",
        pilihan: [
            { id: "A", teks: "Nyalakan sein kanan lalu langsung potong jalan" },
            { id: "B", teks: "Sudah terlambat, lebih baik lurus saja daripada belok mendadak" },
            { id: "C", teks: "Nyalakan sein kiri untuk mengecoh pengendara lain" }
        ],
        jawaban: "B",
        penjelasan: "Lampu isyarat berbelok (sein) harus dinyalakan minimal 30 meter sebelum berbelok. Berbelok mendadak sangat membahayakan diri sendiri dan orang lain.",
        pasal: "Pasal 112 UU 22/2009",
        poin: 10
    },
    {
        id: 11,
        kategori: "regulasi",
        gambar: "https://placehold.co/600x400/1A3A6B/FFFFFF/png?text=Melewati+Trotoar",
        situasi: "Jalanan sangat macet, tapi trotoar di sebelah kiri kosong dari pejalan kaki.",
        pilihan: [
            { id: "A", teks: "Naik ke trotoar perlahan agar tidak mengganggu" },
            { id: "B", teks: "Tetap antre di jalan raya sesuai lajur" },
            { id: "C", teks: "Naik trotoar tapi klakson terus agar aman" }
        ],
        jawaban: "B",
        penjelasan: "Trotoar adalah hak pejalan kaki. Berkendara di trotoar dilarang dalam kondisi apapun karena dapat merampas hak pejalan kaki.",
        pasal: "Pasal 131 UU 22/2009",
        poin: 10
    },
    {
        id: 12,
        kategori: "legalitas",
        gambar: "https://placehold.co/600x400/1A3A6B/FFFFFF/png?text=Belum+Memiliki+SIM",
        situasi: "Teman Anda minta diantar ke pasar, padahal Anda baru usia 16 tahun dan belum memiliki SIM C.",
        pilihan: [
            { id: "A", teks: "Antar saja karena lewat jalan kampung" },
            { id: "B", teks: "Tolak dengan halus karena Anda belum punya SIM" },
            { id: "C", teks: "Pinjam SIM kakak untuk berjaga-jaga" }
        ],
        jawaban: "B",
        penjelasan: "Setiap orang yang mengemudikan kendaraan bermotor di jalan wajib memiliki Surat Izin Mengemudi sesuai jenis kendaraannya.",
        pasal: "Pasal 281 UU 22/2009",
        poin: 10
    },
    {
        id: 13,
        kategori: "adaptasi",
        gambar: "https://placehold.co/600x400/1A3A6B/FFFFFF/png?text=Menghindari+Jalan+Berlubang",
        situasi: "Anda sedang melaju dan melihat lubang besar di tengah lajur Anda.",
        pilihan: [
            { id: "A", teks: "Segera banting setir ke kanan tanpa melihat spion" },
            { id: "B", teks: "Kurangi kecepatan, cek spion, jika aman hindari lubang perlahan" },
            { id: "C", teks: "Tutup mata dan terjang lubangnya" }
        ],
        jawaban: "B",
        penjelasan: "Menghindari rintangan harus dengan kesadaran lingkungan (situational awareness). Cek spion wajib sebelum mengubah lajur agar tidak terserempet dari belakang.",
        pasal: "Keselamatan Dasar Berkendara",
        poin: 10
    },
    {
        id: 14,
        kategori: "prioritas darurat",
        gambar: "https://placehold.co/600x400/1A3A6B/FFFFFF/png?text=Mendengar+Sirene+Ambulans",
        situasi: "Terdengar sirene Ambulans meraung dari arah belakang Anda saat jalanan sedang padat.",
        pilihan: [
            { id: "A", teks: "Menepi ke kiri dan memberikan jalan sebisa mungkin" },
            { id: "B", teks: "Buntuti ambulans agar ikut bebas macet" },
            { id: "C", teks: "Diam di lajur karena sedang macet, tidak bisa ke mana-mana" }
        ],
        jawaban: "A",
        penjelasan: "Ambulans yang sedang mengangkut orang sakit/korban memiliki hak utama pengguna jalan yang mendapat prioritas lebih tinggi dari pengguna jalan lain.",
        pasal: "Pasal 134 UU 22/2009",
        poin: 10
    },
    {
        id: 15,
        kategori: "etika",
        gambar: "https://placehold.co/600x400/1A3A6B/FFFFFF/png?text=Jalan+Sempit",
        situasi: "Anda berpapasan dengan mobil lain di jalan sempit. Di sisi Anda ada ruang untuk menepi sejenak.",
        pilihan: [
            { id: "A", teks: "Tetap maju di tengah, biar mobil lain yang mundur" },
            { id: "B", teks: "Mengalah, menepi, dan memberikan isyarat agar mobil lain lewat" },
            { id: "C", teks: "Nyalakan lampu jauh terus menerus" }
        ],
        jawaban: "B",
        penjelasan: "Etika lalu lintas mewajibkan kita untuk saling mengalah dan menghormati pengguna jalan lain. Jika ada ruang di sisi kita, berinisiatiflah memberi jalan.",
        pasal: "Etika Transportasi",
        poin: 10
    }
];

// ============================================================
// KUIS UU DATA (20 Soal Pilihan Ganda)
// ============================================================
const KUIS_DATA = [
    {
        id: 1,
        gambar: "https://placehold.co/600x400/png?text=Gambar+Kuis",
        situasi: "Apa kepanjangan dari SIM?",
        pilihan: [
            { id: "A", teks: "Surat Izin Mengemudi" },
            { id: "B", teks: "Surat Izin Motor" },
            { id: "C", teks: "Surat Identitas Mengemudi" }
        ],
        jawaban: "A",
        penjelasan: "SIM adalah Surat Izin Mengemudi, bukti registrasi dan identifikasi yang diberikan oleh Polri.",
        pasal: "Pasal 77 UU 22/2009",
        poin: 10
    },
    {
        id: 2,
        gambar: "https://placehold.co/600x400/png?text=Gambar+Kuis",
        situasi: "Berapa batas usia minimal untuk memiliki SIM C?",
        pilihan: [
            { id: "A", teks: "16 Tahun" },
            { id: "B", teks: "17 Tahun" },
            { id: "C", teks: "18 Tahun" }
        ],
        jawaban: "B",
        penjelasan: "Batas usia minimal untuk memiliki SIM C (sepeda motor) adalah 17 tahun.",
        pasal: "Pasal 81 UU 22/2009",
        poin: 10
    },
    {
        id: 3,
        gambar: "https://placehold.co/600x400/png?text=Gambar+Kuis",
        situasi: "Apa fungsi utama dari zebra cross?",
        pilihan: [
            { id: "A", teks: "Tempat parkir motor" },
            { id: "B", teks: "Tempat pejalan kaki menyeberang" },
            { id: "C", teks: "Tempat putar balik" }
        ],
        jawaban: "B",
        penjelasan: "Zebra cross adalah tempat penyeberangan pejalan kaki yang dinyatakan dengan marka jalan.",
        pasal: "Fasilitas Pejalan Kaki",
        poin: 10
    },
    {
        id: 4,
        gambar: "https://placehold.co/600x400/png?text=Gambar+Kuis",
        situasi: "Rambu dengan warna dasar merah dan tulisan putih biasanya merupakan rambu...",
        pilihan: [
            { id: "A", teks: "Petunjuk" },
            { id: "B", teks: "Peringatan" },
            { id: "C", teks: "Larangan" }
        ],
        jawaban: "C",
        penjelasan: "Warna dasar merah dengan lambang/tulisan putih/hitam adalah karakteristik rambu larangan.",
        pasal: "Permenhub tentang Rambu",
        poin: 10
    },
    {
        id: 5,
        gambar: "https://placehold.co/600x400/png?text=Gambar+Kuis",
        situasi: "Apa hukuman mengendarai motor tanpa helm SNI?",
        pilihan: [
            { id: "A", teks: "Denda maksimal Rp250.000 atau kurungan 1 bulan" },
            { id: "B", teks: "Hanya ditegur oleh Polisi" },
            { id: "C", teks: "Motor disita" }
        ],
        jawaban: "A",
        penjelasan: "Pengendara dan penumpang yang tidak mengenakan helm SNI dipidana kurungan paling lama 1 bulan atau denda paling banyak Rp250.000.",
        pasal: "Pasal 291 ayat (1) UU 22/2009",
        poin: 10
    },
    {
        id: 6,
        gambar: "https://placehold.co/600x400/png?text=Gambar+Kuis",
        situasi: "Marka jalan berwarna kuning membujur tanpa putus di tengah jalan berarti...",
        pilihan: [
            { id: "A", teks: "Boleh mendahului" },
            { id: "B", teks: "Jalan nasional dan dilarang melintasi garis" },
            { id: "C", teks: "Batas kecepatan" }
        ],
        jawaban: "B",
        penjelasan: "Garis kuning membujur utuh merupakan batas lajur jalan nasional dan pengemudi dilarang melintasinya.",
        pasal: "Permenhub Marka Jalan",
        poin: 10
    },
    {
        id: 7,
        gambar: "https://placehold.co/600x400/png?text=Gambar+Kuis",
        situasi: "Jika terjadi kecelakaan, apa kewajiban pertama pengemudi?",
        pilihan: [
            { id: "A", teks: "Melarikan diri agar tidak dihakimi massa" },
            { id: "B", teks: "Berhenti, menolong korban, dan lapor polisi" },
            { id: "C", teks: "Membiarkan saja karena bukan salahnya" }
        ],
        jawaban: "B",
        penjelasan: "Pengemudi yang terlibat kecelakaan lalu lintas wajib menghentikan kendaraan, menolong korban, dan melapor ke Polri.",
        pasal: "Pasal 231 UU 22/2009",
        poin: 10
    },
    {
        id: 8,
        gambar: "https://placehold.co/600x400/png?text=Gambar+Kuis",
        situasi: "Apa fungsi dari lampu Hazard?",
        pilihan: [
            { id: "A", teks: "Memberi tanda saat hujan deras" },
            { id: "B", teks: "Tanda keadaan darurat saat berhenti" },
            { id: "C", teks: "Tanda rombongan konvoi" }
        ],
        jawaban: "B",
        penjelasan: "Lampu isyarat peringatan bahaya (hazard) hanya digunakan saat kendaraan berhenti karena keadaan darurat.",
        pasal: "Pasal 121 UU 22/2009",
        poin: 10
    },
    {
        id: 9,
        gambar: "https://placehold.co/600x400/png?text=Gambar+Kuis",
        situasi: "Berapa kecepatan maksimal di kawasan permukiman?",
        pilihan: [
            { id: "A", teks: "30 km/jam" },
            { id: "B", teks: "50 km/jam" },
            { id: "C", teks: "60 km/jam" }
        ],
        jawaban: "A",
        penjelasan: "Kecepatan maksimal pada jalan lingkungan/permukiman adalah 30 km/jam demi keselamatan bersama.",
        pasal: "PP No. 79 Tahun 2013",
        poin: 10
    },
    {
        id: 10,
        gambar: "https://placehold.co/600x400/png?text=Gambar+Kuis",
        situasi: "Apa yang harus dilakukan saat mendengar sirine pemadam kebakaran?",
        pilihan: [
            { id: "A", teks: "Merapat ke tepi jalan dan memberi prioritas jalan" },
            { id: "B", teks: "Melaju lebih cepat agar tidak tertinggal" },
            { id: "C", teks: "Abaikan saja" }
        ],
        jawaban: "A",
        penjelasan: "Pemadam kebakaran yang sedang bertugas adalah pengguna jalan yang mendapat prioritas nomor satu (1).",
        pasal: "Pasal 134 UU 22/2009",
        poin: 10
    },
    {
        id: 11,
        gambar: "https://placehold.co/600x400/png?text=Gambar+Kuis",
        situasi: "Selain SIM dan STNK, kelengkapan apa yang wajib dibawa?",
        pilihan: [
            { id: "A", teks: "KTP" },
            { id: "B", teks: "BPKB" },
            { id: "C", teks: "Helm SNI" }
        ],
        jawaban: "A",
        penjelasan: "Sebagai WNI, KTP adalah identitas wajib. Untuk pengemudian, SIM, STNK, dan kelengkapan standar kendaraan wajib ada.",
        pasal: "Pasal 106 ayat (5) UU 22/2009",
        poin: 10
    },
    {
        id: 12,
        gambar: "https://placehold.co/600x400/png?text=Gambar+Kuis",
        situasi: "Di mana posisi berjalan kaki yang benar jika tidak ada trotoar?",
        pilihan: [
            { id: "A", teks: "Di tengah jalan" },
            { id: "B", teks: "Di sebelah paling kanan (menghadap arus lalu lintas)" },
            { id: "C", teks: "Di sebelah kiri (searah arus)" }
        ],
        jawaban: "B",
        penjelasan: "Jika tidak ada trotoar, pejalan kaki wajib berjalan di tepi jalan menghadap arus kendaraan untuk keamanan visual.",
        pasal: "Pasal 132 UU 22/2009",
        poin: 10
    },
    {
        id: 13,
        gambar: "https://placehold.co/600x400/png?text=Gambar+Kuis",
        situasi: "Kendaraan bermotor wajib menyalakan lampu utama pada siang hari untuk...",
        pilihan: [
            { id: "A", teks: "Mobil penumpang" },
            { id: "B", teks: "Sepeda motor" },
            { id: "C", teks: "Truk barang" }
        ],
        jawaban: "B",
        penjelasan: "Pengendara sepeda motor wajib menyalakan lampu utama pada siang hari (Light On) agar lebih terlihat oleh pengemudi lain.",
        pasal: "Pasal 107 ayat (2) UU 22/2009",
        poin: 10
    },
    {
        id: 14,
        gambar: "https://placehold.co/600x400/png?text=Gambar+Kuis",
        situasi: "Apa yang dilarang saat berada di jalan tol?",
        pilihan: [
            { id: "A", teks: "Berjalan dengan kecepatan 80 km/jam" },
            { id: "B", teks: "Menaikkan atau menurunkan penumpang" },
            { id: "C", teks: "Menyalip dari sebelah kanan" }
        ],
        jawaban: "B",
        penjelasan: "Jalan tol adalah jalan bebas hambatan. Dilarang menaikkan/menurunkan penumpang di jalan tol karena sangat berbahaya.",
        pasal: "PP tentang Jalan Tol",
        poin: 10
    },
    {
        id: 15,
        gambar: "https://placehold.co/600x400/png?text=Gambar+Kuis",
        situasi: "Lampu kuning berkedip pada simpang jalan berarti...",
        pilihan: [
            { id: "A", teks: "Berhenti dan tunggu hijau" },
            { id: "B", teks: "Jalan terus secepatnya" },
            { id: "C", teks: "Hati-hati dan kurangi kecepatan" }
        ],
        jawaban: "C",
        penjelasan: "Isyarat lampu kuning berkedip (flashing yellow) memperingatkan pengemudi untuk berhati-hati dan mengurangi kecepatan.",
        pasal: "Aturan Rambu Bersinyal",
        poin: 10
    },
    {
        id: 16,
        gambar: "https://placehold.co/600x400/png?text=Gambar+Kuis",
        situasi: "Kapan plat nomor (TNKB) harus diganti baru?",
        pilihan: [
            { id: "A", teks: "Setiap 1 tahun" },
            { id: "B", teks: "Setiap 5 tahun" },
            { id: "C", teks: "Setiap ganti oli" }
        ],
        jawaban: "B",
        penjelasan: "TNKB dan STNK berlaku selama 5 tahun, yang harus dimintakan pengesahan setiap tahun.",
        pasal: "Pasal 70 UU 22/2009",
        poin: 10
    },
    {
        id: 17,
        gambar: "https://placehold.co/600x400/png?text=Gambar+Kuis",
        situasi: "Berapa banyak orang yang boleh dibonceng pada sepeda motor?",
        pilihan: [
            { id: "A", teks: "Maksimal 1 orang" },
            { id: "B", teks: "Maksimal 2 orang jika muat" },
            { id: "C", teks: "Tidak dibatasi" }
        ],
        jawaban: "A",
        penjelasan: "Sepeda motor hanya diperbolehkan untuk membawa paling banyak 1 (satu) orang penumpang.",
        pasal: "Pasal 106 ayat (9) UU 22/2009",
        poin: 10
    },
    {
        id: 18,
        gambar: "https://placehold.co/600x400/png?text=Gambar+Kuis",
        situasi: "Apa arti rambu berbentuk lingkaran dengan latar biru dan gambar panah lurus?",
        pilihan: [
            { id: "A", teks: "Larangan berjalan lurus" },
            { id: "B", teks: "Perintah berjalan lurus" },
            { id: "C", teks: "Petunjuk arah" }
        ],
        jawaban: "B",
        penjelasan: "Rambu dengan latar biru dan bentuk lingkaran adalah rambu perintah. Panah lurus berarti wajib lurus.",
        pasal: "Permenhub tentang Rambu",
        poin: 10
    },
    {
        id: 19,
        gambar: "https://placehold.co/600x400/png?text=Gambar+Kuis",
        situasi: "Alat pemantul cahaya tambahan pada bagian belakang truk berfungsi untuk...",
        pilihan: [
            { id: "A", teks: "Estetika kendaraan" },
            { id: "B", teks: "Mempermudah terlihat di malam hari" },
            { id: "C", teks: "Penanda perusahaan" }
        ],
        jawaban: "B",
        penjelasan: "Reflektor/alat pemantul cahaya wajib pada kendaraan besar untuk meminimalisir tabrak belakang di malam hari.",
        pasal: "Peraturan Keselamatan Kendaraan",
        poin: 10
    },
    {
        id: 20,
        gambar: "https://placehold.co/600x400/png?text=Gambar+Kuis",
        situasi: "Mengemudi di bawah pengaruh alkohol diancam dengan hukuman...",
        pilihan: [
            { id: "A", teks: "Tilang Rp100.000" },
            { id: "B", teks: "Denda maksimal Rp3.000.000 atau kurungan 1 tahun" },
            { id: "C", teks: "Kerja bakti sosial" }
        ],
        jawaban: "B",
        penjelasan: "Mengemudikan kendaraan secara tidak wajar atau dalam keadaan mabuk dipidana kurungan paling lama 1 tahun atau denda maksimal Rp3.000.000.",
        pasal: "Pasal 311 UU 22/2009",
        poin: 10
    }
];

// ============================================================
// ENSIKLOPEDIA RAMBU DATA
// ============================================================
const RAMBU_DATA = [
    { nama: "Dilarang Masuk",       tipe: "Larangan",          ikon: "⛔", gambar: "https://res.cloudinary.com/dtjbvmrow/image/upload/v1782295681/download_12_wivs0f.jpg", deskripsi: "Rambu lingkaran merah dengan garis strip putih mendatar. Semua kendaraan dilarang masuk ke jalan tersebut dari arah rambu dipasang." },
    { nama: "Dilarang Parkir",      tipe: "Larangan",          ikon: "🅿️🚫", gambar: "https://res.cloudinary.com/dtjbvmrow/image/upload/v1782295747/download_13_qejr8i.jpg", deskripsi: "Rambu lingkaran merah dengan huruf P dicoret. Kendaraan dilarang parkir di area yang ditentukan." },
    { nama: "Dilarang Berhenti",    tipe: "Larangan",          ikon: "🛑",  gambar: "https://res.cloudinary.com/dtjbvmrow/image/upload/v1782295871/VtJozUtZPkzitm4vNzTB2gKjj6Rjyq0g0yZ77FIN_zpjp7v.webp", deskripsi: "Rambu lingkaran merah dengan huruf S dicoret silang. Kendaraan dilarang berhenti walau sejenak." },
    { nama: "Zebra Cross",          tipe: "Peringatan",        ikon: "🚸",  gambar: "https://res.cloudinary.com/dtjbvmrow/image/upload/v1782295947/images_2_wwggp9.jpg", deskripsi: "Rambu persegi biru dengan segitiga putih bergambar orang menyeberang. Menunjukkan tempat penyeberangan pejalan kaki." },
    { nama: "Lampu Lalu Lintas",    tipe: "Peringatan",        ikon: "🚥",  gambar: "https://res.cloudinary.com/dtjbvmrow/image/upload/v1782295989/images_1_zswgez.png", deskripsi: "Rambu belah ketupat kuning bergambar lampu lalu lintas. Memperingatkan ada persimpangan bersinyal di depan." },
    { nama: "Wajib Lurus",          tipe: "Perintah",          ikon: "⬆️",  gambar: "https://res.cloudinary.com/dtjbvmrow/image/upload/v1782296093/images_3_aerqhw.jpg", deskripsi: "Rambu lingkaran biru dengan panah putih ke atas. Semua kendaraan wajib berjalan lurus." },
    { nama: "Jalan Licin",          tipe: "Peringatan",        ikon: "⚠️",  gambar: "https://res.cloudinary.com/dtjbvmrow/image/upload/v1782296141/images_4_fuchtd.jpg", deskripsi: "Rambu belah ketupat kuning dengan ikon mobil berkelok. Berhati-hati karena jalanan licin." },
    { nama: "Banyak Anak-Anak",     tipe: "Peringatan",        ikon: "🚸",  gambar: "https://res.cloudinary.com/dtjbvmrow/image/upload/v1782296231/images_2_ctcxbe.png", deskripsi: "Rambu belah ketupat kuning dengan ikon dua anak kecil. Area sekolah, kurangi kecepatan." },
    { nama: "Kecepatan Maks 40",    tipe: "Larangan",          ikon: "4️⃣0️⃣", gambar: "https://res.cloudinary.com/dtjbvmrow/image/upload/v1782296286/images_3_fv1azt.png", deskripsi: "Rambu lingkaran putih berbingkai merah dengan angka 40. Dilarang melebihi 40 km/jam." },
    { nama: "Dilarang menyalip",    tipe: "Larangan",          ikon: "🚫",  gambar: "https://res.cloudinary.com/dtjbvmrow/image/upload/v1782296426/images_5_a0ql9l.jpg", deskripsi: "Rambu lingkaran putih berbingkai merah dengan simbol dua mobil dan garis batas merah melintang. Menandakan larangan bagi semua kendaraan untuk menyalip/mendahului kendaraan lain di area jalan tersebut." }
];
