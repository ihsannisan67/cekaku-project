'use client';

import { useState } from 'react';
import { User } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import type { Gender } from '@/types';

interface PatientFormProps {
  age: number;
  setAge: (age: number) => void;
  gender: Gender;
  setGender: (gender: Gender) => void;
}

export function PatientForm({ age, setAge, gender, setGender }: PatientFormProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <User className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Data Diri</h2>
          <p className="text-sm text-gray-600">Langkah 1 dari 2</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="age" className="mb-2 block text-gray-700">
            Umur
          </Label>
          <Input
            id="age"
            type="number"
            min="0"
            max="120"
            value={age || ''}
            onChange={(e) => setAge(Number(e.target.value))}
            placeholder="Masukkan umur Anda"
            className="h-12"
          />
          <p className="mt-1 text-xs text-gray-500">Umur dalam angka (0-120 tahun)</p>
        </div>

        <div>
          <Label className="mb-3 block text-gray-700">Jenis Kelamin</Label>
          <div className="grid grid-cols-2 gap-4">
            <label
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 p-4 transition-all ${
                gender === 'male'
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={() => setGender('male')}
                className="sr-only"
              />
              <span className="font-medium">Laki-laki</span>
            </label>
            <label
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 p-4 transition-all ${
                gender === 'female'
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={() => setGender('female')}
                className="sr-only"
              />
              <span className="font-medium">Perempuan</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}