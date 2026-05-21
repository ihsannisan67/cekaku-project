'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Activity, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Animated counter component
function AnimatedCounter({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(easeOut * value));

      if (now < endTime) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, value, duration]);

  return (
    <motion.div ref={ref} className="inline-flex items-baseline">
      <span className="tabular-nums">{count}</span>
      {suffix && <span>{suffix}</span>}
    </motion.div>
  );
}

const stats = [
  { value: 40, suffix: '+', label: 'Penyakit' },
  { value: 28, suffix: '', label: 'Jenis Gejala' },
  { value: 100, suffix: '%', label: 'Gratis' },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 md:py-32">
      <div className="absolute inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl"
        />
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-6xl"
        >
          Kenali Gejala,<br />
          <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            Pahami Kesehatanmu
          </span>
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
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 10px 40px rgba(37, 99, 235, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-shadow hover:bg-blue-700"
            >
              Mulai Diagnosa
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats Section - Fixed alignment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex justify-center gap-8 md:gap-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1, type: 'spring', stiffness: 200 }}
              className="flex flex-col items-center"
            >
              <div className="flex items-baseline justify-center text-4xl font-bold text-blue-600 md:text-5xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-1 text-sm font-medium text-gray-600 md:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}