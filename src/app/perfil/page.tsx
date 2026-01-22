'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import { User, Package, LogOut, ShoppingBag, Mail, Trash2 } from 'lucide-react';

export default function PerfilPage() {
  const [usuario, setUsuario] = useState<any>(null);
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Función para cargar pedidos (la separamos para poder reutilizarla al borrar)
  async function cargarDatosPerfil() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUsuario(user);
      const { data: pedidosData } = await supabase
        .from('pedidos')
        .select('*')
        .eq('usuario_id', user.id)
        .order('created_at', { ascending: false });
      setPedidos(pedidosData || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    cargarDatosPerfil();
  }, []);

  // Función para eliminar el pedido
  const handleEliminarPedido = async (id: number) => {
    const confirmar = confirm("¿Estás seguro de que deseas cancelar este pedido?");
    if (!confirmar) return;

    const { error } = await supabase
      .from('pedidos')
      .delete()
      .eq('id', id);

    if (error) {
      alert("No se pudo eliminar el pedido: " + error.message);
    } else {
      // Refrescamos la lista localmente
      setPedidos(pedidos.filter(p => p.id !== id));
    }
  };

  const handleCerrarSesion = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfcf8]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#e30613]"></div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#fdfcf8] pb-20">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-6 pt-16">
        {/* Cabecera de Perfil */}
        <div className="bg-white rounded-[48px] p-12 shadow-sm border border-gray-50 flex flex-col items-center text-center mb-16">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-6 border border-gray-100">
            <User size={40} />
          </div>
          
          <div className="space-y-2 mb-8">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <Mail size={18} className="text-gray-400" />
              {usuario?.email}
            </h1>
            <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">Cliente Panetteria</p>
          </div>

          <button 
            onClick={handleCerrarSesion}
            className="flex items-center gap-2 text-gray-400 hover:text-red-500 font-bold transition-colors py-2 px-6 rounded-full hover:bg-red-50"
          >
            <LogOut size={18} /> Cerrar Sesión
          </button>
        </div>

        <div className="grid md:grid-cols-12 gap-12">
          {/* Estadísticas */}
          <div className="md:col-span-4 space-y-8">
            <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] px-2">Resumen</h2>
            <div className="bg-[#e30613] text-white p-10 rounded-[40px] shadow-2xl shadow-red-100">
              <Package size={32} className="mb-6 opacity-80" />
              <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Total de Pedidos</p>
              <h3 className="text-6xl font-black">{pedidos.length}</h3>
            </div>
          </div>

          {/* Listado de Pedidos con opción de eliminar */}
          <div className="md:col-span-8 space-y-8">
            <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] px-2">Historial Reciente</h2>
            
            <div className="space-y-4">
              {pedidos.length > 0 ? (
                pedidos.map((pedido) => (
                  <div key={pedido.id} className="bg-white p-8 rounded-[32px] border border-gray-50 flex items-center justify-between hover:shadow-md transition-all duration-300 group">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 font-bold text-sm">
                        #{pedido.id.toString().slice(-3)}
                      </div>
                      <div>
                        <p className="font-black text-gray-900 text-lg">Pedido de {new Date(pedido.created_at).toLocaleDateString()}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`w-2 h-2 rounded-full ${pedido.estado?.toLowerCase() === 'listo' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{pedido.estado || 'Pendiente'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-2xl font-black text-gray-900">${pedido.total}</p>
                      </div>
                      
                      {/* Botón de eliminar: solo visible si el estado no es "Listo" */}
                      {pedido.estado?.toLowerCase() !== 'listo' && (
                        <button 
                          onClick={() => handleEliminarPedido(pedido.id)}
                          className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                          title="Cancelar pedido"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white p-20 rounded-[40px] text-center border-2 border-dashed border-gray-100">
                  <p className="text-gray-400 font-medium">No tienes pedidos activos.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}