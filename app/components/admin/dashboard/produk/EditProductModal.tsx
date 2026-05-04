"use client";

import { X, Plus, Loader2 } from "lucide-react";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Swal from "sweetalert2";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product: any; 
}

export default function EditProductModal({ isOpen, onClose, onSuccess, product }: EditProductModalProps) {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    stock: "",
    category: "Tas Pria",
    description: "",
    image: null as any 
  });

  // Sinkronisasi data produk ke form saat modal dibuka
  useEffect(() => {
    if (product && isOpen) {
      setFormData({
        id: product.id,
        name: product.name,
        price: product.price.toString().replace(/[^0-9]/g, ''), // Bersihkan format Rupiah ke angka
        stock: product.stock.toString(),
        category: product.category,
        description: product.description || "",
        image: null
      });
      setImagePreview(product.image);
    }
  }, [product, isOpen]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFormData({ ...formData, image: file }); 
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("id", formData.id);
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("category", formData.category);
      data.append("description", formData.description);
      
      // Hanya kirim file jika user memilih gambar baru
      if (formData.image) {
        data.append("file", formData.image);
      }

      const response = await fetch("/api/admin/produk", {
        method: "PUT", // Gunakan PUT untuk Update
        body: data, 
      });

      if (response.ok) {
        Swal.fire("Berhasil", "Produk telah diperbarui", "success");
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Gagal update:", error);
      Swal.fire("Error", "Gagal memperbarui produk", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 text-gray-800">
      <div className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden relative">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full text-gray-400 z-10 transition-colors">
          <X size={20} />
        </button>

        <div className="p-8 pb-0">
          <h2 className="text-2xl font-black text-emerald-900 tracking-tight">Edit Produk</h2>
          <p className="text-gray-400 text-sm">Sesuaikan informasi produk Anda.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Preview Image */}
          <div className="group relative border-2 border-dashed border-gray-200 rounded-[24px] h-64 flex flex-col items-center justify-center bg-gray-50 overflow-hidden transition-all hover:border-emerald-300">
            {imagePreview && <img src={imagePreview} className="absolute inset-0 w-full h-full object-cover" alt="preview" />}
            <div className={`absolute inset-0 flex flex-col items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity`}>
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleImageChange} />
              <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-emerald-600"><Plus size={24} /></div>
              <p className="text-white text-[10px] mt-2 font-bold uppercase tracking-wider">Ganti Gambar</p>
            </div>
          </div>

          <div className="space-y-4">
            <input 
              required 
              placeholder="Nama Barang" 
              className="w-full px-4 py-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            
            <select 
              className="w-full px-4 py-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
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
                className="w-full px-4 py-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
              <input 
                type="number" required placeholder="Stok" 
                className="w-full px-4 py-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
              />
            </div>

            <textarea 
              placeholder="Deskripsi..." 
              className="w-full px-4 py-3 bg-gray-100 rounded-xl h-24 resize-none outline-none focus:ring-2 focus:ring-emerald-500"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />

            <button 
              disabled={loading}
              type="submit" 
              className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 disabled:bg-gray-300 transition-all shadow-lg shadow-emerald-200 flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Update Produk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}