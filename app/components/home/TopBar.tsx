import Link from "next/link";

export default function TopBar() {
  return (
    <header className="flex items-center justify-between bg-[#d9d9d9] px-8 py-4">
      <div className="bg-[#d8c68c] px-4 py-1 text-3xl font-medium tracking-wide text-[#4a4a4a]">
        AIRABAG
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 rounded-full bg-gray-500 px-3 py-1 text-sm text-white">
          <span className="h-3 w-3 rounded-full bg-red-600"></span>
          IND
          <span className="text-xs">▾</span>
        </button>

        <a href="#" 
          className="rounded-md bg-gray-400 px-4 py-1 text-sm text-white transition hover:bg-gray-500"
        >
          login

        </a>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-300 text-white">
          ⭘
        </div>
      </div>
    </header>
  );
}