import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import WizardSteps from "@/components/WizardSteps";

export default function Index() {
  const navigate = useNavigate();
  const [tourName, setTourName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [riderFileName, setRiderFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRiderFileName(file.name);
      setIsUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    }
  };

  const handleContinue = () => {
    navigate("/select-venues");
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: `url('https://api.builder.io/api/v1/image/assets/TEMP/0bf266364deb2b3b5130c70725d74cc03a0079ee?width=3360') center/cover no-repeat, linear-gradient(0deg, rgba(1, 3, 73, 0.30) 0%, rgba(1, 3, 73, 0.30) 100%), #000`,
        backgroundBlendMode: "screen, lighten, normal",
      }}
    >
      <Header />

      <main className="flex-1 flex justify-center items-start">
        <div className="w-full max-w-[1280px] px-6 py-6 flex flex-col items-center gap-6">
          <WizardSteps />

          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <div className="flex flex-col items-center justify-center gap-0">
              <h1 className="text-[32px] font-bold leading-[125%] text-[#FCFCFC]">
                Create New Tour
              </h1>
              <p className="text-sm font-normal leading-5 tracking-[-0.28px] text-[#FCFCFC] opacity-60">
                [ name of the tour goes here ]
              </p>
            </div>

            <div className="w-full max-w-[640px] flex flex-col gap-6">
              <div className="flex flex-col gap-6 px-10 py-14 bg-black/50 border border-black rounded-sm min-h-[160px]">
                <div className="flex flex-col gap-4 min-h-20">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                      Tour Name
                    </label>
                    <div className="flex items-center px-4 py-2 bg-black/25 border border-[#272B30] rounded-xl w-full h-[52px]">
                      <input
                        type="text"
                        placeholder="Add tour name"
                        value={tourName}
                        onChange={(e) => setTourName(e.target.value)}
                        className="flex-1 bg-transparent text-sm font-normal leading-5 tracking-[-0.28px] text-[#FCFCFC] opacity-60 placeholder:text-[#FCFCFC] placeholder:opacity-60 outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex-1 flex flex-col gap-2">
                      <label className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                        Start Date
                      </label>
                      <div className="flex items-center px-4 py-2 bg-black/25 border border-[#272B30] rounded-xl h-[52px]">
                        <input
                          type="text"
                          placeholder="Select start date...."
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="flex-1 bg-transparent text-sm font-normal leading-5 tracking-[-0.28px] text-[#FCFCFC] opacity-60 placeholder:text-[#FCFCFC] placeholder:opacity-60 outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col gap-2">
                      <label className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                        End Date
                      </label>
                      <div className="flex items-center px-4 py-2 bg-black/25 border border-[#272B30] rounded-xl h-[52px]">
                        <input
                          type="text"
                          placeholder="Select end date...."
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="flex-1 bg-transparent text-sm font-normal leading-5 tracking-[-0.28px] text-[#FCFCFC] opacity-60 placeholder:text-[#FCFCFC] placeholder:opacity-60 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                      Upload RIDER
                    </label>

                    {!riderFileName ? (
                      <label className="flex items-center gap-2.5 px-4 py-2 h-[52px] bg-black/25 border border-[#272B30] rounded-xl cursor-pointer hover:bg-black/30 transition-colors">
                        <span className="flex-1 text-sm font-normal leading-5 tracking-[-0.28px] text-[#FCFCFC] opacity-60">
                          Select...
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                      </label>
                    ) : uploadProgress === 100 && !isUploading ? (
                      <div className="flex items-center gap-2.5 px-4 py-4 bg-black/50 border border-[#272B30] rounded-lg">
                        <span className="flex-1 text-sm font-normal leading-5 tracking-[-0.28px] text-[#FCFCFC] opacity-60">
                          {riderFileName}
                        </span>
                        <span className="w-16 flex-shrink-0 text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white text-right">
                          100%
                        </span>
                        <svg
                          className="w-4 h-4 flex-shrink-0"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 6.33333L7 10L5.66667 8.66667M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
                            stroke="#48FFA7"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    ) : null}
                  </div>
                </div>

                {isUploading && (
                  <div className="flex items-center gap-4 py-4 w-full">
                    <span className="w-18 flex-shrink-0 text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white text-center">
                      Upload
                    </span>
                    <div className="flex-1 h-1 relative">
                      <div className="absolute inset-0 h-1 bg-white/25 rounded-full"></div>
                      <div
                        className="absolute inset-0 h-1 bg-[#48FFA7] rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <span className="w-16 flex-shrink-0 text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                      {uploadProgress}%
                    </span>
                  </div>
                )}
              </div>

              <div className="flex justify-center items-end gap-2">
                <button
                  type="button"
                  className="w-[200px] px-5 py-3 flex items-center justify-center gap-2 rounded-xl border-2 border-[#272B30] text-[15px] font-bold leading-6 tracking-[-0.15px] text-[#FCFCFC] opacity-30 hover:opacity-50 transition-opacity"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleContinue}
                  className="w-[200px] px-5 py-3 flex items-center justify-center gap-2 rounded-xl text-[15px] font-bold leading-6 tracking-[-0.15px] text-white/80 hover:bg-[#FF634E]/30 transition-colors"
                  style={{ backgroundColor: "rgba(255, 99, 78, 0.20)" }}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
