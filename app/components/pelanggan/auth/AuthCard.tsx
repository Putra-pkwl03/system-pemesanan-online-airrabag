import Link from "next/link";
import AuthInput from "./AuthInput";

type AuthCardProps = {
  mode: "login" | "register";
};

export default function AuthCard({ mode }: AuthCardProps) {
  const isRegister = mode === "register";

  return (
    <div className="mx-auto w-full max-w-[580px] overflow-hidden rounded-[1.5rem] bg-[#cccccc] p-4 shadow-sm">
      <div className="flex items-center justify-center gap-3 rounded-[0.8rem] bg-[#474747] py-3 text-[24px] font-bold tracking-widest text-white">
        <span className="text-[28px]">🛡️</span> {isRegister ? "REGISTER" : "LOGIN"}
      </div>

      <div className="px-12 py-8">
        <form className="space-y-4">
          {isRegister && (
            <AuthInput
              label="Nama Lengkap"
              type="text"
              placeholder="Masukkan nama lengkap"
              leftIcon="👤"
            />
          )}

          <AuthInput
            label="Alamat Email"
            type="email"
            placeholder="Masukkan email"
            leftIcon="✉"
          />

          <AuthInput
            label="Password"
            type="password"
            placeholder="Masukkan password"
            leftIcon="🔑"
          />

          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-[#2f2f2f] py-2 text-[18px] font-medium text-white transition hover:opacity-90"
          >
            <span>➜</span> {isRegister ? "Daftar Sekarang" : "Login Sekarang"}
          </button>
        </form>
      </div>

      <div className="border-t border-gray-400 px-8 py-4 text-center text-[14px] text-[#2f2f2f]">
        {isRegister ? (
          <>
            Sudah Punya Akun?{" "}
            <Link
              href="/pelanggan/login"
              className="text-blue-600 hover:underline"
            >
              Login Di sini
            </Link>
          </>
        ) : (
          <>
            Belum punya akun?{" "}
            <Link
              href="/pelanggan/register"
              className="text-blue-600 hover:underline"
            >
              Daftar Di sini
            </Link>
          </>
        )}
      </div>
    </div>
  );
}