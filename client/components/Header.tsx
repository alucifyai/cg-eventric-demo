import { Search, User, Calendar } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-end gap-6 px-6 py-4 bg-black/[0.34] backdrop-blur-sm">
      <div className="flex items-center justify-start flex-1 max-w-[1064px] mr-auto">
        <div className="w-12 h-12 rounded-full border-[3px] border-white overflow-hidden">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/45f0cfce8515218935683d89c5d1d0ed6b2eef23?width=96"
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex items-center justify-between w-full max-w-[360px] px-4 py-2 bg-black/25 border border-black/60 rounded-xl">
        <div className="flex items-center gap-3">
          <Search className="w-4 h-4 text-white/60" />
          <div className="flex items-center gap-3">
            <div className="w-0.5 h-5 bg-[#2A85FF] rounded-full"></div>
            <span className="text-sm text-white/60 opacity-50">Search ...</span>
          </div>
        </div>
        <div className="flex items-center justify-center px-3 py-1 bg-black/25 rounded-lg">
          <span className="text-base font-semibold text-[#FCFCFC]">⌘ F</span>
        </div>
      </div>

      <div className="flex items-start gap-2">
        <div className="relative w-12 h-12 flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>

        <div className="relative w-12 h-12 flex items-center justify-center">
          <Calendar className="w-6 h-6 text-white" />
          <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-[#FF6A55] border-2 border-[#1A1D1F] rounded-full"></div>
        </div>

        <div className="w-12 h-12 rounded-full bg-[#FFBC99] flex items-center justify-center overflow-hidden">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/8db3c3fd9a35aba39580bee74af21776e8df2cbd?width=189"
            alt="User avatar"
            className="w-full h-auto object-cover"
            style={{ mixBlendMode: "multiply" }}
          />
        </div>
      </div>
    </header>
  );
}
