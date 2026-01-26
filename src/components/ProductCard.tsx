'use client';
import { useCartStore } from '@/lib/store';
import { Plus, Minus, Trash2 } from 'lucide-react';

export default function ProductCard({ product }: any) {
  const addToCart = useCartStore((state: any) => state.addToCart);
  const removeFromCart = useCartStore((state: any) => state.removeFromCart);
  
  // 1. Extraemos el array del carrito (asegúrate que en tu store se llame 'cart')
  const cart = useCartStore((state: any) => state.cart) || []; 

  // 2. Buscamos este producto en el carrito para obtener su cantidad
  const cartItem = cart.find((item: any) => item.id === product.id);
  const quantity = cartItem ? cartItem.cantidad : 0;

  const priceParts = new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(product.precio).split(',');

  const entero = priceParts[0]; // Ej: "4,000"
  const decimal = priceParts[1]; // Ej: "00"


  return (
    <div className="bg-white rounded-[32px] p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col h-full">
      {/* Contenedor de Imagen */}
      <div className="relative h-48 w-full mb-5 rounded-[24px] overflow-hidden bg-[#f9f9f9] flex items-center justify-center p-4">
        <img
          src={product.image_url || product.nombre}
          alt={product.nombre}
          className="object-contain max-h-full max-w-full group-hover:scale-110 transition-transform duration-500"
        />
        
        <div className="absolute top-3 left-3 z-20 w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:scale-110">
          <img 
            src="/images/logoSinGluten.jpeg"  
            alt="Certificación"
            className="w-full h-full object-contain drop-shadow-sm"
          />
        </div>
        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter text-gray-500">
          {product.marcas?.nombre || 'Artesanal'}
        </div>
      </div>
      

      {/* Info del Producto */}
      <div className="flex-grow">
        <h4 className="font-bold text-gray-900 text-lg leading-tight mb-2">
          {product.nombre}
        </h4>
        <div className="flex gap-2 mb-3"> {/* Contenedor para manejar el espacio */}
          <span className="inline-block bg-gray-100 text-gray-900 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest border border-gray-200">
            {product.gramaje || '---'}
          </span>
          
          <span className="inline-block bg-gray-100 text-gray-900 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest border border-gray-200">
            {product.unidadXbulto ? `${product.unidadXbulto} Unidades` : '---'}
          </span>
        </div>
        <p className="text-gray-400 text-xs line-clamp-2 mb-4">
          {product.descripcion || '----'}
        </p>
      </div>

      {/* Precio y Botón */}
      {/* Precio y Botón Inteligente */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
        {/* <div className="flex flex-col">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Precio</span>
          <span className="text-2xl font-black text-gray-900">${product.precio}</span>
        </div> */}
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Precio x unidad</span>
          <div className="flex items-start text-gray-900 font-black">
            {/* Símbolo y Enteros */}
            <span className="text-2xl leading-none">$ {entero}</span>
            
            {/* Centavos pequeños arriba */}
            <span className="text-xs leading-none mt-0.5 ml-0.5 opacity-70">
              {decimal}
            </span>
          </div>
        </div>

        <div className="flex items-center">
          {quantity === 0 ? (
            // CASO A: El producto NO está en el carrito (Mostramos solo el +)
            <button
              onClick={() => addToCart(product)}
              className="bg-[#f7b200] hover:bg-[#e30613] text-white p-3 rounded-2xl transition-all active:scale-90 shadow-lg shadow-yellow-100"
            >
              <Plus size={20} strokeWidth={3} />
            </button>
          ) : (
            // CASO B: El producto YA ESTÁ (Mostramos selector de cantidad)
            <div className="flex items-center bg-gray-100 rounded-2xl p-1 gap-2 border border-gray-200 shadow-inner">
              <button
                onClick={() => removeFromCart(product)}
                className="bg-white text-gray-900 p-2 rounded-xl hover:text-[#e30613] transition-colors shadow-sm"
              >
                {quantity === 1 ? <Trash2 size={16} /> : <Minus size={16} strokeWidth={3} />}
              </button>
              
              <span className="w-8 text-center font-black text-gray-900 text-sm">
                {quantity}
              </span>

              <button
                onClick={() => addToCart(product)}
                className="bg-[#f7b200] text-white p-2 rounded-xl hover:bg-[#e30613] transition-colors shadow-sm"
              >
                <Plus size={16} strokeWidth={3} />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
