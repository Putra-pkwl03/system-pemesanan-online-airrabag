"use client";
import { X, Tag, FileText, Save, Loader2, ArrowRightLeft, Image as ImageIcon } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface EditPromoModalProps {
  isOpen: boolean;
  onClose: () => void;
  promo: any; 
  onSuccess: () => void;
  allProducts: any[];
}

export default function EditPromoModal({ isOpen, onClose, promo, onSuccess, allProducts }: EditPromoModalProps) {
  const router = useRouter();
  const [mainProductId, setMainProductId] = useState("");
  const [secondProductId, setSecondProductId] = useState("");
  const [promoPrice, setPromoPrice] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Inisialisasi data saat modal dibuka
  useEffect(() => {
    if (promo && isOpen) {
      setMainProductId(promo.mainProduct?.id?.toString() || "");
      setSecondProductId(promo.secondProduct?.id?.toString() || "");
      setPromoPrice(promo.promoPrice?.toString() || "");
      setDescription(promo.description || "");
    }
  }, [promo, isOpen]);

  // Mencari object produk secara detail berdasarkan ID yang dipilih di dropdown
  const mainProduct = useMemo(() => {
    return allProducts.find(p => p.id.toString() === mainProductId);
  }, [mainProductId, allProducts]);

  const secondProduct = useMemo(() => {
    return allProducts.find(p => p.id.toString() === secondProductId);
  }, [secondProductId, allProducts]);

  const handleUpdate = async () => {
    if (!mainProductId || !secondProductId || !promoPrice) {
      Swal.fire({ title: "Data Tidak Lengkap", text: "Pastikan kedua produk dipilih.", icon: "warning" });
      return;
    }

    if (mainProductId === secondProductId) {
      Swal.fire({ title: "Produk Sama", text: "Pilih dua produk yang berbeda untuk bundle.", icon: "error" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/admin/promo", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: promo.id,
          mainProductId: Number(mainProductId),
          secondProductId: Number(secondProductId),
          promoPrice: parseFloat(promoPrice),
          description: description,
        }),
      });

      if (!response.ok) throw new Error("Gagal memperbarui promo");

      Swal.fire({ title: "Berhasil!", text: "Promo bundle telah diperbarui.", icon: "success", confirmButtonColor: "#063130" })
        .then(() => {
          onClose();
          onSuccess();
          router.refresh();
        });
    } catch (error: any) {
      Swal.fire({ title: "Gagal!", text: error.message, icon: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !promo) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div className="bg-[#f8f9fa] rounded-[40px] w-full max-w-2xl overflow-hidden shadow-2xl border border-white/20">
        
        {/* Header */}
        <div className="bg-[#063130] p-8 text-white relative">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-[#DDCC9D] p-2 rounded-xl text-[#063130]">
                <ArrowRightLeft size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Edit Paket Bundle</h2>
                <p className="text-emerald-200/60 text-xs">Pilih kombinasi produk dari stok yang tersedia</p>
              </div>
            </div>
            <button onClick={onClose} className="bg-white/10 hover:bg-red-500/20 p-2 rounded-full transition-all text-white">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Product Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Slot Produk 1 */}
            <div className="bg-white p-4 rounded-[24px] border border-gray-100 shadow-sm space-y-3">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex justify-between">
                <span>Produk Utama</span>
                {mainProduct && <span className="text-emerald-600">Rp {mainProduct.price.toLocaleString()}</span>}
              </label>
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-50 flex items-center justify-center">
                {mainProduct?.image ? (
                  <img src={mainProduct.image} className="w-full h-full object-cover" alt="P1" />
                ) : (
                  <ImageIcon className="text-gray-300" size={40} />
                )}
              </div>
              <select 
                value={mainProductId}
                onChange={(e) => setMainProductId(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-[11px] font-bold outline-none focus:ring-2 focus:ring-[#063130]/10 transition-all"
              >
                <option value="">Pilih Produk...</option>
                {allProducts.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (Rp {p.price.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            {/* Slot Produk 2 */}
            <div className="bg-white p-4 rounded-[24px] border border-gray-100 shadow-sm space-y-3">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex justify-between">
                <span>Pasangan Promo</span>
                {secondProduct && <span className="text-emerald-600">Rp {secondProduct.price.toLocaleString()}</span>}
              </label>
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-50 flex items-center justify-center">
                {secondProduct?.image ? (
                  <img src={secondProduct.image} className="w-full h-full object-cover" alt="P2" />
                ) : (
                  <ImageIcon className="text-gray-300" size={40} />
                )}
              </div>
              <select 
                value={secondProductId}
                onChange={(e) => setSecondProductId(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-[11px] font-bold outline-none focus:ring-2 focus:ring-[#063130]/10 transition-all"
              >
                <option value="">Pilih Produk...</option>
                {allProducts.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (Rp {p.price.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Pricing & Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-700 uppercase flex items-center gap-2 tracking-wider ml-1">
                <Tag size={12} className="text-emerald-600" /> Harga Bundle Baru
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">Rp</div>
                <input 
                  type="number"
                  value={promoPrice}
                  onChange={(e) => setPromoPrice(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-sm font-bold focus:border-[#063130] focus:ring-4 focus:ring-emerald-50 outline-none transition-all"
                  placeholder="Masukkan harga paket..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-700 uppercase flex items-center gap-2 tracking-wider ml-1">
                <FileText size={12} className="text-emerald-600" /> Deskripsi Singkat
              </label>
              <textarea 
                rows={1}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl text-sm focus:border-[#063130] focus:ring-4 focus:ring-emerald-50 outline-none transition-all resize-none shadow-inner"
                placeholder="Misal: Beli 2 Lebih Murah!"
              />
            </div>
          </div>

          {/* Action Button */}
          <button 
            onClick={handleUpdate}
            disabled={loading || !mainProductId || !secondProductId}
            className="w-full py-5 bg-[#063130] text-[#DDCC9D] rounded-2xl font-black text-xs shadow-xl shadow-emerald-900/20 hover:bg-[#0a4745] hover:-translate-y-1 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-2 disabled:bg-gray-200 disabled:text-gray-400 disabled:transform-none"
          >
            {loading ? <Loader2 className="animate-spin" size={14} /> : <><Save size={14} /> Simpan Perubahan</>}
          </button>
        </div>
      </div>
    </div>
  );
}