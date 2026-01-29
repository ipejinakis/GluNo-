'use client';
import { Instagram, Facebook, MapPin, MessageCircle } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const telefono = "5493875240948"; 
  const mensaje = "Hola! Bienvenido a la web de GLUNO, ¿en qué te puedo ayudar?";
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

  return (
    <footer className="bg-white border-t border-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* CAMBIO: md:text-left para que en desktop todo se alinee a la izquierda */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
          
          {/* Columna 1: Marca y Redes */}
          {/* CAMBIO: md:items-start para alinear al inicio arriba */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center">
              <Image
                src="/images/Logo resumido.png"
                alt="GluNo Logo"
                width={80}  // REDUCIDO: De 120 a 80 para que sea más discreto
                height={30}
                className="object-contain"
              />
            </div>
            <p className="text-gray-400 max-w-xs leading-relaxed text-sm">
              Calidad garantizada en cada producto.
            </p>
            
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 bg-gray-50 rounded-full text-gray-400 hover:text-[#25D366] hover:bg-green-50 transition-all w-fit"
            >
              <MessageCircle size={20} />
            </a>
          </div>

          {/* Columna 2: Locales */}
          {/* CAMBIO: md:items-start para que el título y la info estén a la misma altura que el logo */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em]">
              Nuestros Locales
            </h3>
            <div className="space-y-4">
              {/* CAMBIO: md:items-start en el contenedor de la sucursal */}
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center gap-2 text-gray-900 font-bold mb-1">
                  <MapPin size={16} className="text-[#f7b200]" />
                  <span>Sucursal Centro</span>
                </div>
                <p className="text-gray-400 text-sm">Alvear 445, Salta, Argentina</p>
                <div className="mt-3 space-y-1">
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">
                    Lunes: 16:00 - 20:00
                  </p>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">
                    Mar a Sab: 09:00 - 13:00 | 16:00 - 20:00
                  </p>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider text-red-400">
                    Domingo: Cerrado
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Línea de Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-50 text-center">
          <p className="text-gray-300 text-[10px] font-medium uppercase tracking-widest">
            © {new Date().getFullYear()} GLUNO. Todos los derechos reservados. 
          </p>
        </div>
      </div>
    </footer>
  );
}