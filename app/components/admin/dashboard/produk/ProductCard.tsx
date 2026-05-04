

interface ProductProps {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  image: string;
  onDelete: (id: number) => void;

        </div>

        {/* Klik Button ini untuk memicu modal */}
        <button 
          onClick={() => onAddToPromo({ id, name, category, price, image })}
          className="w-full mt-2 bg-[#DDCC9D] hover:bg-[#B6AB91] text-[#0f3433] text-[10px] font-bold py-1.5 rounded-full transition-colors flex items-center justify-center"
        >
          Tambah Ke Promo <Plus size={10} className="ml-1" />
        </button>
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