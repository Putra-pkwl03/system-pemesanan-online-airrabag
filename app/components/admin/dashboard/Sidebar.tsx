"use client"; // Wajib karena kita menggunakan usePathname

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  MessageSquare, 
  Ticket, 
  Plus 
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { name: "Produk", icon: Package, href: "/admin/produck" }, // URL sesuai permintaanmu
  { name: "Pesanan", icon: ShoppingCart, href: "/admin/pesanan" },
  { name: "Laporan", icon: BarChart3, href: "/admin/laporan" },
  { name: "Promo", icon: Ticket, href: "/admin/promo" },
  { name: "Ulasan", icon: MessageSquare, href: "/admin/ulasan" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white h-screen border-r flex flex-col p-6 fixed left-0 top-0 z-50">
      <div className="mb-10">
        <h1 className="text-emerald-800 font-bold text-xl">The Botanical Atelier</h1>
        <p className="text-gray-400 text-xs uppercase tracking-widest">Management Portal</p>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          // Logika untuk menentukan apakah menu sedang aktif berdasarkan URL
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                isActive 
                  ? "bg-emerald-50 text-emerald-600 border-r-4 border-emerald-600" 
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <button className="mt-auto bg-emerald-600 text-white rounded-lg py-3 flex items-center justify-center space-x-2 hover:bg-emerald-700 transition shadow-md shadow-emerald-100">
        <Plus size={18} />
        <span>New Entry</span>
      </button>
    </div>
  );
}