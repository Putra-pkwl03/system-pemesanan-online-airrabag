type AuthInputProps = {
  label: string;
  type: string;
  placeholder: string;
  leftIcon?: string;
};

export default function AuthInput({
  label,
  type,
  placeholder,
  leftIcon = "",
}: AuthInputProps) {
  return (
    <div>
      <label className="mb-1 block text-[14px] font-medium text-[#2f2f2f]">
        {label}
      </label>

      <div className="flex h-[38px] overflow-hidden rounded-md border border-gray-400 bg-[#737373]">
        <div className="flex w-[48px] items-center justify-center border-r border-gray-500 text-[20px] text-white">
          {leftIcon}
        </div>

        <input
          type={type}
          placeholder={placeholder}
          className="flex-1 bg-transparent px-3 text-[14px] text-white placeholder:text-gray-300 focus:outline-none"
        />

        <div className="flex w-[48px] items-center justify-center text-[18px] text-black">
          {type === "password" ? "⚷" : "⚷"}
        </div>
      </div>
    </div>
  );
}