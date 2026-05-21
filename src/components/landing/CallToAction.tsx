'use client';

import Link from 'next/link';
import { ArrowRight, Stethoscope } from 'lucide-react';

export function CallToAction() {
  return (
    <section className="bg-blue-600 py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-white mb-6">
          <Stethoscope className="h-8 w-8" />
        </div>
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          Siapkan Kesehatan Anda Sekarang
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
          Jangan tunggu sampai kondisi memburuk. Gunakan Cekaku untuk mendapatkan
          gambaran awal tentang kondisi kesehatan Anda.
        </p>
        <Link href="/diagnosa">
          <button className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-blue-600 transition-all hover:bg-gray-100 hover:shadow-xl">
            Mulai Diagnosa Sekarang
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </Link>
      </div>
    </section>
  );
}