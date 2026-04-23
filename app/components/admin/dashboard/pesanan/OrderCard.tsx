import { CheckCircle2 } from "lucide-react";

interface OrderProps {
  name: string;
  price: string;
  customer: string;
  date: string;
  image: string;
}

export default function OrderCard({ name, price, customer, date }: OrderProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100">
      {/* Product Image Placeholder */}
      <div className="h-48 bg-slate-900 relative">
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
          <span className="text-[10px] font-medium text-slate-700">Sudah Bayar</span>
        </div>
        <div className="w-full h-full flex items-center justify-center text-emerald-500/20 text-2xl font-bold">
          {/* Ganti dengan <img src={image} /> jika ada asetnya */}
          [Plant Image]
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-[14px] text-slate-800 leading-tight w-2/3">{name}</h3>
          <div className="text-right">
            <p className="text-[10px] font-bold text-emerald-600">Rp</p>
            <p className="font-bold text-[10px] text-emerald-700">{price}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium mb-4">
          <p>{customer}</p>
          <p>{date}</p>
        </div>

        <button className="w-full cursor-pointer py-2.5 bg-[#10B981] hover:bg-[#059669] text-white rounded-xl font-semibold transition-colors shadow-lg shadow-emerald-100">
          Terima
        </button>
      </div>
    </div>
  );
}