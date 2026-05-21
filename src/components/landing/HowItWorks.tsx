'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { User, ListChecks, FileText } from 'lucide-react';

const steps = [
  {
    icon: User,
    title: 'Isi Data Diri',
    description: 'Masukkan umur dan jenis kelamin Anda untuk hasil yang lebih akurat.',
  },
  {
    icon: ListChecks,
    title: 'Pilih Gejala',
    description: 'Pilih gejala yang Anda rasakan dari daftar yang tersedia.',
  },
  {
    icon: FileText,
    title: 'Lihat Hasil',
    description: 'Dapatkan estimasi penyakit beserta saran penanganan.',
  },
];

export function HowItWorks() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Cara Kerja Cekaku
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Tiga langkah mudah untuk mengetahui kondisi kesehatan Anda
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <StepCard key={step.title} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        type: 'spring',
        stiffness: 100,
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white p-8 text-center shadow-sm transition-shadow hover:shadow-lg"
    >
      {/* Step number badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.3, type: 'spring', stiffness: 200 }}
        className="absolute -top-2 -right-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-500 text-lg font-bold text-white shadow-lg"
      >
        {index + 1}
      </motion.div>

      {/* Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.2 }}
        className="mb-6 mt-4 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 shadow-md transition-transform group-hover:scale-110"
      >
        <step.icon className="h-10 w-10" />
      </motion.div>

      {/* Content */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.4 }}
        className="mb-3 text-xl font-bold text-gray-900"
      >
        {step.title}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.5 }}
        className="text-gray-600"
      >
        {step.description}
      </motion.p>

      {/* Bottom accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.6, duration: 0.4 }}
        className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-600 to-blue-400"
      />
    </motion.div>
  );
}