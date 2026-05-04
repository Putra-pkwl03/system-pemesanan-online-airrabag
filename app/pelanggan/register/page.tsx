import Link from "next/link";
import AuthBrand from "../../components/pelanggan/auth/AuthBrand";
import AuthCard from "../../components/pelanggan/auth/AuthCard";
import AuthFooter from "../../components/pelanggan/auth/AuthFooter";
import AuthHeader from "../../components/pelanggan/auth/AuthHeader";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] px-8 py-10 font-sans">
      <div className="mx-auto max-w-[1000px]">
        <h1 className="mb-4 text-[20px] font-medium tracking-[0.2em] text-[#737373]">
          PENDAFTARAN AKUN
        </h1>

        <section className="relative overflow-hidden border border-gray-600 bg-white shadow-2xl">
          <AuthHeader />

          <div className="flex flex-col items-center px-8 pb-12 pt-8">
            <AuthBrand />
            <AuthCard mode="register" />

            <div className="mt-8 self-end pr-4 text-sm font-semibold text-red-600">
              <Link href="/" className="hover:underline">
                Lihat Sebagai Pengunjung &gt;&gt;&gt;
              </Link>
            </div>
          </div>

          <AuthFooter />
        </section>
      </div>
    </main>
  );
}