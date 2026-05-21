'use client';

import { motion } from 'framer-motion';
import { AlertCircle, Phone } from 'lucide-react';

interface HospitalAlertProps {
  diseaseName: string;
}

export function HospitalAlert({ diseaseName }: HospitalAlertProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="rounded-xl border-2 border-red-300 bg-red-50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="mb-2 text-lg font-bold text-red-900">
              SEGERA KE RUMAH SAKIT!
            </h3>
            <p className="mb-4 text-sm text-red-800">
              Hasil diagnosa menunjukkan kemungkinan <strong>{diseaseName}</strong>.
              Kondisi ini memerlukan penanganan medis segera. Jangan tunda untuk pergi ke
              IGD atau hubungi layanan kesehatan terdekat.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:119"
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                <Phone className="h-4 w-4" />
                Hubungi 119
              </a>
              <a
                href="https://yankes.kemkes.go.id/main/detail/KontakIGD"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
              >
                Cari IGD Terdekat
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}