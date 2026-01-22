// 
'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// 1. Define aquí los mismos correos que pusiste en la página de Admin
const EMAILS_ADMIN = ['panetteria.gerencia@gmail.com'];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Intentamos iniciar sesión
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setMessage('Error: ' + error.message);
      setLoading(false);
    } else {
      // --- LÓGICA DE REDIRECCIÓN INTELIGENTE ---
      const userEmail = data.user?.email;

      if (userEmail && EMAILS_ADMIN.includes(userEmail)) {
        // Es administrador: directo al panel de pedidos
        router.push('/admin');
      } else {
        // Es cliente normal: al inicio
        router.push('/');
      }
    }
  };

  const handleResetPassword = async () => {
  if (!email) {
    setMessage('Error: Por favor, ingresa tu email primero.');
    return;
  }
  
  setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setMessage('Error: ' + error.message);
    } else {
      setMessage('¡Listo! Revisa tu correo para restablecer tu contraseña.');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      <Navbar />
      <div className="flex items-center justify-center py-20 px-4">
        <div className="bg-white p-10 rounded-[40px] shadow-2xl shadow-gray-200/50 w-full max-w-md border border-gray-50">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-900 mb-2">Bienvenido</h2>
            <p className="text-gray-400 text-sm font-medium">
              Ingresa para gestionar tus pedidos
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#f7b200] focus:bg-white outline-none transition-all font-medium text-gray-700"
                placeholder="tu@email.com"
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
                placeholder="••••••••"
                required
              />
            </div>

            {message && (
              <div className={`p-4 rounded-xl text-xs font-bold text-center ${message.includes('Error') ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600'}`}>
                {message}
              </div>
            )}

            <div className="flex justify-end mt-1">
              <button 
                type="button"
                onClick={handleResetPassword}
                className="text-[10px] font-bold text-gray-400 hover:text-[#e30613] transition-colors uppercase tracking-widest"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#e30613] text-white py-4 rounded-full font-bold hover:scale-[1.03] active:scale-95 transition-all shadow-xl shadow-red-100 disabled:opacity-50 disabled:grayscale"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verificando...
                </div>
              ) : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-50">
            <div 
              className="w-full text-sm font-bold text-gray-400 hover:text-gray-600 transition text-center"
            >
              ¿No tienes cuenta? 
              <Link href="/signup" className="text-[#f7b200] underline">Regístrate gratis</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

