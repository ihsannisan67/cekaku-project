'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Info } from 'lucide-react';

interface DisclaimerProps {
  disclaimer: string;
}

export function Disclaimer({ disclaimer }: DisclaimerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div className="overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-sm">
        {/* Top accent */}
        <div className="flex items-center gap-2 border-b border-amber-100 bg-amber-100/50 px-4 py-3">
          <Shield className="h-4 w-4 text-amber-600" />
          <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">
            Peringatan Penting
          </span>
        </div>

        <div className="flex items-start gap-4 p-5">
          <motion.div
            animate={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100"
          >
            <AlertTriangle className="h-5 w-5 text-amber-600" />
          </motion.div>

          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-amber-600" />
              <h3 className="font-bold text-amber-900">Disclaimer</h3>
            </div>
            <p className="text-sm leading-relaxed text-amber-800">
              {disclaimer}
            </p>
          </div>
        </div>

        {/* Bottom decorative gradient */}
        <div className="h-1 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300" />
      </div>
    </motion.div>
  );
}