import Link from "next/link";

export default function AuthHeader() {
  return (
    <header className="flex items-center justify-between bg-[#d6d6d6] px-8 py-2">
      <Link
        href="/"
        className="text-[32px] leading-none text-black transition hover:opacity-70"
      >
        ←
      </Link>

      <button
        type="button"
        className="text-[24px] leading-none text-black transition hover:opacity-70"
      >
        💬
      </button>
    </header>
  );
}