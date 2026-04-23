"use client";

import { useState, useEffect } from "react";
import ProductCard from "../../../components/admin/dashboard/produk/ProductCard";
import AddProductModal from "../../../components/admin/dashboard/produk/AddProductModal";
import { Plus, Loader2 } from "lucide-react";

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

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // 🔥 TAMBAHKAN FUNGSI INI
  const handleEdit = (product: any) => {
    setSelectedProduct(product); // Masukkan data produk ke state
    setIsModalOpen(true);        // Buka modal
  };

  // 🔥 FUNGSI CLOSE MODAL (Agar state bersih kembali)
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const dynamicCategories = [
    "Semua Produk",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const filteredProducts =
    selectedCategory === "Semua Produk"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const formatIDR = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section>
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold text-emerald-900">Produk</h1>
      </div>

      {!loading && products.length > 0 && (
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {dynamicCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs transition-all ${
                selectedCategory === cat
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
          className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-6 hover:border-emerald-300 hover:bg-emerald-50 transition-all group min-h-[200px] w-full max-w-[200px]"
        >
          <div className="w-10 h-10 rounded-full bg-gray-50 group-hover:bg-emerald-100 flex items-center justify-center text-gray-400 group-hover:text-emerald-600 mb-2 transition-colors">
            <Plus size={20} />
          </div>
          <span className="text-[11px] font-bold text-gray-400 group-hover:text-emerald-700">Add Product</span>
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
              image={product.image}
              onDelete={handleDelete}
              onEdit={() => handleEdit(product)} // Ini sudah benar
            />
          ))
        )}
      </div>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal} // Gunakan handleCloseModal
        onSuccess={fetchProducts}
        editData={selectedProduct} // 🔥 Kirim data edit ke modal
      />
    </section>
  );
}