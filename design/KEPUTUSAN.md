# Keputusan Desain Video Profile International Class 2026

## Disepakati
- Palet: **E2 UNIKAL Heritage** (design/palettes/opsi-E2.png)
  - Latar: navy `#09153F` ke `#122A5E`, tekstur kulit halus
  - Aksen: emas `#E9C546` (turunan kuning logo)
  - Teks: krem `#F6F1E6`, teks sekunder `#C3CBE0`
  - Frame polaroid: krem `#F6F1E6`, caption navy `#09153F`
- Logo UNIKAL tampil dengan warna asli (kuning lambang `#FFDE06`, navy `#09153F`), tidak diwarnai ulang.
- Tipografi: Fraunces (judul, kata kunci miring emas) + Geist (teks kecil). Diwarisi dari video portofolio Jen.
- Peran: Raisa Alatas = Moderator. Luciana Lelihoo Madeira (Lucy), Erick Kurniawan Syah, Laela Nur Fahmi = Narasumber (Speaker).
- Tiap orang tampil satu per satu dengan nama dan peran tertulis.
- Ukuran semua video: 16:9, 1920x1080 (ukuran PPT), diputar di backdrop acara. VERIFY: kalau backdrop LED, cek resolusi ke vendor.
- Video dokumenter: Jen kirim klip acak, Claude beri satu judul per video. Klip potret dalam bingkai yang bergeser seperti video portofolio.
- Template dokumenter: **Opsi C Cinematic** (design/documentary/dok-opsi-C.png). Letterbox, satu klip potret aktif di tengah, klip lain redup, carousel bergeser.
- Dokumenter TANPA keterangan nama kegiatan spesifik. Judul: **Learning Without Borders** (design/documentary/dokumenter-final.png).
- Gaya tulisan Jen: jangan pakai tanda hubung atau pisah (-, en dash, em dash) di teks video.

## Aset
- `assets/logos/lambang-unikal.png`: lambang UNIKAL 1484x1500, latar transparan. Dipakai di video, warna asli tidak diubah.
  Warna terukur: kuning `#FEEF11`, cokelat sayap `#8D5C2C`, merah `#E2322A`, hijau `#129045`, garis hitam.
  Cokelat sayap boleh dipakai sangat terbatas sebagai warna pendukung (misalnya garis tipis atau caption), bukan warna utama.

## Menunggu
- Logo lain (FEB, Unggul, Ikhlas, Diktisaintek) dikirim Jen lewat chat.

## Video Utama (pembuka talkshow)
- Fungsi: diputar di backdrop sebagai pembuka sesi talkshow, memperkenalkan moderator dan narasumber.
- Urutan: Pembuka, Raisa (The Moderator), Lucy (Speaker 01), Erick (Speaker 02), Laela (Speaker 03), Penutup dengan aba-aba masuk moderator.
- Adegan Tema acara DIHAPUS.
- Durasi total sekitar 5 menit (300 dtk). Tempo lambat, tidak terburu buru.
- Frame rate 60 fps. Gerak halus: easing sine dan expo out, zoom pelan terus menerus, transisi geser 1,2 sampai 1,6 dtk, tidak ada potongan mendadak.
- Pembagian waktu: Pembuka 20 dtk, Raisa 45 dtk (A 18, B 27), tiap narasumber 70 dtk (A 18, B 27, C 25), Penutup dan aba aba 25 dtk.
- Musik ditambahkan sendiri oleh Jen setelah render. Claude tidak mengurus musik.
- Bahan Raisa dipakai apa adanya (2 foto + 1 video). Hindari kesan berulang: pakai potongan frame video, crop detail berbeda, dan susunan polaroid yang bervariasi.
- Audio: TANPA musik. Hanya efek suara (whoosh geser adegan, foto jatuh, shutter, dsb).
- Teks layar: "Timor Leste" ditulis tanpa tanda hubung.
- **ATURAN: JANGAN render video (MP4) sebelum Jen memberi perintah.**

### Draf storyboard
| # | Adegan | Durasi | Isi |
|---|---|---|---|
| 1 | Pembuka | 20 dtk | Lambang UNIKAL, "International Class", "Management, Universitas Pekalongan" |
| 3 | The Moderator: Raisa Alatas | 45 dtk | Kartu nama, sorotan: Best Academic Performance 2025/2026, Kalasin University Thailand, Head of Clothing Rooang Karya |
| 4 | Speaker 01: Luciana Lelihoo Madeira | 70 dtk | International Student from Timor Leste, ISE 2025, Beyond Borders, Juara 1 Baca Puisi BIPA FHI 2026 |
| 5 | Speaker 02: Erick Kurniawan Syah | 70 dtk | Exchange UBD, InnovFest UBD, Student Innovative 2024 |
| 6 | Speaker 03: Laela | 70 dtk | Malaysia, P2MW 2026 (menunggu CV) |
| 7 | Penutup + aba-aba | 25 dtk | Empat polaroid berkumpul, "Learning Without Borders", lalu "Please welcome our moderator / Raisa Alatas". Frame terakhir diam di backdrop saat Raisa masuk |

## Revisi konten (dari review gambar diam)
- Foto perkenalan dibuat close up dan proporsional (crop kepala sampai pinggang, tubuh di tengah).
- Pencapaian Laela: **Best Idea Category**, IBPC 2, MILA University Malaysia, sesuai poster resmi FEB. Prestasi tim, ide bisnis "Nonabog".
- Tiap kartu nama punya satu kalimat bio, tiap pengalaman dan pencapaian punya deskripsi singkat. Semua dari isi CV, tanpa tambahan klaim.
- Lucy di Beyond Borders 2026: ditulis "Represented Timor Leste" sesuai CV (bukan "Speaker").
- Raisa: ditambah item Community Service Project (PKM Ikan Asap 2026) dari CV, cocok dengan video kegiatannya.

## Video Dokumenter (diputar di backdrop selama talkshow)
- 11 klip dari Jen (disimpan di media/doc, tidak di-commit). Dikonversi ke H.264 720x1280 tanpa audio. Klip lanskap c06 diisi latar blur.
- Semua klip MUTE. Tiap klip berulang (loop) dan tidak pernah berhenti, carousel tetap bergeser.
- Tiap klip aktif di tengah selama 10 dtk, geser 1,8 dtk. Satu putaran penuh 110 dtk, lalu berulang mulus.
- File: video/documentary.html (mode cek langsung: documentary.html?live=1).
- Render dokumenter: SATU file 110 dtk, diputar operator dengan mode loop. Frame terakhir menyambung mulus ke frame pertama.

## Revisi pembuka dan penutup
- Durasi total video utama menjadi 310 dtk (5:10). Penutup 35 dtk.
- Cold open 0 sampai 3 dtk: montase 6 foto (0,36 dtk per foto, kilatan dan shutter) dengan kata "Four stories." "One class." "No borders.", lalu hitam, lalu lambang UNIKAL menghentak dengan cahaya emas, cincin, dan bunyi impact di 3 dtk.
- Penutup motivasi: "Four different paths.", "One international classroom.", empat polaroid bertumpuk di tengah, "Your story starts here.", lalu "Learning Without Borders" dengan lambang dan impact, lalu aba aba moderator.
- SFX baru: impact dan riser (sintetis).

## Revisi versi gabungan (satu file)
- Video utama dipercepat: maksimal 3 dtk diam setelah animasi terakhir tiap adegan. Durasi 2:37 (157,1 dtk). Item daftar muncul tiap 1,8 dtk.
- Dokumenter: klip c07 (pria berjalan, "Creative people with deadlines be like") dihapus. Tiap klip 3 dtk, geser 0,9 dtk. Satu putaran 30 dtk.
- Output akhir satu file: video utama + fade 0,8 dtk + dokumenter, ukuran di bawah 100 MB (encode dua tahap).

## Revisi versi 2 gabungan
- Aba aba "Please welcome our moderator" DIHAPUS.
- Cold open diperpanjang: montase 12 foto 0,5 dtk dengan "Four stories." "One class." "No borders.", kilatan makin cepat, hitam, lambang menghentak di 8 dtk. Adegan pembuka 19 dtk.
- Penutup video utama berhenti di "Your story starts here." (18 dtk), lalu fade ke dokumenter.
- Dokumenter 4,5 dtk per klip (10 klip, 45 dtk).
- Ending dramatis baru (video/ending.html, 12,4 dtk): kilatan foto makin cepat, hitam, LEARNING menghentak, Without Borders menghentak dengan cahaya emas, lambang dan identitas program, fade ke hitam.
- Urutan file akhir: video utama (2:28,6) + dokumenter (0:45) + ending (0:12,4), fade 0,8 dtk antarbagian, di bawah 100 MB.
