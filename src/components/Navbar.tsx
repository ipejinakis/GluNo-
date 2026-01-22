'use client';
import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { ShoppingBag, User, LogOut, Package, ChevronDown, UserCircle } from 'lucide-react';
import { useCartStore } from '@/lib/store';

export default function Navbar() {
  const [usuario, setUsuario] = useState<any>(null);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const cart = useCartStore((state) => state.cart);
  const cartCount = cart.reduce((acc, item) => acc + item.cantidad, 0);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Escuchar sesión
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUsuario(session?.user || null);
    });

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUsuario(user);
    });

    // Cerrar menú al hacer clic fuera
    const handleClickAfuera = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener('mousedown', handleClickAfuera);
    return () => {
      subscription.unsubscribe();
      document.removeEventListener('mousedown', handleClickAfuera);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-black tracking-tighter text-[#e30613] group-hover:scale-105 transition-transform">
            GluNo!
          </span>
        </Link>

        {/* Acciones Derecha */}
        <div className="flex items-center gap-4">
          {usuario ? (
            /* Dropdown de Usuario */
            <div className="relative" ref={menuRef}>
              <button 
                onClick={() => setMenuAbierto(!menuAbierto)}
                className="flex items-center gap-2 bg-gray-50 pl-2 pr-4 py-2 rounded-full border border-gray-100 hover:bg-white transition-all shadow-sm active:scale-95"
              >
                <div className="w-8 h-8 bg-[#f7b200] rounded-full flex items-center justify-center text-white shadow-inner">
                  <User size={16} strokeWidth={3} />
                </div>
                <span className="text-sm font-bold text-gray-700 hidden sm:block">
                  {usuario.user_metadata?.full_name?.split(' ')[0] || 'Mi Cuenta'}
                </span>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${menuAbierto ? 'rotate-180' : ''}`} />
              </button>

              {/* Menú Flotante */}
              {menuAbierto && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-[24px] shadow-2xl border border-gray-50 py-3 animate-in fade-in zoom-in duration-200 origin-top-right">
                  <div className="px-4 py-2 border-b border-gray-50 mb-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Bienvenido</p>
                    <p className="text-sm font-bold text-gray-900 truncate">{usuario.email}</p>
                  </div>
                  
                  <Link 
                    href="/perfil" 
                    onClick={() => setMenuAbierto(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-[#e30613] transition"
                  >
                    <UserCircle size={18} /> Mi Perfil
                  </Link>

                  <Link 
                    href="/pedidos" 
                    onClick={() => setMenuAbierto(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-[#e30613] transition"
                  >
                    <Package size={18} /> Mis Pedidos
                  </Link>

                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition border-t border-gray-50 mt-2"
                  >
                    <LogOut size={18} /> Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              href="/login" 
              className="flex items-center gap-2 bg-[#e30613] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-red-200 transition"
            >
              Ingresar
            </Link>
          )}

          {/* Separador */}
          <div className="h-8 w-[1px] bg-gray-100 mx-2" />

          {/* Carrito */}
          <Link href="/carrito" className="relative group">
            <div className="p-3 bg-gray-50 rounded-full group-hover:bg-yellow-100 transition-colors">
              <ShoppingBag size={22} className="text-gray-900 group-hover:text-[#f7b200]" />
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#e30613] text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full ring-4 ring-white animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}