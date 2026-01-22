'use client';
import { Instagram, Facebook, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Contenedor Principal: Centrado de columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
          
          {/* Columna 1: Marca y Redes */}
          <div className="flex flex-col items-center space-y-6">
            <h2 className="text-2xl font-black text-[#e30613] tracking-tighter">
              PANETTERIA
            </h2>
            <p className="text-gray-400 max-w-xs leading-relaxed">
              Llevamos la tradición del buen pan a tu mesa. Calidad garantizada en cada producto.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/panetteria.sintacc/" 
                target="_blank" 
                className="p-3 bg-gray-50 rounded-full text-gray-400 hover:text-[#f7b200] hover:bg-yellow-50 transition-all"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="p-3 bg-gray-50 rounded-full text-gray-400 hover:text-[#f7b200] hover:bg-yellow-50 transition-all"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Columna 2: Locales */}
          <div className="flex flex-col items-center space-y-6">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em]">
              Nuestros Locales
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 text-gray-900 font-bold mb-1">
                  <MapPin size={16} className="text-[#f7b200]" />
                  <span>Centro</span>
                </div>
                <p className="text-gray-400 text-sm">Alvear 445, Salta, Argentina</p>
                <p className="text-gray-500 text-[10px] font-bold mt-1 uppercase tracking-wider">
                  Lun a Sáb: 08:00 - 20:00
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Línea de Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-50 text-center">
          <p className="text-gray-300 text-[10px] font-medium uppercase tracking-widest">
            © {new Date().getFullYear()} Panetteria. Todos los derechos reservados. Inspirado en la calidad artesanal.
          </p>
        </div>
      </div>
    </footer>
  );
}