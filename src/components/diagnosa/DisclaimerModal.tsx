'use client';

import { useState } from 'react';
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
import { AlertTriangle } from 'lucide-react';

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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="w-full"
          disabled={disabled}
          onClick={() => setIsOpen(true)}
        >
          Lihat Hasil Diagnosa
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Peringatan Penting
          </DialogTitle>
          <DialogDescription>
            Sebelum melanjutkan, harap baca dan setujui disclaimer berikut:
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-lg bg-amber-50 p-4">
            <h4 className="mb-2 font-semibold text-amber-900">Penting untuk Diketahui:</h4>
            <ul className="space-y-2 text-sm text-amber-800">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>Cekaku adalah alat bantu <strong>skrining awal</strong> berbasis gejala, bukan diagnosis medis.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>Hasil diagnosa bersifat <strong>estimasi</strong> dan tidak boleh digunakan sebagai pengganti konsultasi dokter.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>Jika Anda memiliki <strong>kondisi medis serius</strong>, segera hubungi tenaga kesehatan profesional.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>Data yang Anda masukkan <strong>tidak disimpan</strong> di server manapun.</span>
              </li>
            </ul>
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-all hover:bg-gray-50">
            <Checkbox
              checked={accepted}
              onCheckedChange={(checked) => setAccepted(checked as boolean)}
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-700">
                Saya memahami dan menerima disclaimer di atas
              </span>
              <p className="mt-1 text-xs text-gray-500">
                Centang untuk melanjutkan ke hasil diagnosa
              </p>
            </div>
          </label>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Batal
          </Button>
          <Button onClick={handleConfirm} disabled={!accepted}>
            Lanjutkan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}