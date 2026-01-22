'use client';
import { useState } from 'react';
import { MapPin, Clock } from 'lucide-react';

// Esto le dice a TypeScript que el componente acepta una función onChange
interface BranchSelectorProps {
  onChange: (id: string) => void;
}

const sucursales = [
  { id: 'centro', nombre: 'Sucursal Central', direccion: 'M. T. de Alvear 445', horario: '08:00 - 20:00' },
];

export default function BranchSelector({ onChange }: BranchSelectorProps) {
  const [selected, setSelected] = useState('');

  const handleSelect = (id: string) => {
    setSelected(id);
    onChange(id); // Envía la elección al carrito
  };

  return (
    <div className="space-y-4 ">
      <h3 className="text-xl font-bold text-gray-900 mb-4">¿Dónde retiras tu pedido?</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sucursales.map((local) => (
          <div 
            key={local.id}
            onClick={() => handleSelect(local.id)}
            className={`cursor-pointer p-6 rounded-[24px] border-2 transition-all ${
              selected === local.id 
                ? 'border-[#f7b200] bg-yellow-50 ring-4 ring-yellow-100' 
                : 'border-gray-100 bg-white hover:border-gray-200'
            }`}
          >
            <h4 className="font-black text-lg text-gray-900">{local.nombre}</h4>
            <p className="text-gray-500 text-sm">{local.direccion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}