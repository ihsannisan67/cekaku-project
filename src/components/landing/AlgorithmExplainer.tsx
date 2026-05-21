'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Scale, Clock, Sparkles, GitBranch, Zap } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Symptom Weighting',
    description: 'Gejala yang jarang muncul di banyak penyakit mendapat bobot lebih tinggi karena memiliki nilai diagnostik yang lebih besar.',
    color: 'purple',
  },
  {
    icon: Scale,
    title: 'Coverage Scoring',
    description: 'Penyakit yang gejalanya lebih banyak cocok dengan gejala yang dipilih user mendapat skor lebih tinggi.',
    color: 'blue',
  },
  {
    icon: Zap,
    title: 'Real-time Processing',
    description: 'Hasil diagnosa diberikan secara instan tanpa perlu menunggu atau mengirim data ke server.',
    color: 'green',
  },
];

export function AlgorithmExplainer() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.5, rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-20 -left-20 h-40 w-40 rounded-full border-4 border-blue-100"
        />
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.3, rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full border-4 border-purple-100"
        />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg"
          >
            <Sparkles className="h-7 w-7" />
          </motion.div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Algoritma Diagnosa Kami
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Menggunakan pendekatan <strong className="text-blue-600">Weighted Bayesian Scoring</strong> yang didasarkan pada penelitian ilmiah
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-6"
        >
          <div className="flex items-center gap-3">
            <GitBranch className="h-5 w-5 text-blue-600" />
            <p className="text-sm text-blue-900">
              <strong>Referensi:</strong> Algoritma ini didasarkan pada penelitian dari{' '}
              <span className="font-medium">MDPI Computers (2024)</span>,{' '}
              <span className="font-medium">Frontiers in AI (2024)</span>, dan{' '}
              <span className="font-medium">PMC9317937 (MDPI Entropy, 2022)</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const colorClasses = {
    purple: {
      bg: 'from-purple-100 to-violet-50',
      icon: 'bg-gradient-to-br from-purple-500 to-violet-600 text-white',
      accent: 'bg-purple-500',
    },
    blue: {
      bg: 'from-blue-100 to-cyan-50',
      icon: 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white',
      accent: 'bg-blue-500',
    },
    green: {
      bg: 'from-green-100 to-emerald-50',
      icon: 'bg-gradient-to-br from-green-500 to-emerald-600 text-white',
      accent: 'bg-green-500',
    },
  };

  const colors = colorClasses[feature.color as keyof typeof colorClasses];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors.bg} p-8 shadow-md transition-shadow hover:shadow-xl`}
    >
      {/* Top accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
        className={`absolute top-0 left-0 h-1 w-full ${colors.accent}`}
      />

      {/* Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={isInView ? { scale: 1, rotate: 0 } : {}}
        transition={{ delay: index * 0.15 + 0.1, type: 'spring', stiffness: 200 }}
        className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${colors.icon} shadow-lg`}
      >
        <feature.icon className="h-8 w-8" />
      </motion.div>

      {/* Content */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.2 }}
        className="mb-3 text-xl font-bold text-gray-900"
      >
        {feature.title}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.3 }}
        className="leading-relaxed text-gray-600"
      >
        {feature.description}
      </motion.p>

      {/* Decorative corner */}
      <div className="absolute -bottom-4 -right-4 h-16 w-16 rounded-full bg-white/50" />
    </motion.div>
  );
}