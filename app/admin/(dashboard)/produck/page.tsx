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

  const [selectedCategory, setSelectedCategory] = useState("Semua Produk");
  
  // 🔥 TAMBAHKAN STATE INI
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/produk");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  };

  const dynamicCategories = [
    "Semua Produk",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];



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

      {!loading && products.length > 0 && (
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {dynamicCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs transition-all ${
                selectedCategory === cat

              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}

        </button>

        {loading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <Loader2 className="animate-spin text-emerald-600" />
          </div>
        ) : (
          filteredProducts.map((product: any) => (
            <ProductCard
              key={product.id}
              id={product.id}

              name={product.name}
              category={product.category}
              price={formatIDR(product.price)}
              stock={product.stock}

          ))
        )}
      </div>

      {/* Modal untuk tambah produk baru */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal} // Gunakan handleCloseModal
        onSuccess={fetchProducts}
        editData={selectedProduct} // 🔥 Kirim data edit ke modal
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