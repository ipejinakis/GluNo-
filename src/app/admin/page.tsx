'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation'; // Para redireccionar
import AdminNavbar from '@/components/AdminNavBar';
import { CheckCircle, Clock, RefreshCw, Lock } from 'lucide-react';

// 1. AGREGA AQUÍ LOS EMAILS AUTORIZADOS
const EMAILS_ADMIN = ['panetteria.gerencia@gmail.com'];

export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [autorizado, setAutorizado] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function verificarAccesoYDatos() {
      setLoading(true);
      
      // Verificamos quién está logueado
      const { data: { user } } = await supabase.auth.getUser();

      // Si no hay usuario o su email no está en la lista blanca
      if (!user || !EMAILS_ADMIN.includes(user.email || '')) {
        console.error("Acceso no autorizado");
        router.push('/'); // Lo sacamos de la página
        return;
      }

      // Si llegó aquí, es administrador
      setAutorizado(true);
      
      const { data } = await supabase
        .from('pedidos')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) setPedidos(data);
      setLoading(false);
    }

    verificarAccesoYDatos();
  }, [router]);

  const marcarComoListo = async (id: number) => {
    const { error } = await supabase
      .from('pedidos')
      .update({ estado: 'Listo' })
      .eq('id', id);

    if (!error) {
      setPedidos(pedidos.map(p => p.id === id ? { ...p, estado: 'Listo' } : p));
    }
  };

  // Mientras verifica el acceso, mostramos pantalla de carga
  if (loading && !autorizado) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfcf8]">
        <Lock size={40} className="text-gray-200 mb-4 animate-pulse" />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Verificando Credenciales...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fdfcf8] pb-20">
      <AdminNavbar />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
               <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Modo Admin</span>
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Panel de Gestión</h1>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="p-3 bg-white rounded-2xl border border-gray-100 shadow-sm hover:bg-gray-50 transition"
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        <div className="grid gap-6">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6 w-full">
                <div className={`p-4 rounded-2xl ${pedido.estado === 'Listo' ? 'bg-green-50 text-green-500' : 'bg-yellow-50 text-yellow-500'}`}>
                  {pedido.estado === 'Listo' ? <CheckCircle size={30} /> : <Clock size={30} />}
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-tighter">#{pedido.id} • {new Date(pedido.created_at).toLocaleDateString()}</p>
                  <h3 className="text-lg font-black text-gray-900">Sucursal: {pedido.sucursal_id}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {pedido.items?.map((item: any, idx: number) => (
                      <span key={idx} className="bg-gray-50 text-gray-600 text-[11px] px-3 py-1 rounded-full border border-gray-100 font-medium">
                        {item.cantidad}x {item.nombre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                <div className="text-right min-w-[100px]">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total</p>
                  <p className="text-2xl font-black text-gray-900">${pedido.total}</p>
                </div>

                {pedido.estado !== 'Listo' ? (
                  <button 
                    onClick={() => marcarComoListo(pedido.id)}
                    className="bg-[#e30613] text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition shadow-lg shadow-red-100"
                  >
                    Marcar Listo
                  </button>
                ) : (
                  <div className="bg-gray-50 text-gray-400 px-8 py-4 rounded-2xl font-bold border border-gray-100 italic">
                    Completado
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}