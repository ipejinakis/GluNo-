'use client';
import { supabase } from '@/lib/supabase';
import { LogOut, LayoutDashboard, ClipboardList } from 'lucide-react';

export default function AdminNavbar() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <nav className="bg-gray-900 text-white shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Admin */}
        <div className="flex items-center gap-4">
          <div className="bg-[#e30613] p-2 rounded-lg">
            <ClipboardList size={20} className="text-white" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tighter">GluNo!</span>
            <span className="ml-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Gestión</span>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Sistema en Línea
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition text-sm font-bold"
          >
            <LogOut size={16} /> Salir
          </button>
        </div>
      </div>
    </nav>
  );
}