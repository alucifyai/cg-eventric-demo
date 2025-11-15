import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import WizardSteps from "@/components/WizardSteps";
import Calendar from "@/components/Calendar";
import VenueList from "@/components/VenueList";

export default function SelectVenues() {
  const navigate = useNavigate();
  const [dayType, setDayType] = useState<"show" | "off" | "travel">("show");
  const [venueName, setVenueName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");

  const handleContinue = () => {
    navigate("/rider-validation");
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

      <main className="flex-1 flex flex-col justify-between items-center">
        <div className="w-full max-w-[1280px] px-6 py-6 flex flex-col items-start gap-6">
          <WizardSteps />

          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <div className="flex flex-col items-center justify-center gap-0">
              <h1 className="text-[32px] font-bold leading-[125%] text-[#FCFCFC]">
                Add Events on tour
              </h1>
              <p className="text-sm font-normal leading-5 tracking-[-0.28px] text-[#FCFCFC] opacity-60">
                [ name of the tour goes here ]
              </p>
            </div>

            <div className="flex items-start gap-6 w-full">
              <div className="w-full max-w-[480px] h-auto self-stretch">
                <Calendar />
              </div>

              <div className="flex-1 flex flex-col gap-4 px-10 py-6 bg-black/50 rounded-sm min-h-[160px] w-2/5">
                <div className="flex items-center justify-center gap-2 w-full">
                  <h2 className="flex-1 text-lg font-bold leading-[125%] text-white">
                    Sunday, 7 December 2025
                  </h2>
                </div>

                <div className="flex flex-col items-start gap-4 w-full">
                  <div className="flex items-center justify-center gap-0 py-4 w-full">
                    <button
                      onClick={() => setDayType("show")}
                      className={`flex-1 px-4 py-2 flex items-center justify-center gap-2 text-[13px] font-bold leading-6 tracking-[-0.13px] ${
                        dayType === "show"
                          ? "bg-black text-white rounded-l-lg"
                          : "bg-transparent text-[#FCFCFC] border-2 border-[#272B30]"
                      }`}
                    >
                      Show Day
                    </button>
                    <button
                      onClick={() => setDayType("off")}
                      className={`flex-1 px-4 py-2 flex items-center justify-center gap-2 text-[13px] font-bold leading-6 tracking-[-0.13px] ${
                        dayType === "off"
                          ? "bg-black text-white"
                          : "bg-transparent text-[#FCFCFC] border-2 border-[#272B30]"
                      }`}
                    >
                      Day Off
                    </button>
                    <button
                      onClick={() => setDayType("travel")}
                      className={`flex-1 px-4 py-2 flex items-center justify-center gap-2 text-[13px] font-bold leading-6 tracking-[-0.13px] ${
                        dayType === "travel"
                          ? "bg-black text-white rounded-r-lg"
                          : "bg-transparent text-[#FCFCFC] border-2 border-[#272B30] rounded-r-lg"
                      }`}
                    >
                      Travel Day
                    </button>
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                      Venue Name
                    </label>
                    <div className="flex items-center h-[52px] px-2 py-2 bg-transparent border border-[#272B30] rounded-xl">
                      <div className="flex items-center gap-3 flex-1">
                        <Search className="w-6 h-6 text-[#6F767E]" />
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Search ..."
                            value={venueName}
                            onChange={(e) => setVenueName(e.target.value)}
                            className="flex-1 bg-transparent text-sm font-normal leading-5 tracking-[-0.28px] text-[#FCFCFC] opacity-60 placeholder:text-[#FCFCFC] placeholder:opacity-60 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                      Street Address
                    </label>
                    <div className="flex items-center h-[52px] px-4 py-2 bg-black/25 border border-[#272B30] rounded-xl">
                      <input
                        type="text"
                        placeholder="Street name here..."
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        className="flex-1 bg-transparent text-sm font-normal leading-5 tracking-[-0.28px] text-[#FCFCFC] opacity-60 placeholder:text-[#FCFCFC] placeholder:opacity-60 outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-4 w-full">
                    <div className="flex flex-col gap-2 w-3/10">
                      <label className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                        City
                      </label>
                      <div className="flex items-center h-[52px] px-4 py-2 bg-black/25 border border-[#272B30] rounded-xl">
                        <input
                          type="text"
                          placeholder="Insert here..."
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="flex-1 bg-transparent text-sm font-normal leading-5 tracking-[-0.28px] text-[#FCFCFC] opacity-60 placeholder:text-[#FCFCFC] placeholder:opacity-60 outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 w-3/10">
                      <label className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                        State
                      </label>
                      <div className="flex items-center h-[52px] px-4 py-2 bg-black/25 border border-[#272B30] rounded-xl">
                        <input
                          type="text"
                          placeholder="Insert here..."
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="flex-1 bg-transparent text-sm font-normal leading-5 tracking-[-0.28px] text-[#FCFCFC] opacity-60 placeholder:text-[#FCFCFC] placeholder:opacity-60 outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 w-3/10">
                      <label className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                        Zip Code
                      </label>
                      <div className="flex items-center h-[52px] px-4 py-2 bg-black/25 border border-[#272B30] rounded-xl">
                        <input
                          type="text"
                          placeholder="Insert here..."
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          className="flex-1 bg-transparent text-sm font-normal leading-5 tracking-[-0.28px] text-[#FCFCFC] opacity-60 placeholder:text-[#FCFCFC] placeholder:opacity-60 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                      Country
                    </label>
                    <div className="flex items-center h-[52px] px-4 py-2 bg-black/25 border border-[#272B30] rounded-xl">
                      <input
                        type="text"
                        placeholder="Select..."
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="flex-1 bg-transparent text-sm font-normal leading-5 tracking-[-0.28px] text-[#FCFCFC] opacity-60 placeholder:text-[#FCFCFC] placeholder:opacity-60 outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-full px-5 py-3 flex items-center justify-center gap-2 rounded-xl bg-white/25 text-[15px] font-bold leading-6 tracking-[-0.15px] text-[#FCFCFC] hover:bg-white/30 transition-colors"
                  >
                    Add Event
                  </button>
                </div>
              </div>

              <VenueList />
            </div>

            <div className="flex justify-center items-end gap-2 w-full max-w-[640px] pt-4">
              <button
                type="button"
                className="w-[200px] px-5 py-3 flex items-center justify-center gap-2 rounded-xl border-2 border-[#272B30] text-[15px] font-bold leading-6 tracking-[-0.15px] text-[#FCFCFC] opacity-30 hover:opacity-50 transition-opacity"
              >
                Skip for now
              </button>
              <button
                type="button"
                onClick={handleContinue}
                className="w-[200px] px-5 py-3 flex items-center justify-center gap-2 rounded-xl bg-[#FF634E] text-[15px] font-bold leading-6 tracking-[-0.15px] text-white/80 hover:bg-[#FF6A55] transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center py-5 w-full bg-black/80">
          <div className="flex items-center gap-4 w-full max-w-[640px] rounded-lg">
            <div className="flex items-center gap-0.5">
              <span className="w-[101.5px] text-right text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                Rider Digest
              </span>
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.7755 5.7757L16.4306 3.8103H17.5691L18.2242 5.7757L20.1896 6.43083V7.56925L18.2242 8.22438L17.5691 10.1898H16.4306L15.7755 8.22438L13.8101 7.56925V6.43083L15.7755 5.7757Z"
                  fill="#FB4CBA"
                />
                <path d="M17.9999 12V19H15.9999V12H17.9999Z" fill="#FB4CBA" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.33716 6.00004H10.6625L14.0328 19H11.9667L11.1889 16H6.8107L6.03292 19H3.9668L7.33716 6.00004ZM7.32921 14H10.6704L9.11493 8.00004H8.88477L7.32921 14Z"
                  fill="#FB4CBA"
                />
              </svg>
            </div>

            <div className="flex-1 h-1 relative">
              <div className="absolute inset-0 h-1 bg-white/25 rounded-full"></div>
              <div
                className="absolute inset-0 h-1 rounded-full"
                style={{
                  width: "65%",
                  background: "linear-gradient(to right, #FF4EBB, #5D018D)",
                }}
              ></div>
            </div>

            <span className="w-16 text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
              65%
            </span>
          </div>
          <p className="text-xs font-normal leading-[150%] text-white/25 text-center max-w-2xl mt-2">
            Analyzing venue compliance with your rider requirements — you can
            continue with the tour setup.
          </p>
        </div>
      </main>
    </div>
  );
}
