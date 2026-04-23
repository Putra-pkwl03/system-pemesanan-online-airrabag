import { ClipboardList, Box, Truck, TrendingUp } from "lucide-react";

export default function OrderStats() {
  const stats = [
    { label: "MENUNGGU", value: "12", icon: <ClipboardList className="text-emerald-600" />, color: "bg-emerald-50" },
    { label: "DIPROSES", value: "48", icon: <Box className="text-emerald-600" />, color: "bg-emerald-50" },
    { label: "DIKIRIM", value: "156", icon: <Truck className="text-blue-600" />, color: "bg-blue-50" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-4">
          <div className={`p-3 rounded-xl ${stat.color}`}>{stat.icon}</div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 tracking-wider">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
          </div>
        </div>
      ))}
      
      <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-emerald-500 flex justify-between items-center">
        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider text-emerald-600">TOTAL HARI INI</p>
          <p className="text-xl font-bold text-slate-800">Rp 4.250.000</p>
        </div>
        <TrendingUp className="text-emerald-500 w-8 h-8" />
      </div>
    </div>
  );
}