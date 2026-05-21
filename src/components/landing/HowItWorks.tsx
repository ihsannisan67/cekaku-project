'use client';

import { motion } from 'framer-motion';
import { User, ListChecks, FileText } from 'lucide-react';

const steps = [
  {
    icon: User,
    title: 'Isi Data Diri',
    description: 'Masukkan umur dan jenis kelamin Anda untuk hasil yang lebih akurat.',
    number: '01',
  },
  {
    icon: ListChecks,
    title: 'Pilih Gejala',
    description: 'Pilih gejala yang Anda rasakan dari daftar yang tersedia.',
    number: '02',
  },
  {
    icon: FileText,
    title: 'Lihat Hasil',
    description: 'Dapatkan estimasi penyakit beserta saran penanganan.',
    number: '03',
  },
];

export function HowItWorks() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Cara Kerja Cekaku
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Tiga langkah mudah untuk mengetahui kondisi kesehatan Anda
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl bg-gray-50 p-8 text-center"
            >
              <div className="absolute -top-4 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                {index + 1}
              </div>
              <div className="mb-6 mt-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}