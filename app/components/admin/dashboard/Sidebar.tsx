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
  { name: "Ulasan", icon: MessageSquare, href: "/admin/ulasan" },
  { name: "Promo", icon: Ticket, href: "/admin/promo" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    // Ubah p-6 menjadi px-2 py-6 agar area menu memiliki ruang lebih luas ke samping
    <div className="w-64 bg-[#DDCC9D] h-[calc(100vh-75px)] border-r flex flex-col px-2 py-6 fixed left-0 top-[75px] ">
      
      <div className="mb-2"></div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              // px-4 sekarang akan terlihat pas karena kontainer luar (px-2) tidak lagi mendorong terlalu jauh
              className={`w-full flex items-center space-x-3 py-3 px-4 rounded-lg transition ${
                isActive 
                  ? "bg-[#B6AB91] text-black border-r-4 border-gray-600 shadow-sm" 
                  : "text-black hover:bg-[#B6AB91]/50"
              }`}
            >
              <item.icon size={20} className="shrink-0" />
              <span className="font-medium whitespace-nowrap">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}