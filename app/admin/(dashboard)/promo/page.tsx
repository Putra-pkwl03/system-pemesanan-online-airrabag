"use client";
import { useEffect, useState } from "react";
import { Tag, Package, Loader2 } from "lucide-react";
import Swal from "sweetalert2";

import PromoCard from "../../../components/admin/dashboard/promo/PromoCard"; 
import EditPromoModal from "@/app/components/admin/dashboard/promo/EditPromoModal";

export default function PromoPage() {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [selectedPromo, setSelectedPromo] = useState<any>(null);
const [products, setProducts] = useState<any[]>([]); 

  // Ambil data produk
  useEffect(() => {
    fetch('/api/admin/produk') 
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Gagal load produk:", err));
  }, []);

  const fetchPromos = async () => {
    try {
      const res = await fetch("/api/admin/promo");
      const data = await res.json();
      if (res.ok) setPromos(data);
    } catch (error) {
      console.error("Gagal load promo:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Hapus Promo?",
      text: "Data bundle ini akan dihapus permanen.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch("/api/admin/promo", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        if (res.ok) {
          setPromos(promos.filter((p: any) => p.id !== id));
          Swal.fire("Berhasil", "Promo dihapus", "success");
        }
      } catch (error) {
        Swal.fire("Error", "Gagal menghapus", "error");
      }
    }
  };

  const handleEditClick = (promo: any) => {
  setSelectedPromo(promo);
  setIsEditModalOpen(true);
};

  return (
    <section>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900">Promo</h1>
          <p className="text-gray-400 text-sm">Kelola paket bundle hemat untuk pelanggan.</p>
        </div>
        <div className="bg-[#DDCC9D] text-black px-5 py-2 rounded-full font-bold text-xs shadow-sm flex items-center gap-2">
          <Tag size={14} /> {promos.length} Promo Aktif
        </div>
      </div>

      {/* Grid Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Loader2 className="animate-spin mb-2 text-emerald-500" size={32} />
          <p className="text-sm font-medium">Memuat daftar promo...</p>
        </div>
      ) : promos.length === 0 ? (
        <div className="col-span-full text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
          <Package size={48} className="mx-auto text-gray-200 mb-3" />
          <p className="text-gray-400 text-sm italic">Belum ada promo aktif saat ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {promos.map((promo: any) => (
            <PromoCard 
              key={promo.id} 
              onEdit={() => handleEditClick(promo)}
              promo={promo} 
              allProducts={products}
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}

      <EditPromoModal 
  isOpen={isEditModalOpen} 
  onClose={() => setIsEditModalOpen(false)} 
  promo={selectedPromo}
  allProducts={products} 
  onSuccess={fetchPromos}
/>
    </section>
  );
}