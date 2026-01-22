'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage('Error: Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    setMessage('');

    // Esta función de Supabase toma automáticamente el token que viene en la URL
    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      setMessage('Error: ' + error.message);
      setLoading(false);
    } else {
      setMessage('¡Contraseña actualizada con éxito! Redirigiendo...');
      // Esperamos 2 segundos y mandamos al login
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  };

  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      <Navbar />
      <div className="flex items-center justify-center py-20 px-4">
        <div className="bg-white p-10 rounded-[40px] shadow-2xl shadow-gray-200/50 w-full max-w-md border border-gray-50">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-900 mb-2">Nueva Contraseña</h2>
            <p className="text-gray-400 text-sm font-medium">
              Escribe tu nueva clave de acceso
            </p>
          </div>

          <form onSubmit={handleUpdatePassword} className="space-y-5">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nueva Contraseña</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#f7b200] focus:bg-white outline-none transition-all font-medium text-gray-700"
                placeholder="Mínimo 6 caracteres"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Confirmar Contraseña</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#f7b200] focus:bg-white outline-none transition-all font-medium text-gray-700"
                placeholder="Repite tu contraseña"
                required
              />
            </div>

            {message && (
              <div className={`p-4 rounded-xl text-xs font-bold text-center ${message.includes('Error') ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600'}`}>
                {message}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#f7b200] text-white py-4 rounded-full font-bold hover:scale-[1.03] active:scale-95 transition-all shadow-xl shadow-yellow-100 disabled:opacity-50"
            >
              {loading ? 'Actualizando...' : 'Cambiar Contraseña'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}