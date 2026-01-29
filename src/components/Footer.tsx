'use client';
import { Instagram, Facebook, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  const telefono = "5493875240948"; 
  // Tip: encodeURIComponent asegura que los signos de pregunta y exclamación no rompan el enlace
  const mensaje = "Hola! Bienvenido a la web de GLUNO, ¿en qué te puedo ayudar?";
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

  return (
    <footer className="bg-white border-t border-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
          
          {/* Columna 1: Marca y Redes */}
          <div className="flex flex-col items-center space-y-6">
            <h2 className="text-2xl font-black text-[#e30613] tracking-tighter">
              GLUNO
            </h2>
            <p className="text-gray-400 max-w-xs leading-relaxed">
              Calidad garantizada en cada producto.
            </p>
            
            {/* Botón de WhatsApp con icono */}
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-gray-50 rounded-full text-gray-400 hover:text-[#25D366] hover:bg-green-50 transition-all"
            >
              {/* Usamos el ícono MessageCircle que es el estándar de WhatsApp en Lucide */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>
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