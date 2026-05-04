"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Bell, Settings, User, LogOut, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation"; 
import ProfileModal from "./ProfileModal";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({ name: "Loading...", role: "" }); // 🔥 State baru
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 🔥 Ambil data user saat komponen di-load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/admin/me");
        if (res.ok) {
          const data = await res.json();
          setUserData({ name: data.name, role: data.role });
        }
      } catch (err) {
        console.error("Gagal mengambil data user");
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      if (response.ok) {
        setIsDropdownOpen(false);
        window.location.href = "/admin/login"; 
      }
    } catch (error) {
      window.location.href = "/admin/login";
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
    <header className="fixed top-0 left-0 right-0  z-50 flex justify-between items-center bg-[#B6AB91] p-6 shadow-md  h-[75px]">     
         <div className="flex items-center  w-96">
          <p>
            <span className="text-gray-900 font-bold text-xl">AiraBag</span>
            <br />
            <span className="text-gray-800 text-xs uppercase tracking-widest">Tas Kulit Asli Jogja</span>
          </p>
        </div>

        <div className="flex items-center space-x-6">
          <Bell size={20} className="text-gray-800 cursor-pointer" />
          <Settings size={20} className="text-gray-800 cursor-pointer" />
          
          <div className="relative" ref={dropdownRef}>
            <div 
              className="flex items-center space-x-3 border-l border-gray-800 pl-6 cursor-pointer group"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="text-right">
                {/* 🔥 Ganti nama statis dengan userData.name */}
                <p className="text-sm font-bold text-gray-800 leading-tight group-hover:text-gray-600 transition-colors">
                  {userData.name}
                </p>
                <p className="text-[10px] text-gray-800 uppercase font-bold tracking-tighter">
                  {userData.role || "Owner"}
                </p>
              </div>
              <div className="w-10 h-10 bg-[#7F7F7F54] rounded-lg overflow-hidden border border-gray-800">
                <img 
                  src={`https://ui-avatars.com/api/?name=${userData.name}&background=7F7F7F54&color=#7F7F7F54`} 
                  alt="avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <ChevronDown size={14} className={`text-gray-800 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[60]">
                <button 
                  onClick={() => { setIsDropdownOpen(false); setIsModalOpen(true); }}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-600 hover:bg-emerald-50"
                >
                  <User size={16} />
                  <span className="font-medium">Profile Detail</span>
                </button>
                <div className="h-px bg-gray-100 my-1 mx-2" />
                <button 
                  className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}