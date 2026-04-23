"use client";

import { X, Plus, Loader2 } from "lucide-react";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editData?: any; 
}

export default function AddProductModal({ isOpen, onClose, onSuccess, editData }: AddProductModalProps) {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "Tas Pria",
    description: "",
    image: "" 
  });

  useEffect(() => {
    if (editData && isOpen) {
      setFormData({
        name: editData.name || "",
        // Regex ini membersihkan format "Rp 50.000" menjadi "50000" agar input number tidak error
        price: editData.price ? String(editData.price).replace(/[^0-9]/g, "") : "",
        stock: editData.stock?.toString() || "",
        category: editData.category || "Tas Pria",
        description: editData.description || "",
        image: "" 
      });
      setImagePreview(editData.image || null);
    } else if (!editData && isOpen) {
      setFormData({
        name: "",
        price: "",
        stock: "",
        category: "Tas Pria",
        description: "",
        image: ""
      });
      setImagePreview(null);
    }
  }, [editData, isOpen]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFormData({ ...formData, image: file as any }); 
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("category", formData.category);
      data.append("description", formData.description);
      
      if (formData.image) {
        data.append("file", formData.image); 
      }

      // 🔥 WAJIB: Kirim ID produk jika sedang dalam mode Edit
      if (editData?.id) {
        data.append("id", editData.id.toString());
      }

      const response = await fetch("/api/admin/produk", {
        method: editData ? "PUT" : "POST", 
        body: data, 
      });

      if (response.ok) {
        onSuccess();
        onClose();
      } else {
        const error = await response.json();
        alert(error.message || "Terjadi kesalahan");
      }
    } catch (error) {
      console.error("Gagal menyimpan:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative">
        <button onClick={onClose} type="button" title="Tutup" aria-label="Tutup modal" className="absolute top-5 right-5 cursor-pointer p-2 hover:bg-gray-100 rounded-full text-gray-400 z-10 transition-colors">
          <X size={20} />
        </button>

        <div className="p-8 pb-0">
          <h2 className="text-2xl font-bold text-emerald-900">
            {editData ? "Update Produk" : "Tambah Produk"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upload Image Section */}
          <div className="group relative border-2 border-dashed border-gray-200 rounded-3xl h-64 flex flex-col items-center justify-center bg-gray-50 overflow-hidden transition-all hover:border-emerald-300">
            {imagePreview && <img src={imagePreview} className="absolute inset-0 w-full h-full object-cover" alt="preview" />}
            <div className={`absolute inset-0 flex flex-col items-center justify-center ${imagePreview ? 'bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity' : ''}`}>
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleImageChange} title="Upload image" aria-label="Upload image" />
              <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-emerald-600"><Plus size={24} /></div>
              {imagePreview && <p className="text-white text-xs mt-2 font-bold uppercase tracking-wider">Ganti Foto</p>}
            </div>
          </div>

          {/* Inputs Section */}
          <div className="space-y-4">
            <input 
              required placeholder="Nama Barang" 
              className="w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            
            <select 
              title="Pilih Kategori"
              aria-label="Pilih Kategori"
              className="w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="Tas Pria">Tas Pria</option>
              <option value="Tas Wanita">Tas Wanita</option>
              <option value="Backpack">Backpack</option>
              <option value="Pouch">Pouch</option>
              <option value="Wallet">Wallet</option>
              <option value="Asesoris">Asesoris</option>
            </select>

            <div className="grid grid-cols-2 gap-4">
              <input 
                type="number" required placeholder="Harga" 
                className="w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
              <input 
                type="number" required placeholder="Stok" 
                className="w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
              />
            </div>

            <textarea 
              placeholder="Deskripsi..." 
              className="w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-xl h-24 resize-none outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />

            <button 
              disabled={loading}
              type="submit" 
              className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 disabled:bg-gray-400 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> Processing...</>
              ) : (
                editData ? "Update" : "Save" 
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}