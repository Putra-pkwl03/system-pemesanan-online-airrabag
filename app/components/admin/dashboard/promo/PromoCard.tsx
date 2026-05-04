"use client";
import { Trash2, Edit2 } from "lucide-react";

interface PromoCardProps {
  promo: any;
  onEdit: () => void;
  allProducts: any[];
  onDelete: (id: number) => void;
}

export default function PromoCard({ promo, onEdit, allProducts, onDelete }: PromoCardProps) {
  const formatIDR = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const totalPriceNormal = promo.mainProduct.price + promo.secondProduct.price;

  return (
    <div className="bg-[#063130] rounded-[32px] p-5 shadow-lg relative group text-white flex flex-col items-center">
      {/* Action Buttons */}
      <div className="w-full flex justify-between items-center mb-4">
        <button 
          onClick={onEdit}
          className="cursor-pointer flex items-center text-[10px] font-medium text-gray-300 hover:text-white transition-colors"
        >
          <Edit2 size={12} className="mr-1" /> Edit
        </button>
        <button 
          onClick={() => onDelete(promo.id)}
          className="cursor-pointer text-gray-300 hover:text-red-400 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Product Pair Visual */}
      <div className="flex items-center justify-center gap-2 mb-6 w-full">
        {/* Main Product */}
        <div className="flex flex-col items-center flex-1">
          <div className="aspect-square w-full max-w-[100px] rounded-2xl overflow-hidden bg-white/10 mb-2">
            <img 
              src={promo.mainProduct.image} 
              alt={promo.mainProduct.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          <h3 className="text-[10px] font-medium text-center line-clamp-1 text-gray-200">
            {promo.mainProduct.name}
          </h3>
          <p className="text-[8px] text-gray-400 line-through">
            {formatIDR(promo.mainProduct.price)}
          </p>
        </div>

        {/* Plus Sign */}
        <span className="text-[#DDCC9D] font-bold text-lg">+</span>

        {/* Second Product */}
        <div className="flex flex-col items-center flex-1">
          <div className="aspect-square w-full max-w-[100px] rounded-2xl overflow-hidden bg-white/10 mb-2">
            <img 
              src={promo.secondProduct.image} 
              alt={promo.secondProduct.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          <h3 className="text-[10px] font-medium text-center line-clamp-1 text-gray-200">
            {promo.secondProduct.name}
          </h3>
          <p className="text-[8px] text-gray-400 line-through">
            {formatIDR(promo.secondProduct.price)}
          </p>
        </div>
      </div>

      {/* Promo Pricing */}
      <div className="mt-auto w-full text-center border-t border-white/10 pt-4">
        <p className="text-[#DDCC9D] font-black text-lg">
          {formatIDR(promo.promoPrice)}
        </p>
        <div className="inline-block mt-1 bg-red-500/20 text-red-400 text-[8px] px-2 py-0.5 rounded-full font-bold">
           Hemat {formatIDR(totalPriceNormal - promo.promoPrice)}
        </div>
      </div>
    </div>
  );
}