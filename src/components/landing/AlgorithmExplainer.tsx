'use client';

import { motion } from 'framer-motion';
import { Brain, Scale, Clock } from 'lucide-react';

export function AlgorithmExplainer() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Algoritma Diagnosa Kami
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Menggunakan pendekatan Weighted Bayesian Scoring yang didasarkan pada penelitian ilmiah
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-white p-8 shadow-sm"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
              <Brain className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              Symptom Weighting
            </h3>
            <p className="text-sm text-gray-600">
              Gejala yang jarang muncul di banyak penyakit mendapat bobot lebih tinggi karena memiliki nilai diagnostik yang lebih besar.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-white p-8 shadow-sm"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Scale className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              Coverage Scoring
            </h3>
            <p className="text-sm text-gray-600">
              Penyakit yang gejalanya lebih banyak cocok dengan gejala yang dipilih user mendapat skor lebih tinggi.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-white p-8 shadow-sm"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              Real-time Processing
            </h3>
            <p className="text-sm text-gray-600">
              Hasil diagnosa diberikan secara instan tanpa perlu menunggu atau mengirim data ke server.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 rounded-xl bg-blue-50 p-6 text-center"
        >
          <p className="text-sm text-blue-800">
            <strong>Referensi:</strong> Algoritma ini didasarkan pada penelitian dari MDPI Computers (2024),
            Frontiers in AI (2024), dan PMC9317937 (MDPI Entropy, 2022)
          </p>
        </motion.div>
      </div>
    </section>
  );
}