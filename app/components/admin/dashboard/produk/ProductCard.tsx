"use client";

import { Edit2, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";

interface ProductProps {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  image: string;
  onDelete: (id: number) => void;
  onEdit: () => void;
}

export default function ProductCard({
  id,
  name,
  category,
  price,
  stock,
  image,
  onDelete,
  onEdit, // 🔥 Tambahkan ini
}: ProductProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = confirm(`Hapus produk "${name}"?`);
    if (!confirmDelete) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/admin/produk?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Gagal hapus");
        return;
      }

      onDelete(id);
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan koneksi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition-all group flex flex-col h-full max-w-[200px]">
      {/* Header Card - Tombol Edit */}
      <div className="flex justify-between items-center mb-2">
        <button 
          type="button" 
          onClick={onEdit} // 🔥 Tambahkan ini
          className="flex items-center text-[10px] font-bold text-emerald-600 hover:text-emerald-700 uppercase transition-colors cursor-pointer"
          title="Edit produk"
        >
          <Edit2 size={12} className="mr-1" /> Edit
        </button>
      </div>

      {/* Product Image */}
      <div className="aspect-square w-full rounded-xl overflow-hidden bg-gray-50 mb-2">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
      </div>

      {/* Info Produk */}
      <div className="space-y-0.5 flex-grow">
        <h3 className="font-bold text-gray-800 text-xs truncate">{name}</h3>
        <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wider">{category}</p>
        
        <div className="flex justify-between items-center pt-1 pb-2">
          <p className="font-bold text-emerald-700 text-xs">{price}</p>
          <div className={`text-[9px] font-bold px-1.5 py-0.5 rounded text-white ${
            stock > 0 ? 'bg-emerald-500' : 'bg-red-500'
          }`}>
            {stock}
          </div>
        </div>
      </div>

      {/* Footer Card - Tombol Hapus */}
      <div className="mt-auto pt-1 flex justify-center border-t border-gray-50">
        <button
          type="button"
          disabled={loading}
          onClick={handleDelete}
          className="p-2 rounded-full text-red-500 bg-red-50 hover:bg-red-100 disabled:opacity-50 transition-colors cursor-pointer"
          title="Hapus Produk"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Trash2 size={16} />
          )}
        </button>
      </div>
    </div>
  );
}