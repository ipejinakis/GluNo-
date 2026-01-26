// 'use client';
// import { useCartStore } from '@/lib/store';
// import Navbar from '@/components/Navbar';
// import BranchSelector from '@/components/BranchSelector';
// import { supabase } from '@/lib/supabase';
// import { useState } from 'react';
// import { CheckCircle, ArrowRight } from 'lucide-react';
// import Link from 'next/link';

// export default function CartPage() {
//   const { cart, clearCart } = useCartStore();
//   const [sucursal, setSucursal] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [orderDone, setOrderDone] = useState(false);

//   const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  

//   const handleConfirmOrder = async () => {
//     if (!sucursal) return alert('Por favor, selecciona una sucursal para retirar.');
    
//     setLoading(true);
//     const { data: { user } } = await supabase.auth.getUser();
    
//     if (!user) {
//       alert('Debes iniciar sesión para realizar un pedido.');
//       setLoading(false);
//       return;
//     }

//     // Inserción exacta según tu tabla de Supabase
//     const { error } = await supabase.from('pedidos').insert({
//       usuario_id: user.id,
//       sucursal_id: sucursal,
//       total: total,
//       items: cart, 
//       estado: 'Pendiente'
//     });

//     if (!error) {
//       setOrderDone(true);
//       clearCart();
//     } else {
//       alert('Error al procesar el pedido: ' + error.message);
//     }
//     setLoading(false);
//   };

//   if (orderDone) {
//     return (
//       <main className="min-h-screen bg-[#fdfcf8] flex flex-col items-center justify-center p-6 text-center">
//         <div className="bg-white p-12 rounded-[50px] shadow-xl border border-gray-50 flex flex-col items-center">
//           <div className="bg-green-100 p-6 rounded-full mb-6">
//             <CheckCircle size={60} className="text-green-500" />
//           </div>
//           <h1 className="text-4xl font-black text-gray-900 mb-4">¡Reserva Exitosa!</h1>
//           <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
//             Tu pedido ha sido registrado. Ya puedes ver el estado y los detalles en tu perfil.
//           </p>
//           <div className="flex flex-col gap-3 w-full">
//             <Link 
//               href="/pedidos" 
//               className="bg-[#e30613] text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition"
//             >
//               Ver Mis Pedidos <ArrowRight size={18} />
//             </Link>
//             <Link href="/" className="text-gray-400 font-bold py-2 hover:text-gray-600 transition">
//               Volver a la tienda
//             </Link>
//           </div>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-[#fdfcf8]">
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-12">
        
//         {/* Lista de Productos */}
//         <div className="lg:col-span-2 space-y-10">
//           <div className="flex items-center justify-between border-b border-gray-100 pb-6">
//             <h2 className="text-4xl font-black text-gray-900 tracking-tight">Tu Pedido</h2>
//             <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{cart.length} Productos</span>
//           </div>

//           {cart.length === 0 ? (
//             <div className="bg-white rounded-[40px] p-20 text-center border border-dashed border-gray-200">
//               <p className="text-gray-400 text-xl font-medium">Tu carrito está vacío... 🥖</p>
//               <Link href="/" className="text-[#e30613] font-bold mt-4 inline-block hover:underline">Ir a comprar</Link>
//             </div>
//           ) : (
//             <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-50 space-y-2">
//               {cart.map((item) => (
//                 <div key={item.id} className="flex justify-between items-center py-6 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition rounded-2xl px-4">
//                   <div>
//                     <h4 className="font-bold text-gray-900 text-lg">{item.nombre}</h4>
//                     <p className="text-sm text-gray-400 font-medium">Cantidad: {item.cantidad}</p>
//                   </div>
//                   <span className="font-black text-xl text-gray-900">${item.precio * item.cantidad}</span>
//                 </div>
//               ))}
//             </div>
//           )}
          
//           <div className="pt-4">
//              <BranchSelector onChange={(id: string) => setSucursal(id)} />
//           </div>
//         </div>

//         {/* Resumen de Compra Lateral */}
//         <div className="relative">
//           <div className="bg-white rounded-[48px] p-10 shadow-2xl shadow-gray-200/50 border border-gray-50 h-fit lg:sticky lg:top-28">
//             <h3 className="text-2xl font-black mb-8 text-gray-900">Resumen</h3>
//             <div className="space-y-6 mb-10">
//               <div className="flex justify-between text-gray-400 font-medium">
//                 <span>Subtotal</span>
//                 <span>${total}</span>
//               </div>
//               <div className="flex justify-between text-gray-400 font-medium pb-6 border-b border-gray-50">
//                 <span>Envío / Retiro</span>
//                 <span className="text-green-500 font-bold uppercase text-xs tracking-widest">Gratis</span>
//               </div>
//               <div className="flex justify-between text-3xl font-black text-gray-900 pt-2">
//                 <span>Total</span>
//                 <span>${total}</span>
//               </div>
//             </div>

//             <div className="bg-yellow-50 p-4 rounded-3xl mb-8 flex items-start gap-3 border border-yellow-100">
//               <div className="bg-yellow-400 text-white p-1 rounded-full text-[10px] font-black">!</div>
//               <p className="text-[11px] text-yellow-800 leading-snug">
//                 <strong>Pago presencial:</strong> Reservas ahora y pagas al retirar en la sucursal elegida.
//               </p>
//             </div>

//             <button 
//               onClick={handleConfirmOrder}
//               disabled={loading || cart.length === 0}
//               className="w-full bg-[#e30613] text-white py-5 rounded-full font-bold hover:scale-[1.03] active:scale-95 transition-all shadow-xl shadow-red-200 disabled:opacity-50 disabled:grayscale"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-2">
//                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                    Procesando...
//                 </span>
//               ) : 'Confirmar Reserva'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

'use client';
import { useCartStore } from '@/lib/store';
import Navbar from '@/components/Navbar';
import BranchSelector from '@/components/BranchSelector';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { cart, clearCart } = useCartStore();
  const [sucursal, setSucursal] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderDone, setOrderDone] = useState(false);

  // 1. LÓGICA DE PRECIO POR BULTO PARA EL TOTAL
  const total = cart.reduce((acc, item) => acc + (item.precioBulto * item.cantidad), 0);

  // Formateador para los totales del resumen
  const formatFullPrice = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount).split(',');
  };

  const [totalEntero, totalDecimal] = formatFullPrice(total);

  const handleConfirmOrder = async () => {
    if (!sucursal) return alert('Por favor, selecciona una sucursal para retirar.');
    
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      alert('Debes iniciar sesión para realizar un pedido.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.from('pedidos').insert({
      usuario_id: user.id,
      sucursal_id: sucursal,
      total: total,
      items: cart, 
      estado: 'Pendiente'
    });

    if (!error) {
      setOrderDone(true);
      clearCart();
    } else {
      alert('Error al procesar el pedido: ' + error.message);
    }
    setLoading(false);
  };

  if (orderDone) {
    return (
      <main className="min-h-screen bg-[#fdfcf8] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-12 rounded-[50px] shadow-xl border border-gray-50 flex flex-col items-center">
          <div className="bg-green-100 p-6 rounded-full mb-6">
            <CheckCircle size={60} className="text-green-500" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">¡Reserva Exitosa!</h1>
          <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
            Tu pedido ha sido registrado. Ya puedes ver el estado y los detalles en tu perfil.
          </p>
          <div className="flex flex-col gap-3 w-full">
            <Link 
              href="/pedidos" 
              className="bg-[#e30613] text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition"
            >
              Ver Mis Pedidos <ArrowRight size={18} />
            </Link>
            <Link href="/" className="text-gray-400 font-bold py-2 hover:text-gray-600 transition">
              Volver a la tienda
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-12">
        
        {/* Lista de Productos */}
        <div className="lg:col-span-2 space-y-10">
          <div className="flex items-center justify-between border-b border-gray-100 pb-6">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Tu Pedido</h2>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{cart.length} Productos</span>
          </div>

          {cart.length === 0 ? (
            <div className="bg-white rounded-[40px] p-20 text-center border border-dashed border-gray-200">
              <p className="text-gray-400 text-xl font-medium">Tu carrito está vacío... 🥖</p>
              <Link href="/" className="text-[#e30613] font-bold mt-4 inline-block hover:underline">Ir a comprar</Link>
            </div>
          ) : (
            <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-50 space-y-2">
              {cart.map((item) => {
                // 2. FORMATEO INDIVIDUAL POR ITEM
                const itemTotal = item.precioBulto * item.cantidad;
                const [itemEntero, itemDecimal] = formatFullPrice(itemTotal);

                return (
                  <div key={item.id} className="flex justify-between items-center py-6 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition rounded-2xl px-4">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{item.nombre}</h4>
                      <p className="text-sm text-gray-400 font-medium">
                        {item.cantidad} {item.cantidad === 1 ? 'Bulto' : 'Bultos'} ({item.unidadXbulto || 1} un. c/u)
                      </p>
                    </div>
                    {/* 3. PRECIO CON CENTAVOS VOLADORES */}
                    <div className="flex items-start font-black text-xl text-gray-900">
                      <span>$ {itemEntero}</span>
                      <span className="text-xs opacity-60 ml-0.5 mt-1">,{itemDecimal}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          <div className="pt-4">
             <BranchSelector onChange={(id: string) => setSucursal(id)} />
          </div>
        </div>

        {/* Resumen de Compra Lateral */}
        <div className="relative">
          <div className="bg-white rounded-[48px] p-10 shadow-2xl shadow-gray-200/50 border border-gray-50 h-fit lg:sticky lg:top-28">
            <h3 className="text-2xl font-black mb-8 text-gray-900">Resumen</h3>
            <div className="space-y-6 mb-10">
              <div className="flex justify-between text-gray-400 font-medium">
                <span>Subtotal</span>
                <span>$ {totalEntero},{totalDecimal}</span>
              </div>
              <div className="flex justify-between text-gray-400 font-medium pb-6 border-b border-gray-50">
                <span>Envío / Retiro</span>
                <span className="text-green-500 font-bold uppercase text-xs tracking-widest">Gratis</span>
              </div>
              <div className="flex justify-between text-3xl font-black text-gray-900 pt-2">
                <span>Total</span>
                <div className="flex items-start">
                  <span>$ {totalEntero}</span>
                  <span className="text-sm mt-1 ml-0.5 opacity-60">,{totalDecimal}</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-3xl mb-8 flex items-start gap-3 border border-yellow-100">
              <div className="bg-yellow-400 text-white p-1 rounded-full text-[10px] font-black w-4 h-4 flex items-center justify-center">!</div>
              <p className="text-[11px] text-yellow-800 leading-snug">
                <strong>Pago presencial:</strong> Reservas ahora y pagas al retirar en la sucursal elegida.
              </p>
            </div>

            <button 
              onClick={handleConfirmOrder}
              disabled={loading || cart.length === 0}
              className="w-full bg-[#e30613] text-white py-5 rounded-full font-bold hover:scale-[1.03] active:scale-95 transition-all shadow-xl shadow-red-200 disabled:opacity-50 disabled:grayscale"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                   Procesando...
                </span>
              ) : 'Confirmar Reserva'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}