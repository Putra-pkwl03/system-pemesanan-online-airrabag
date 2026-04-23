import Link from "next/link";

export default function AuthFooter() {
  return (
    <footer className="flex items-center justify-between border-t border-gray-400 bg-[#f5f5f5] px-10 py-3 text-[12px] text-[#2f2f2f]">
      <p className="font-medium">@2026|AIRABAG</p>

      <div className="flex items-center gap-4 text-gray-700">
        <Link href="#" className="hover:underline">
          Syarat & Ketentuan
        </Link>
        <span className="text-gray-400">•</span>
        <Link href="#" className="hover:underline">
          Kebijakan Privasi
        </Link>
        <span className="text-gray-400">•</span>
        <Link href="#" className="hover:underline">
          Hubungi Kami
        </Link>
      </div>
    </footer>
  );
}