'use client';

import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface DisclaimerProps {
  disclaimer: string;
}

export function Disclaimer({ disclaimer }: DisclaimerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="mt-8 rounded-xl bg-amber-50 p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 flex-shrink-0 text-amber-600" />
          <div>
            <h3 className="mb-2 font-semibold text-amber-900">
              Disclaimer / Peringatan
            </h3>
            <p className="text-sm leading-relaxed text-amber-800">
              {disclaimer}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}