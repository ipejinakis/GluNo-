'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      }
    });

    if (error) {
      setMessage('Error: ' + error.message);
    } else {
      setMessage('¡Cuenta creada! Revisa tu email para confirmar tu registro.');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      <Navbar />
      <div className="flex items-center justify-center py-20 px-4">
        <div className="bg-white p-10 rounded-[40px] shadow-2xl shadow-gray-200/50 w-full max-w-md border border-gray-50">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-900 mb-2">Crear Cuenta</h2>
            <p className="text-gray-400 text-sm font-medium">Únete a nuestra comunidad sin gluten</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-5">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#f7b200] focus:bg-white outline-none transition-all font-medium text-gray-700"
                placeholder="ejemplo@email.com"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Contraseña</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#f7b200] focus:bg-white outline-none transition-all font-medium text-gray-700"
                placeholder="Mínimo 6 caracteres"
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
              className="w-full bg-[#f7b200] text-white py-4 rounded-full font-bold hover:scale-[1.03] active:scale-95 transition-all shadow-xl shadow-yellow-100 disabled:opacity-50 disabled:grayscale"
            >
              {loading ? 'Creando cuenta...' : 'Registrarse ahora'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-50 text-center">
            <p className="text-sm font-bold text-gray-400">
              ¿Ya tienes cuenta? <Link href="/login" className="text-[#e30613] underline">Inicia sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}