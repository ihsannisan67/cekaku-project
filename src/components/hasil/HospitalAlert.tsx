'use client';

import { motion } from 'framer-motion';
import { AlertCircle, ShieldCheck } from 'lucide-react';

interface HospitalAlertProps {
  diseaseName: string;
}

export function HospitalAlert({ diseaseName }: HospitalAlertProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
    >
      <div className="relative overflow-hidden rounded-2xl border-2 border-red-300 bg-gradient-to-br from-red-50 to-rose-50 p-6 shadow-lg">
        {/* Animated warning stripes */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-red-100/30 to-transparent"
        />

        <div className="relative flex items-start gap-4">
          {/* Animated icon */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-600 shadow-lg"
          >
            <AlertCircle className="h-7 w-7 text-white" />
            {/* Pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.8, 2], opacity: [0.5, 0, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-red-400"
            />
          </motion.div>

          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-2 flex items-center gap-2"
            >
              <ShieldCheck className="h-5 w-5 text-red-600" />
              <h3 className="text-xl font-bold text-red-900">
                SEGERA KE RUMAH SAKIT!
              </h3>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm leading-relaxed text-red-800"
            >
              Hasil diagnosa menunjukkan kemungkinan <strong className="text-red-900">{diseaseName}</strong>.
              Kondisi ini memerlukan penanganan medis segera. Segera pergi ke IGD rumah sakit terdekat untuk pemeriksaan lebih lanjut.
            </motion.p>
          </div>
        </div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-red-500 via-rose-500 to-red-500"
        />
      </div>
    </motion.div>
  );
}