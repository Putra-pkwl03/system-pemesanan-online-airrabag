"use client";
import { X, Tag, FileText, Plus, Loader2 } from "lucide-react";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface PromoModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: any;
  allProducts: any[];
}

export default function PromoModal({ isOpen, onClose, selectedProduct, allProducts }: PromoModalProps) {
  const router = useRouter();
  const [secondProductId, setSecondProductId] = useState("");
  const [promoPrice, setPromoPrice] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const secondProduct = useMemo(() => {
    return allProducts.find(p => p.id.toString() === secondProductId);
  }, [secondProductId, allProducts]);

  const handleSubmit = async () => {
    // Debugging: Lihat di console browser apakah ID benar-benar ada
    console.log("Main Product ID:", selectedProduct?.id);
    console.log("Second Product ID:", secondProduct?.id);

    if (!selectedProduct?.id || !secondProduct?.id || !promoPrice) {
      Swal.fire({
        title: "Data Tidak Lengkap",
        text: "Pastikan produk kedua sudah dipilih dan harga sudah diisi.",
        icon: "warning",
        confirmButtonColor: "#063130",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/admin/promo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mainProductId: Number(selectedProduct.id),
          secondProductId: Number(secondProduct.id),
          promoPrice: parseFloat(promoPrice),
          description: description,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal menyimpan ke server");
      }

      Swal.fire({
        title: "Berhasil!",
        text: "Promo bundle telah diaktifkan.",
        icon: "success",
        confirmButtonColor: "#063130",
      }).then(() => {
        onClose();
        router.refresh(); // Segarkan data di halaman
        router.push("/admin/promo");
      });

    } catch (error: any) {
      Swal.fire({
        title: "Gagal!",
        text: error.message,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !selectedProduct) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div className="bg-[#f8f9fa] rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl border border-white/20">
        
        {/* Header */}
        <div className="bg-[#063130] p-8 text-white relative">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Bundle Promo Baru</h2>
              <p className="text-emerald-200/70 text-sm mt-1">Gabungkan dua produk untuk penawaran spesial</p>
            </div>
            <button onClick={onClose} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Produk 1 */}
            <div className="bg-[#063130] rounded-2xl p-4 shadow-md text-white border border-white/5">
              <span className="text-[9px] font-bold text-[#DDCC9D] border border-[#DDCC9D]/40 px-2 py-0.5 rounded uppercase mb-3 inline-block">
                Produk Utama
              </span>
              <div className="aspect-square w-full rounded-lg overflow-hidden bg-gray-800 mb-4">
                <img src={selectedProduct.image} className="w-full h-full object-cover" alt="P1" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-[11px] leading-tight line-clamp-1">{selectedProduct.name}</h3>
                <p className="text-[9px] text-gray-400">{selectedProduct.category}</p>
                <p className="font-bold text-sm text-[#DDCC9D] mt-1">Rp {selectedProduct.price.toLocaleString()}</p>
              </div>
            </div>

            {/* Produk 2 */}
            <div className={`rounded-2xl p-4 border-2 transition-all flex flex-col justify-between ${
              secondProduct ? 'bg-[#063130] border-transparent text-white shadow-md' : 'bg-gray-50 border-dashed border-gray-200'
            }`}>
              <div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase mb-3 inline-block ${
                  secondProduct ? 'text-[#DDCC9D] border border-[#DDCC9D]/40' : 'text-gray-400 border border-gray-200'
                }`}>
                  Pasangan Promo
                </span>

                {!secondProduct ? (
                  <div className="flex flex-col items-center justify-center py-10">
                    <select 
                      value={secondProductId}
                      onChange={(e) => setSecondProductId(e.target.value)}
                      className="w-full p-2 bg-transparent text-xs font-bold outline-none cursor-pointer text-gray-500 hover:text-[#063130] text-center"
                    >
                      <option value="">+ PILIH PRODUK KEDUA</option>
                      {allProducts
                        .filter(p => p.id !== selectedProduct.id)
                        .map((product) => (
                          <option key={product.id} value={product.id} className="text-black">
                            {product.name}
                          </option>
                        ))}
                    </select>
                  </div>
                ) : (
                  <div className="relative group animate-in fade-in duration-300">
                    <button 
                      onClick={() => setSecondProductId("")}
                      className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full z-10 shadow-lg"
                    >
                      <X size={10} />
                    </button>
                    <div className="aspect-square w-full rounded-lg overflow-hidden bg-gray-800 mb-4">
                      <img src={secondProduct.image} className="w-full h-full object-cover" alt="P2" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-[11px] leading-tight line-clamp-1">{secondProduct.name}</h3>
                      <p className="text-[9px] text-gray-400">{secondProduct.category}</p>
                      <p className="font-bold text-sm text-[#DDCC9D] mt-1">Rp {secondProduct.price.toLocaleString()}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-700 uppercase flex items-center gap-2 tracking-wider">
                <Tag size={12} className="text-emerald-600" /> Harga Promo Bundle
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">Rp</span>
                <input 
                  type="number"
                  placeholder="0"
                  value={promoPrice}
                  onChange={(e) => setPromoPrice(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-sm font-bold focus:border-[#063130] focus:ring-4 focus:ring-emerald-50 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-700 uppercase flex items-center gap-2 tracking-wider">
                <FileText size={12} className="text-emerald-600" /> Deskripsi Paket
              </label>
              <textarea 
                placeholder="Contoh: Paket Hemat 2 Tanaman..."
                rows={1}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl text-sm focus:border-[#063130] focus:ring-4 focus:ring-emerald-50 outline-none transition-all resize-none"
              />
            </div>
          </div>

          {/* Action Button */}
          <button 
            onClick={handleSubmit}
            disabled={!secondProduct || !promoPrice || loading}
            className="w-full py-5 bg-[#063130] text-[#DDCC9D] rounded-2xl font-black text-xs shadow-xl shadow-emerald-900/20 hover:bg-[#0a4745] hover:-translate-y-0.5 active:translate-y-0 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={14} />
            ) : (
              <>Aktifkan Promo <Plus size={14} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}