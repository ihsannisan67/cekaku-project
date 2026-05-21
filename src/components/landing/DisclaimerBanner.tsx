'use client';

import { AlertTriangle } from 'lucide-react';

export function DisclaimerBanner() {
  return (
    <section className="bg-amber-50 py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-start gap-4 rounded-xl bg-amber-100 p-4 md:p-6">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-amber-900">
              Peringatan Penting
            </h3>
            <p className="text-sm text-amber-800">
              Cekaku adalah alat bantu skrining awal berbasis gejala dan{' '}
              <strong>BUKAN pengganti konsultasi dokter</strong>. Hasil diagnosa bersifat
              estimasi dan tidak boleh digunakan sebagai diagnosis medis. Jika Anda memiliki
              masalah kesehatan, selalu konsultasikan dengan tenaga medis profesional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}