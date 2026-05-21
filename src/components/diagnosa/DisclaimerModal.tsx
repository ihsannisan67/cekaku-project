'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowRight, X, ShieldCheck } from 'lucide-react';

interface DisclaimerModalProps {
  onConfirm: () => void;
  disabled?: boolean;
}

export function DisclaimerModal({ onConfirm, disabled }: DisclaimerModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handleConfirm = () => {
    if (accepted) {
      setIsOpen(false);
      onConfirm();
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setAccepted(false);
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <motion.button
          whileHover={disabled ? {} : { scale: 1.02 }}
          whileTap={disabled ? {} : { scale: 0.98 }}
          disabled={disabled}
          className={`
            group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl
            px-8 py-4 text-lg font-bold shadow-xl transition-all
            ${disabled
              ? 'cursor-not-allowed bg-gray-300 text-gray-500'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-blue-600/30 hover:shadow-blue-600/50'}
          `}
        >
          {/* Shimmer effect */}
          {!disabled && (
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: '200%', opacity: [0, 0.5, 0] }}
              transition={{ duration: 1.5, delay: 1, repeat: Infinity, repeatDelay: 3 }}
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl"
            >
              <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </motion.div>
          )}

          <span className="relative z-10 flex items-center gap-3">
            <ShieldCheck className="h-5 w-5" />
            Lihat Hasil Diagnosa
            {!disabled && <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />}
          </span>
        </motion.button>
      </DialogTrigger>

      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="h-5 w-5" />
            Peringatan Penting
          </DialogTitle>
          <DialogDescription>
            Sebelum melanjutkan, harap baca dan setujui disclaimer berikut:
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-4">
            <h4 className="mb-3 font-bold text-amber-900">Penting untuk Diketahui:</h4>
            <ul className="space-y-3 text-sm text-amber-800">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-bold text-amber-700">1</span>
                <span>Cekaku adalah alat bantu <strong>skrining awal</strong> berbasis gejala, bukan diagnosis medis.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-bold text-amber-700">2</span>
                <span>Hasil diagnosa bersifat <strong>estimasi</strong> dan tidak boleh digunakan sebagai pengganti konsultasi dokter.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-bold text-amber-700">3</span>
                <span>Jika Anda memiliki <strong>kondisi medis serius</strong>, segera hubungi tenaga kesehatan profesional.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-bold text-amber-700">4</span>
                <span>Data yang Anda masukkan <strong>tidak disimpan</strong> di server manapun.</span>
              </li>
            </ul>
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-xl border-2 border-blue-200 bg-blue-50 p-4 transition-all hover:border-blue-300 hover:bg-blue-100">
            <Checkbox
              checked={accepted}
              onCheckedChange={(checked) => setAccepted(checked as boolean)}
              className="mt-0.5 border-2 border-blue-400"
            />
            <div className="flex-1">
              <span className="text-sm font-semibold text-blue-900">
                Saya memahami dan menerima disclaimer di atas
              </span>
              <p className="mt-1 text-xs text-blue-700">
                Centang untuk melanjutkan ke hasil diagnosa
              </p>
            </div>
          </label>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            className="flex-1 border-gray-300"
          >
            <X className="mr-2 h-4 w-4" />
            Batal
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!accepted}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
          >
            Lanjutkan
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}