import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Cekaku - Diagnosa Penyakit Berbasis Gejala",
  description: "Website diagnosa penyakit berbasis gejala untuk edukasi dan penanganan awal kesehatan masyarakat Indonesia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col antialiased`}>
        {children}
        <footer className="mt-auto bg-gray-100 py-6 text-center text-sm text-gray-600">
          <p>Dihasilkan oleh Cekaku - Bukan pengganti konsultasi dokter</p>
        </footer>
      </body>
    </html>
  );
}