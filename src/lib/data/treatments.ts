import type { Treatment } from '@/types';

/**
 * Treatment plans for diseases that can be treated at home.
 */
export const TREATMENTS: Treatment[] = [
  {
    diseaseId: 'flu_biasa',
    steps: [
      { order: 1, title: 'Istirahat Cukup', description: 'Tidur minimal 8 jam, kurangi aktivitas berat.' },
      { order: 2, title: 'Perbanyak Cairan', description: 'Minum air putih minimal 2 liter per hari, bisa ditambah sup hangat.' },
      { order: 3, title: 'Kompres Hangat', description: 'Untuk meredakan demam, kompres dahi dengan air hangat.' },
      { order: 4, title: 'Jaga Kebersihan', description: 'Cuci tangan rutin, gunakan masker agar tidak menular.' },
    ],
    medications: ['Paracetamol (demam/nyeri)', 'Vitamin C', 'Obat flu OTC (CTM, dekongestan)'],
    whenToSeeDoctor: ['Demam di atas 39°C lebih dari 3 hari', 'Sulit bernapas', 'Nyeri dada'],
    duration: '7–10 hari',
  },
  {
    diseaseId: 'influenza',
    steps: [
      { order: 1, title: 'Istirahat di Tempat Tidur', description: 'Minimal 3-5 hari, hindari aktivitas berat.' },
      { order: 2, title: 'Perbanyak Minum', description: 'Air hangat, jus, atau sup kaldu untuk menjaga hidrasi.' },
      { order: 3, title: 'Obat Pereda Gejala', description: 'Paracetamol untuk demam, dekongestan untuk hidung tersumbat.' },
      { order: 4, title: 'Gunakan Humidifier', description: 'Udara lembap membantu melegakan saluran napas.' },
    ],
    medications: ['Paracetamol', 'Ibuprofen', 'Dekongestan', 'Vitamin C & D'],
    whenToSeeDoctor: ['Sesak napas', 'Demam tidak turun lebih dari 4 hari', 'Nyeri dada berat'],
    duration: '7–14 hari',
  },
  {
    diseaseId: 'sakit_kepala_tegang',
    steps: [
      { order: 1, title: 'Relaksasi Otot', description: 'Pijat lembut leher dan bahu, atau kompres hangat di area ketegangan.' },
      { order: 2, title: 'Istirahat Mata', description: 'Hindari menatap layar terlalu lama, tutup mata beberapa menit.' },
      { order: 3, title: 'Atur Pernapasan', description: 'Bernapas dalam-dalam untuk mengurangi stres.' },
      { order: 4, title: 'Perbaiki Postur', description: 'Pastikan posisi duduk dan berdiri tegak lurus.' },
    ],
    medications: ['Paracetamol', 'Ibuprofen', 'Aspirin'],
    whenToSeeDoctor: ['Sakit kepala lebih dari 3 hari', 'Mual atau pandangan kabur', 'Sakit kepala sangat berat'],
    duration: '1–3 hari',
  },
  {
    diseaseId: 'migrain',
    steps: [
      { order: 1, title: 'Istirahat di Ruang Gelap', description: 'Hindari cahaya terang dan suara keras.' },
      { order: 2, title: 'Kompres Dingin atau Hangat', description: 'Letakkan di dahi atau leher untuk meredakan nyeri.' },
      { order: 3, title: 'Hindari Pemicu', description: 'Makanan tertentu, stres, atau kurang tidur.' },
      { order: 4, title: 'Minum Air Putih', description: 'Dehidrasi bisa memperburuk migrain.' },
    ],
    medications: ['Paracetamol', 'Sumatriptan', 'Ibuprofen'],
    whenToSeeDoctor: ['Migrain lebih dari 2x seminggu', 'Tidak membaik dengan obat biasa', 'Gangguan penglihatan'],
    duration: '4–72 jam per episode',
  },
  {
    diseaseId: 'maag',
    steps: [
      { order: 1, title: 'Makan Sedikit tapi Sering', description: '5-6 kali sehari dengan porsi kecil.' },
      { order: 2, title: 'Hindari Makanan Pemicu', description: 'Pedas, asam, kafein, dan alkohol.' },
      { order: 3, title: 'Jangan Berbaring Setelah Makan', description: 'Tunggu minimal 2 jam setelah makan.' },
      { order: 4, title: 'Kelola Stres', description: 'Stres meningkatkan produksi asam lambung.' },
    ],
    medications: ['Antasida', 'Omeprazole', 'Ranitidine'],
    whenToSeeDoctor: ['Nyeri tidak hilang lebih dari 2 minggu', 'Muntah darah', 'Penurunan berat badan'],
    duration: '2–4 minggu',
  },
  {
    diseaseId: 'diare_akut',
    steps: [
      { order: 1, title: 'Rehidrasi', description: 'Minum oralit atau air putih yang banyak.' },
      { order: 2, title: 'Makan Makanan Ringan', description: 'Bubur, nasi putih, pisang.' },
      { order: 3, title: 'Hindari Produk Susu', description: '暂时的，不要喝牛奶和其他乳制品。' },
      { order: 4, title: 'Jaga Kebersihan', description: 'Cuci tangan dengan sabun setelah BAB.' },
    ],
    medications: ['Oralit (ORS)', 'Loperamide (Imodium)', 'Probiotik'],
    whenToSeeDoctor: ['Diare lebih dari 3 hari', 'Ada darah di tinja', 'Demam tinggi'],
    duration: '2–5 hari',
  },
  {
    diseaseId: 'sembelit',
    steps: [
      { order: 1, title: 'Perbanyak Serat', description: 'Buah, sayur, dan biji-bijian.' },
      { order: 2, title: 'Minum Air Putih', description: 'Minimal 2 liter per hari.' },
      { order: 3, title: 'Olahraga Ringan', description: 'Jalan kaki 30 menit setiap hari.' },
      { order: 4, title: 'Jangan Menunda BAB', description: 'BAB teratur di waktu yang sama setiap hari.' },
    ],
    medications: ['Laksatif alami (psyllium)', 'Docusate sodium'],
    whenToSeeDoctor: ['Sembelit lebih dari 2 minggu', 'Nyeri perut hebat', 'Ada darah'],
    duration: 'Bervariasi',
  },
  {
    diseaseId: 'alergi_rhinitis',
    steps: [
      { order: 1, title: 'Hindari Alergen', description: 'Debu, serbuk sari, bulu hewan.' },
      { order: 2, title: 'Bilasi Hidung', description: 'Gunakan saline spray untuk membersihkan hidung.' },
      { order: 3, title: 'Gunakan Humidifier', description: 'Udara lembap membantu pernapasan.' },
    ],
    medications: ['Antihistamin (Cetirizine, Loratadine)', 'Dekongestan nasal', 'Corticosteroid nasal'],
    whenToSeeDoctor: ['Gejala tidak membaik', 'Sulit tidur', 'Infeksi sinus berulang'],
    duration: 'Musiman atau kronis',
  },
  {
    diseaseId: 'alergi_kulit',
    steps: [
      { order: 1, title: 'Hindari Pemicu', description: 'Identifikasi dan hindari alergen.' },
      { order: 2, title: 'Kompres Dingin', description: 'Bungkus es dengan kain, tempelkan di area gatal.' },
      { order: 3, title: 'Jangan Digaruk', description: 'Menggaruk dapat menyebabkan infeksi.' },
    ],
    medications: ['Antihistamin oral', 'Krim kortikosteroid', 'Losion kalamin'],
    whenToSeeDoctor: ['Ruam menyebar', 'Demam', 'Tanda infeksi (nanah)'],
    duration: '1–2 minggu',
  },
  {
    diseaseId: 'insomnia_primer',
    steps: [
      { order: 1, title: 'Atur Jadwal Tidur', description: 'Tidur dan bangun di waktu yang sama.' },
      { order: 2, title: 'Hindari Kafein', description: 'Tidak minum kopi/teh setelah jam 2 siang.' },
      { order: 3, title: 'Buat Ritual Tidur', description: 'Mandi air hangat, baca buku sebelum tidur.' },
      { order: 4, title: 'Hindari Layar', description: 'Tidak pakai HP/laptop 1 jam sebelum tidur.' },
    ],
    medications: ['Melatonin', 'Valerian root', 'Obat tidur ( resep)'],
    whenToSeeDoctor: ['Insomnia lebih dari 1 bulan', 'Kelelahan berat di siang hari'],
    duration: 'Bervariasi',
  },
  {
    diseaseId: 'kelelahan_kronis',
    steps: [
      { order: 1, title: 'Prioritaskan Istirahat', description: 'Tidur cukup, jangan memaksakan diri.' },
      { order: 2, title: 'Aktivitas Sedikit demi Sedikit', description: 'Peningkatan aktivitas secara bertahap.' },
      { order: 3, title: 'Kelola Stres', description: 'Meditasi, yoga, atau teknik relaksasi.' },
    ],
    medications: ['Suplemen (Vitamin B12, Magnesium)', 'Coenzyme Q10'],
    whenToSeeDoctor: ['Tidak ada perbaikan setelah 3 bulan', 'Gejala memburuk'],
    duration: 'Kronis',
  },
  {
    diseaseId: 'anemia_ringan',
    steps: [
      { order: 1, title: 'Perbanyak Makanan kaya Zat Besi', description: 'Daging merah, bayam, kacang-kacangan.' },
      { order: 2, title: 'Konsumsi Vitamin C', description: 'Membantu penyerapan zat besi.' },
      { order: 3, title: 'Hindari Teh/Kopi Saat Makan', description: 'Menghambat penyerapan zat besi.' },
    ],
    medications: ['Suplemen zat besi', 'Vitamin B12', 'Asam folat'],
    whenToSeeDoctor: ['Demam atau infeksi berulang', 'Pusing berat', 'Sesak napas'],
    duration: '2–3 bulan',
  },
  {
    diseaseId: 'gerd',
    steps: [
      { order: 1, title: 'Makan Porsi Kecil', description: 'Hindari makan terlalu banyak dalam sekali makan.' },
      { order: 2, title: 'Hindari Makanan Asam', description: 'Tomat, jeruk, makanan pedas.' },
      { order: 3, title: 'Tinggikan Kepala Saat Tidur', description: 'Gunakan bantal tambahan.' },
      { order: 4, title: 'Jangan Makan 3 Jam Sebelum Tidur', description: 'Beri waktu lambung untuk kosong.' },
    ],
    medications: ['Antasida', 'Omeprazole', 'H2 Blocker'],
    whenToSeeDoctor: ['Nyeri dada', 'Kesulitan menelan', 'Penurunan berat badan'],
    duration: 'Kronis',
  },
  {
    diseaseId: 'sinusitis',
    steps: [
      { order: 1, title: 'Inhalasi Uap', description: 'Hirup uap air hangat untuk melegakan sinus.' },
      { order: 2, title: 'Bilasi Hidung', description: 'Gunakan saline spray beberapa kali sehari.' },
      { order: 3, title: 'Kompres Hangat', description: 'Tempelkan di wajah untuk mengurangi nyeri.' },
    ],
    medications: ['Dekongestan', 'Antibiotik (jika bakteri)', 'Corticosteroid nasal'],
    whenToSeeDoctor: ['Gejala lebih dari 10 hari', 'Demam tinggi', 'Nyeri wajah parah'],
    duration: '7–14 hari',
  },
  {
    diseaseId: 'faringitis',
    steps: [
      { order: 1, title: 'Berkumur Air Garam', description: 'Campurkan 1/2 sendok teh garam dalam air hangat.' },
      { order: 2, title: 'Minum Air Hangat', description: 'Teh madu, kaldu hangat.' },
      { order: 3, title: 'Istirahat Suara', description: 'Jangan berbicara terlalu banyak.' },
    ],
    medications: ['Pereda nyeri (Paracetamol)', 'Lozenges', 'Antibiotik (jika bakteri)'],
    whenToSeeDoctor: ['Demam lebih dari 2 hari', 'Sulit menelan', 'Bengkak di leher'],
    duration: '5–7 hari',
  },
  {
    diseaseId: 'tonsilitis',
    steps: [
      { order: 1, title: 'Istirahat yang Cukup', description: 'Berikan waktu tubuh untuk pulih.' },
      { order: 2, title: 'Minum Banyak Cairan', description: 'Cairan hangat membantu meredakan nyeri.' },
      { order: 3, title: 'Makanan Lunak', description: 'Bubur, sup, es krim.' },
    ],
    medications: ['Paracetamol', 'Antibiotik (jika disebabkan bakteri)'],
    whenToSeeDoctor: ['Sulit bernapas', 'Demam tinggi', 'Tidak membaik dengan antibiotik'],
    duration: '7–10 hari',
  },
  {
    diseaseId: 'nyeri_punggung_mekanik',
    steps: [
      { order: 1, title: 'Kompres Hangat', description: 'Tempelkan di area punggung yang nyeri.' },
      { order: 2, title: 'Stretching Ringan', description: 'Peregangan otot punggung perlahan.' },
      { order: 3, title: 'Perbaiki Postur', description: 'Duduk dan berdiri tegak.' },
    ],
    medications: ['Paracetamol', 'Ibuprofen', 'Salep pereda nyeri'],
    whenToSeeDoctor: ['Nyeri lebih dari 2 minggu', 'Nyeri menjalar ke kaki', 'Mati rasa'],
    duration: '1–4 minggu',
  },
  {
    diseaseId: 'vertigo',
    steps: [
      { order: 1, title: 'Manuver Epley', description: 'Latihan khusus untuk memindahkan kristal di telinga.' },
      { order: 2, title: 'Hindari Gerakan Tiba-tiba', description: 'Bangun perlahan dari posisi tidur.' },
      { order: 3, title: 'Duduk Saat Pusing', description: 'Hindari jatuh dengan langsung duduk.' },
    ],
    medications: ['Meclizine', 'Dimenhidrinat'],
    whenToSeeDoctor: ['Pusing lebih dari 2 minggu', 'Gangguan pendengaran', 'Pusing saat istirahat'],
    duration: 'Berulang',
  },
  {
    diseaseId: 'isk',
    steps: [
      { order: 1, title: 'Perbanyak Minum Air', description: 'Minum minimal 8 gelas per hari.' },
      { order: 2, title: 'Jangan Menahan BAB', description: 'BAK teratur untuk membersihkan bakteri.' },
      { order: 3, title: 'Hindari Pewangi Area Kewanitaan', description: 'Douching bisa mengganggu flora normal.' },
    ],
    medications: ['Antibiotik (Nitrofurantoin, Trimethoprim)'],
    whenToSeeDoctor: ['Demam atau nyeri punggung', 'Darurat medis jika tidak membaik'],
    duration: '3–7 hari',
  },
];

/**
 * Get treatment by disease ID
 */
export function getTreatmentByDiseaseId(diseaseId: string): Treatment | undefined {
  return TREATMENTS.find(t => t.diseaseId === diseaseId);
}