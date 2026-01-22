import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Cambiamos a Inter para un look más profesional
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Panetteria | Calidad Artesanal",
  description: "Reserva el mejor pan artesanal online y retira en nuestras sucursales.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-[#fdfcf8] antialiased text-gray-900">
        {children}
      </body>
    </html>
  );
}