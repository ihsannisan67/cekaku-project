'use client';

import { motion } from 'framer-motion';
import { Activity, Shield, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 md:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-700">
            <Activity className="h-4 w-4" />
            <span>Diagnosa Berbasis AI</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-6xl"
        >
          Kenali Gejala,<br />
          <span className="text-blue-600">Pahami Kesehatanmu</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-10 max-w-2xl text-lg text-gray-600"
        >
          Cekaku membantu Anda mengidentifikasi kemungkinan penyakit berdasarkan gejala yang dialami.
          Dapatkan penanganan awal yang tepat dan ketahui kapan harus segera ke dokter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center justify-center gap-6 sm:flex-row"
        >
          <Link href="/diagnosa">
            <button className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg">
              Mulai Diagnosa
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">40+</div>
            <div className="text-sm text-gray-600">Penyakit</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">28</div>
            <div className="text-sm text-gray-600">Jenis Gejala</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">100%</div>
            <div className="text-sm text-gray-600">Gratis</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}