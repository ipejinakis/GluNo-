'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import { Package, ChevronDown, Trash2, ShoppingBag, MapPin } from 'lucide-react';

interface Pedido {
  id: number;
  created_at: string;
  total: number;
  estado: string;
  sucursal_id: string;
  items: any[]; // Array de productos guardados en JSONB
}

export default function MisPedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [abierto, setAbierto] = useState<number | null>(null); // Controla qué resumen está desplegado

  async function fetchPedidos() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from('pedidos')
        .select('*')
        .eq('usuario_id', user.id) 
        .order('created_at', { ascending: false });

      if (!error) setPedidos(data || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchPedidos();
  }, []);

  const handleEliminarPedido = async (id: number) => {
    const confirmar = confirm("¿Estás seguro de que deseas cancelar este pedido?");
    if (!confirmar) return;

    const { error } = await supabase.from('pedidos').delete().eq('id', id);

    if (error) {
      alert("Error al eliminar: " + error.message);
    } else {
      setPedidos(pedidos.filter(p => p.id !== id));
    }
  };

  const getStatusStyle = (estado: string) => {
    const e = estado?.toLowerCase() || 'pendiente';
    if (e === 'listo') return 'bg-green-100 text-green-700 border-green-200';
    if (e === 'pendiente') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <main className="min-h-screen bg-[#fdfcf8] pb-20">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-black text-gray-900 mb-10 tracking-tight">Mis Pedidos</h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e30613]"></div>
          </div>
        ) : pedidos.length > 0 ? (
          <div className="space-y-6">
            {pedidos.map((pedido) => (
              <div key={pedido.id} className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
                
                {/* Cabecera del Pedido */}
                <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <div className="bg-gray-50 p-4 rounded-[20px] text-gray-400">
                      <Package size={28} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Reserva #{pedido.id}</p>
                      <p className="font-bold text-gray-900 text-lg">
                        {new Date(pedido.created_at).toLocaleDateString()}
                      </p>
                      <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                        <MapPin size={12} /> {pedido.sucursal_id}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6">
                    <div className="text-right">
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Total</p>
                      <p className="text-2xl font-black text-gray-900">${pedido.total}</p>
                    </div>

                    <div className={`px-4 py-1.5 rounded-full border font-black text-[10px] uppercase tracking-wider ${getStatusStyle(pedido.estado)}`}>
                      {pedido.estado || 'Pendiente'}
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Botón Resumen */}
                      <button 
                        onClick={() => setAbierto(abierto === pedido.id ? null : pedido.id)}
                        className={`p-2 rounded-xl transition-colors ${abierto === pedido.id ? 'bg-gray-100 text-gray-900' : 'text-gray-300 hover:text-gray-600'}`}
                      >
                        <ChevronDown className={`transition-transform duration-300 ${abierto === pedido.id ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Botón Eliminar (Solo si no está listo) */}
                      {pedido.estado?.toLowerCase() !== 'listo' && (
                        <button 
                          onClick={() => handleEliminarPedido(pedido.id)}
                          className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Resumen Desplegable (Items) */}
                {abierto === pedido.id && (
                  <div className="bg-gray-50/50 border-t border-gray-50 p-8 animate-in slide-in-from-top-2 duration-300">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <ShoppingBag size={14} /> Detalle del Pedido
                    </h4>
                    <div className="space-y-3">
                      {pedido.items?.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 bg-yellow-100 text-yellow-700 rounded-lg flex items-center justify-center font-bold text-xs">
                              {item.cantidad}x
                            </span>
                            <span className="font-bold text-gray-700">{item.nombre}</span>
                          </div>
                          <span className="font-black text-gray-900">${item.precio * item.cantidad}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[40px] border-2 border-dashed border-gray-100">
            <div className="text-5xl mb-4">🥖</div>
            <p className="text-gray-400 text-xl font-medium">No hay pedidos registrados.</p>
            <a href="/" className="text-[#e30613] font-bold mt-4 inline-block hover:underline">Ir a comprar</a>
          </div>
        )}
      </div>
    </main>
  );
}