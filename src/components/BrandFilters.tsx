// 'use client';
// import { useEffect, useState } from 'react';
// import { supabase } from '@/lib/supabase';

// export default function BrandFilters({ onSelectBrand, activeBrandId }: any) {
//   const [marcas, setMarcas] = useState<any[]>([]);

//   useEffect(() => {
//     async function getMarcas() {
//       const { data } = await supabase.from('marcas').select('*').order('nombre');
//       if (data) setMarcas(data);
//     }
//     getMarcas();
//   }, []);

//   return (
//     <section className="max-w-7xl mx-auto px-4 py-8">
//       <div className="flex flex-wrap justify-center gap-8">
//         {/* Botón "Todas" */}
//         <button
//           onClick={() => onSelectBrand(null)}
//           className="flex flex-col items-center gap-3 group"
//         >
//           <div className={`w-20 h-20 rounded-full flex items-center justify-center text-xs font-black transition-all border-2
//             ${!activeBrandId ? 'bg-[#e30613] text-white border-transparent' : 'bg-white text-gray-400 border-gray-100'}`}>
//             ALL
//           </div>
//           <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Todas</span>
//         </button>

//         {marcas.map((marca) => (
//           <button
//             key={marca.id}
//             onClick={() => onSelectBrand(marca.id)}
//             className="flex flex-col items-center gap-3 group"
//           >
//             <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black transition-all border-2
//               ${activeBrandId === marca.id 
//                 ? 'bg-[#f7b200] text-white border-transparent scale-110 shadow-lg' 
//                 : 'bg-white text-gray-900 border-gray-100 group-hover:border-yellow-400'}`}>
//               {marca.nombre.charAt(0)}
//             </div>
//             <span className={`text-[10px] font-black uppercase tracking-widest ${activeBrandId === marca.id ? 'text-gray-900' : 'text-gray-400'}`}>
//               {marca.nombre}
//             </span>
//           </button>
//         ))}
//       </div>
//     </section>
//   );
// }
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, useSearchParams } from 'next/navigation';

export default function BrandFilters() {
  const [marcas, setMarcas] = useState<any[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Obtenemos el ID de la marca actual de la URL
  const activeBrandId = searchParams.get('brand');

  useEffect(() => {
    async function getMarcas() {
      const { data } = await supabase.from('marcas').select('*').order('nombre');
      if (data) setMarcas(data);
    }
    getMarcas();
  }, []);

  const handleSelect = (id: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id) {
      params.set('brand', id);
    } else {
      params.delete('brand');
    }
    // Empujamos la nueva URL. Next.js refrescará el Server Component automáticamente
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-wrap justify-center gap-8">
        <button
          onClick={() => handleSelect(null)}
          className="flex flex-col items-center gap-3 group"
        >
          <div className={`w-20 h-20 rounded-full flex items-center justify-center text-xs font-black transition-all border-2
            ${!activeBrandId ? 'bg-[#e30613] text-white border-transparent' : 'bg-white text-gray-400 border-gray-100'}`}>
            ALL
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Todas</span>
        </button>

        {marcas.map((marca) => (
          <button
            key={marca.id}
            onClick={() => handleSelect(marca.id.toString())}
            className="flex flex-col items-center gap-3 group"
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black transition-all border-2
              ${activeBrandId === marca.id.toString() 
                ? 'bg-[#f7b200] text-white border-transparent scale-110 shadow-lg' 
                : 'bg-white text-gray-900 border-gray-100 group-hover:border-yellow-400'}`}>
              {marca.nombre.charAt(0)}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${activeBrandId === marca.id.toString() ? 'text-gray-900' : 'text-gray-400'}`}>
              {marca.nombre}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}