// import { supabase } from '@/lib/supabase';
// import Navbar from '@/components/Navbar';
// import BrandFilters from '@/components/BrandFilters';
// import ProductCard from '@/components/ProductCard';
// import Footer from '@/components/Footer';
// import ProductGrid from '@/components/ProductGrid';

// export default async function Home({
//   searchParams,
// }: {
//   searchParams: Promise<{ search?: string; brand?: string }>; // Agregamos brand aquí
// }) {
//   const params = await searchParams;
//   const query = params.search;
//   const brandId = params.brand; // Capturamos el ID de la marca de la URL

//   // 2. Consulta a la base de datos
//   let supabaseQuery = supabase
//     .from('productos')
//     .select('*, marcas(nombre)');

//   // Filtro por Buscador
//   if (query) {
//     supabaseQuery = supabaseQuery.ilike('nombre', `%${query}%`);
//   }

//   // NUEVO: Filtro por Marca (si existe en la URL)
//   if (brandId) {
//     supabaseQuery = supabaseQuery.eq('marca_id', brandId);
//   }

//   const { data: productos, error } = await supabaseQuery.order('id', { ascending: false });

//   if (error) console.error('Error:', error.message);

//   return (
//     <main className="min-h-screen bg-[#fdfcf8] selection:bg-yellow-200">
//       <Navbar />
      
//       {/* Hero Section */}
//       <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
//         <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
//           <span className="text-[#e30613] font-bold tracking-widest uppercase text-sm block">
//             Panetteria Sin GLuten
//           </span>
//           <h1 className="text-6xl font-extrabold text-gray-900 leading-[1.1]">
//             Calidad que se <br /> 
//             <span className="text-[#f7b200]">siente en cada bocado.</span>
//           </h1>
//           <p className="text-lg text-gray-600 max-w-md">
//             Elige tus productos favoritos de nuestras marcas seleccionadas y retira en tu sucursal más cercana. Frescura garantizada todos los días.
//           </p>
//         </div>
//         <div className="relative h-[450px] rounded-[48px] overflow-hidden bg-gray-200 shadow-2xl">
//            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072')] bg-cover bg-center" />
//         </div>
//       </section>

//       {/* Filtros dinámicos */}
//       <BrandFilters />

//       {/* Grilla de Productos */}
//       <section className="max-w-7xl mx-auto px-4 py-12 mb-20">
//         <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-6">
//           <h2 className="text-4xl font-black text-gray-900 tracking-tight">
//             {query ? `Buscando: "${query}"` : brandId ? 'Productos de la Marca' : 'Nuestros Productos'}
//           </h2>
//           {(query || brandId) && (
//             <a href="/" className="text-[#e30613] font-bold hover:underline">Ver todos</a>
//           )}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
//           {productos?.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>

//         {(!productos || productos.length === 0) && (
//           <div className="text-center py-24 bg-white rounded-[40px] border-2 border-dashed border-gray-200">
//             <p className="text-gray-400 text-xl font-medium">No encontramos productos.</p>
//           </div>
//         )}
//       </section>

//       <Footer />
//     </main>
//   );
// }
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import BrandFilters from '@/components/BrandFilters';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; brand?: string }>;
}) {
  const params = await searchParams;
  const query = params.search;
  const brandId = params.brand; 

  let supabaseQuery = supabase
    .from('productos')
    .select('*, marcas(nombre)');

  if (query) {
    supabaseQuery = supabaseQuery.ilike('nombre', `%${query}%`);
  }

  // Corregimos el filtro de marca para asegurar que no bloquee la lista si es nulo
  if (brandId && brandId !== "") {
    supabaseQuery = supabaseQuery.eq('marca_id', brandId);
  }

  const { data: productos, error } = await supabaseQuery.order('id', { ascending: false });

  if (error) console.error('Error Supabase:', error.message);

  return (
    <main className="min-h-screen bg-[#fdfcf8] selection:bg-yellow-200">
      <Navbar />
      
      {/* {Hero Section} */}
       <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
         <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
           <span className="text-[#e30613] font-bold tracking-widest uppercase text-sm block">
             Distribución Mayorista
           </span>
           <h1 className="text-6xl font-extrabold text-gray-900 leading-[1.1]">
             Las Mejores Marcas<br /> 
             <span className="text-[#f7b200]">Sin Gluten en un solo lugar.</span>
           </h1>
           <p className="text-lg text-gray-600 max-w-md">
             Elige tus productos favoritos de nuestras marcas seleccionadas y retira en tu sucursal más cercana. Frescura garantizada todos los días.
           </p>
         </div>
         <div className="relative h-[450px] rounded-[48px] overflow-hidden bg-gray-50 flex items-center justify-center p-8">
            <Image
              src="/images/LogoGluno.jpg" 
              alt="GluNo Logo"
              fill
              priority
              /* CAMBIO CLAVE: object-contain en lugar de object-cover */
              className="object-contain transition-transform duration-700 hover:scale-105" 
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
       </section>

      <BrandFilters />

      <section className="max-w-7xl mx-auto px-4 py-12 mb-20">
        <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-6">
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">
            {query ? `Buscando: "${query}"` : brandId ? 'Productos de la Marca' : 'Nuestros Productos'}
          </h2>
          {(query || brandId) && (
            <a href="/" className="text-[#e30613] font-bold hover:underline">Ver todos</a>
          )}
        </div>

        {/* Grilla con animación suave o directa */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {productos && productos.length > 0 ? (
            productos.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            // Mensaje si no hay productos
            <div className="col-span-full text-center py-24 bg-white rounded-[40px] border-2 border-dashed border-gray-200">
              <p className="text-gray-400 text-xl font-medium italic">
                {brandId ? "Aún no hay productos para esta marca" : "No encontramos productos disponibles"}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}