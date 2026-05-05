"use client";

import { useState, useEffect } from "react";
import ProductCard from "../../../components/admin/dashboard/produk/ProductCard";
import AddProductModal from "../../../components/admin/dashboard/produk/AddProductModal";
import EditProductModal from "../../../components/admin/dashboard/produk/EditProductModal";
import PromoModal from "../../../components/admin/dashboard/produk/PromoModal"; // Import modal baru
import { Plus, Loader2 } from "lucide-react";
import Swal from "sweetalert2";

export default function ProduckPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  // State untuk Promo Modal
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  
  // State untuk filtering
  const [selectedCategory, setSelectedCategory] = useState("Semua Produk");

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/produk");
      if (!res.ok) throw new Error("Gagal mengambil data");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handler untuk membuka modal promo dari Card
  const handleOpenPromo = (product: any) => {
    setActiveProduct(product);
    setIsPromoModalOpen(true);
  };

  const dynamicCategories = [
    "Semua Produk",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const filteredProducts = selectedCategory === "Semua Produk"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const formatIDR = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleEditOpen = (product: any) => {
  setSelectedProduct(product);
  setIsEditModalOpen(true);
};

const handleDelete = async (id: number) => {
    // 1. Tampilkan Modal Konfirmasi
    const result = await Swal.fire({
      title: "Hapus Produk?",
      text: "Data produk ini akan dihapus permanen dari sistem.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981", // Warna emerald
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch("/api/admin/produk", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });

        if (response.ok) {
          // Toast sukses
          Swal.fire({
            title: "Terhapus!",
            text: "Produk berhasil dihapus.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          
          // Refresh data (panggil fetch data produk Anda)
          fetchProducts(); 
        } else {
          throw new Error("Gagal menghapus");
        }
      } catch (error) {
        Swal.fire("Error", "Gagal menghapus produk.", "error");
      }
    }
  };


  return (
    <section>
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900">Produk</h1>
          <p className="text-gray-400 text-sm">Kelola inventaris koleksi botani Anda.</p>
        </div>
      </div>

      {/* Filter Categories Dinamis */}
      {!loading && products.length > 0 && (
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {dynamicCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#DDCC9D] text-black shadow-lg shadow-[#DDCC9D]/50"
                  : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid Produk */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {/* Button Add New */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="border-2 cursor-pointer border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-6 hover:border-[#DDCC9D] hover:bg-[#DDCC9D]/20 transition-all group min-h-[280px]"
        >
          <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-[#DDCC9D] flex items-center justify-center text-gray-400 group-hover:text-black mb-3 transition-colors">
            <Plus size={24} />
          </div>
          <span className="text-sm font-bold text-gray-400 group-hover:text-black">Add Product</span>
        </button>

        {loading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 className="animate-spin mb-2 text-emerald-500" size={32} />
            <p className="text-sm font-medium">Menyinkronkan data...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product: any) => (
            <ProductCard
              key={product.id}
              id={product.id}
              onEdit={handleEditOpen}
              onDelete={handleDelete}
              name={product.name}
              category={product.category}
              price={formatIDR(product.price)}
              stock={product.stock}
              image={product.image || "https://images.unsplash.com/photo-1501004318641-729e8e22bd0e?q=80&w=500"}
              onAddToPromo={handleOpenPromo} // Hubungkan handler ke card
                         />
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
            <p className="text-gray-400">
              {products.length === 0 
                ? "Belum ada produk. Mulai tambahkan koleksi baru!" 
                : `Tidak ada produk di kategori "${selectedCategory}"`}
            </p>
          </div>
        )}
      </div>

      {/* Modal untuk tambah produk baru */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchProducts}
      />

      {/* Modal untuk tambah ke promo (Pilih 2 Produk) */}
      <PromoModal
        isOpen={isPromoModalOpen}
        onClose={() => setIsPromoModalOpen(false)}
        selectedProduct={activeProduct}
        allProducts={products} // Kirim semua produk agar bisa dipilih pasangan di dropdown
      />

      <EditProductModal 
  isOpen={isEditModalOpen}
  onClose={() => setIsEditModalOpen(false)}
  onSuccess={fetchProducts} // Refresh data setelah edit
  product={selectedProduct}
/>
    </section>
  );
}