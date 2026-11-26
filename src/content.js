// SEMUA TEKS DAN DATA ADA DI SINI. Ganti isinya tanpa menyentuh komponen.
// Item bertanda VERIFY = belum terverifikasi, wajib dicek ke prodi sebelum rilis.

export const site = {
  program: 'International Class',
  department: 'Management Study Program',
  university: 'Universitas Pekalongan (UNIKAL)',
  year: '2026',
  registerUrl: '#', // VERIFY: link pendaftaran resmi
  contactEmail: '', // VERIFY: email resmi prodi (kosongkan = disembunyikan)
  instagram: '', // VERIFY: handle resmi
};

export const hero = {
  eyebrow: 'International Class · Class of 2026',
  title: 'Think Global. Lead Local.',
  sub: 'An English-medium management program at Universitas Pekalongan, built for students who want to compete beyond borders.',
  // Taruh file video di public/media/. Tanpa file, hero memakai latar gradien.
  bgVideo: 'media/hero-loop.mp4',
  poster: 'media/hero-poster.jpg',
};

export const manifesto =
  'We believe a world class business education can start in Pekalongan. Here, students learn in English, think across cultures, and turn local strengths into global ideas.';

export const film = {
  label: 'The Video Profile',
  title: 'Watch the story of our class',
  // Pilih salah satu: youtubeId ATAU file lokal. youtubeId diprioritaskan.
  youtubeId: '', // contoh: 'dQw4w9WgXcQ'
  file: 'media/video-profile.mp4',
  poster: 'media/video-poster.jpg',
  duration: '', // contoh: '3:42'
};

// VERIFY: semua angka di bawah adalah CONTOH. Ganti dengan data resmi prodi.
export const stats = [
  { value: 100, suffix: '%', label: 'English-medium core courses' },
  { value: 4, suffix: '+', label: 'Partner universities abroad' },
  { value: 30, suffix: '', label: 'Seats per intake' },
  { value: 8, suffix: '', label: 'Semesters to graduate' },
];

export const pillars = [
  {
    no: '01',
    title: 'Learn in English',
    body: 'Lectures, case studies, and presentations run in English, so fluency grows every single week.',
  },
  {
    no: '02',
    title: 'Go Abroad',
    body: 'Student exchange and short programs open the door to classrooms outside Indonesia.', // VERIFY: nama mitra
  },
  {
    no: '03',
    title: 'Research Early',
    body: 'Students join conferences and publish papers while still in their undergraduate years.',
  },
  {
    no: '04',
    title: 'Lead Communities',
    body: 'From student organizations to youth movements, leadership is practiced, not only taught.',
  },
];

// VERIFY: testimoni HARUS dari orang asli dengan izin tertulis. Ini placeholder.
export const voices = [
  { quote: '[Quote from a current student]', name: '[Student name]', role: 'Batch 20XX' },
  { quote: '[Quote from an exchange alumni]', name: '[Alumni name]', role: 'Exchange, [University]' },
  { quote: '[Quote from a lecturer]', name: '[Lecturer name]', role: 'Lecturer, Management' },
];

export const marquee = ['International Class', 'Manajemen UNIKAL', 'Class of 2026'];

export const cta = {
  title: 'Your global journey starts here.',
  button: 'Register Now',
};
