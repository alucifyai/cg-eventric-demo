import { useState } from "react";
import {
  ChevronDown,
  ArrowDown,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import Header from "@/components/Header";
import WizardSteps from "@/components/WizardSteps";

interface Venue {
  id: string;
  name: string;
  location: string;
  date: string;
  compliance: number;
  badges: {
    red: number;
    yellow: number;
    green: number;
  };
}

const venues: Venue[] = [
  {
    id: "1",
    name: "Madison Square Garden",
    location: "New York, NY",
    date: "Dec. 29 2025",
    compliance: 24,
    badges: { red: 2, yellow: 3, green: 48 },
  },
  {
    id: "2",
    name: "Madison Square Garden",
    location: "New York, NY",
    date: "Dec. 29 2025",
    compliance: 56,
    badges: { red: 0, yellow: 8, green: 48 },
  },
  {
    id: "3",
    name: "Madison Square Garden",
    location: "New York, NY",
    date: "Dec. 29 2025",
    compliance: 98,
    badges: { red: 0, yellow: 0, green: 64 },
  },
  {
    id: "4",
    name: "Madison Square Garden",
    location: "New York, NY",
    date: "Dec. 29 2025",
    compliance: 98,
    badges: { red: 0, yellow: 0, green: 64 },
  },
  {
    id: "5",
    name: "Madison Square Garden",
    location: "New York, NY",
    date: "Dec. 29 2025",
    compliance: 98,
    badges: { red: 0, yellow: 0, green: 64 },
  },
  {
    id: "6",
    name: "Madison Square Garden",
    location: "New York, NY",
    date: "Dec. 29 2025",
    compliance: 98,
    badges: { red: 0, yellow: 0, green: 64 },
  },
  {
    id: "7",
    name: "Madison Square Garden",
    location: "New York, NY",
    date: "Dec. 29 2025",
    compliance: 98,
    badges: { red: 0, yellow: 0, green: 64 },
  },
  {
    id: "8",
    name: "Madison Square Garden",
    location: "New York, NY",
    date: "Dec. 29 2025",
    compliance: 98,
    badges: { red: 0, yellow: 0, green: 64 },
  },
  {
    id: "9",
    name: "Madison Square Garden",
    location: "New York, NY",
    date: "Dec. 29 2025",
    compliance: 98,
    badges: { red: 0, yellow: 0, green: 64 },
  },
  {
    id: "10",
    name: "Madison Square Garden",
    location: "New York, NY",
    date: "Dec. 29 2025",
    compliance: 98,
    badges: { red: 0, yellow: 0, green: 64 },
  },
];

const getComplianceColor = (compliance: number) => {
  if (compliance < 40)
    return { bg: "#E34F2F", text: "#E34F2F", badge: "#E34F2F" };
  if (compliance < 80)
    return { bg: "#FFD600", text: "#F8BC3B", badge: "#F8BC3B" };
  return { bg: "#48FFA7", text: "#219464", badge: "#219464" };
};

export default function TourReview() {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalBadges = venues.reduce(
    (acc, venue) => ({
      red: acc.red + venue.badges.red,
      yellow: acc.yellow + venue.badges.yellow,
      green: acc.green + venue.badges.green,
    }),
    { red: 0, yellow: 0, green: 0 },
  );

  const handleOpenModal = (venue: Venue) => {
    setSelectedVenue(venue);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedVenue(null), 300);
  };

  const handlePrevVenue = () => {
    if (!selectedVenue) return;
    const currentIndex = venues.findIndex((v) => v.id === selectedVenue.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : venues.length - 1;
    setSelectedVenue(venues[prevIndex]);
  };

  const handleNextVenue = () => {
    if (!selectedVenue) return;
    const currentIndex = venues.findIndex((v) => v.id === selectedVenue.id);
    const nextIndex = currentIndex < venues.length - 1 ? currentIndex + 1 : 0;
    setSelectedVenue(venues[nextIndex]);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: `url('https://api.builder.io/api/v1/image/assets/TEMP/89d15c4b71b08e9b81eeb71e87e2358dc0d92c78?width=3360') center/cover no-repeat, #000`,
      }}
    >
      <div
        className="min-h-screen flex flex-col"
        style={{
          background: `url('https://api.builder.io/api/v1/image/assets/TEMP/98796f4748fdc937f255207f975506a7b4f8f7cb?width=3360') -31.416px 0px / 103.74% 100% no-repeat, linear-gradient(0deg, rgba(1, 3, 73, 0.30) 0%, rgba(1, 3, 73, 0.30) 100%), #000`,
          backgroundBlendMode: "screen, lighten, normal",
        }}
      >
        <Header />

        <main className="flex justify-center items-start w-full">
          <div className="w-full max-w-[1280px] px-6 py-6 flex flex-col items-start gap-6">
            <WizardSteps />

            <div className="flex items-center gap-6 w-full">
              <div className="flex flex-col justify-center items-start flex-1">
                <h1 className="text-[32px] font-bold leading-[125%] text-[#FCFCFC]">
                  Tour Review
                </h1>
                <p className="text-sm font-normal leading-5 tracking-[-0.28px] text-[#FCFCFC] opacity-60 max-w-[350px]">
                  Review the compliance status of your selected venues
                </p>
              </div>

              <div className="flex flex-col justify-center items-end flex-1">
                <span className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                  DeC. 21 - Dec. 29, 2025
                </span>
                <span className="text-sm font-normal leading-5 tracking-[-0.28px] text-[#FCFCFC] opacity-60 text-right">
                  Tour Dates
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2 w-full">
              <div className="flex items-center justify-center gap-2 w-full">
                <span className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white text-right">
                  Filter by:
                </span>

                {totalBadges.red > 0 && (
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E34F2F]">
                    <span className="text-[10px] font-semibold leading-[125%] tracking-[0.4px] uppercase text-[#111315]">
                      {totalBadges.red}
                    </span>
                  </div>
                )}

                {totalBadges.yellow > 0 && (
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#F8BC3B]">
                    <span className="text-[10px] font-semibold leading-[125%] tracking-[0.4px] uppercase text-[#111315]">
                      {totalBadges.yellow}
                    </span>
                  </div>
                )}

                {totalBadges.green > 0 && (
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#219464]">
                    <span className="text-[10px] font-semibold leading-[125%] tracking-[0.4px] uppercase text-[#111315]">
                      {totalBadges.green}
                    </span>
                  </div>
                )}

                <span className="flex-1 text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-right">
                  <span className="text-white/25">Sort by </span>
                  <span className="text-white">Compliance</span>
                </span>

                <ArrowDown className="w-6 h-6 text-white" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-4">
                {venues.map((venue, index) => {
                  const colors = getComplianceColor(venue.compliance);
                  return (
                    <div
                      key={venue.id}
                      className="flex flex-col justify-between items-start gap-2 p-6 bg-black/30 rounded-sm min-h-[160px]"
                    >
                      <div className="flex flex-col justify-between items-end flex-1 w-full gap-2">
                        <div className="flex justify-end items-start gap-4 w-full">
                          <div
                            className="flex items-center justify-center w-12 h-12 rounded-full"
                            style={{ backgroundColor: colors.bg }}
                          >
                            <span
                              className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase"
                              style={{ color: "#111315" }}
                            >
                              {venue.compliance}%
                            </span>
                          </div>

                          <div className="flex flex-col items-start gap-1 flex-1">
                            <div className="flex items-center justify-between w-full">
                              <span className="text-sm font-normal leading-5 tracking-[-0.28px] text-[#FCFCFC] opacity-20">
                                {venue.date}
                              </span>
                              <span
                                className="text-[10px] font-semibold leading-[125%] tracking-[0.4px] uppercase text-right"
                                style={{ color: colors.text }}
                              >
                                {venue.compliance}% Compliant
                              </span>
                            </div>

                            <div className="flex items-center justify-center gap-2 w-full">
                              <span className="flex-1 text-lg font-bold leading-[125%] text-white">
                                {venue.name}
                              </span>
                            </div>

                            <div className="flex items-start gap-2 w-full">
                              <span className="flex-1 text-base font-normal leading-[150%] text-white">
                                {venue.location}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between w-full">
                          <div
                            className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => handleOpenModal(venue)}
                          >
                            <ChevronDown className="w-6 h-6 text-white" />
                            <span className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                              summary
                            </span>
                          </div>

                          <div className="flex items-center gap-0 h-8 px-1 rounded-full">
                            {venue.badges.red > 0 && (
                              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E34F2F] border-2 border-[#333]">
                                <span className="text-[10px] font-semibold leading-[125%] tracking-[0.4px] uppercase text-[#111315]">
                                  {venue.badges.red}
                                </span>
                              </div>
                            )}
                            {venue.badges.yellow > 0 && (
                              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#F8BC3B] border-2 border-[#333]">
                                <span className="text-[10px] font-semibold leading-[125%] tracking-[0.4px] uppercase text-[#111315]">
                                  {venue.badges.yellow}
                                </span>
                              </div>
                            )}
                            {venue.badges.green > 0 && (
                              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#219464] border-2 border-[#333]">
                                <span className="text-[10px] font-semibold leading-[125%] tracking-[0.4px] uppercase text-[#111315]">
                                  {venue.badges.green}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center items-center gap-2 w-full">
              <button
                type="button"
                className="w-[200px] px-5 py-3 flex items-center justify-center gap-2 rounded-xl border-2 border-[#272B30] text-[15px] font-bold leading-6 tracking-[-0.15px] text-[#FCFCFC] hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                className="w-[200px] px-5 py-3 flex items-center justify-center gap-2 rounded-xl bg-[#FF634E] text-[15px] font-bold leading-6 tracking-[-0.15px] text-white/80 hover:bg-[#FF6A55] transition-colors"
              >
                Publish Tour
              </button>
            </div>
          </div>
        </main>

        {isModalOpen && selectedVenue && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0, 2, 29, 0.8)" }}
            onClick={handleCloseModal}
          >
            <div
              className="relative min-h-[480px] p-6 flex flex-col items-end gap-2 rounded-lg border border-white/20 bg-black shadow-[0_0_14px_-4px_rgba(0,0,0,0.05),0_32px_48px_-8px_rgba(0,0,0,0.10)] backdrop-blur-[16px]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-6 w-full">
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                    Venue Summary
                  </span>
                </div>
                <div className="w-[232px] h-10"></div>
                <button
                  onClick={handleCloseModal}
                  className="flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-[#6F767E]" />
                </button>
              </div>

              <div className="flex items-start gap-16 w-full">
                <div className="flex flex-col items-start w-[368px]">
                  <div className="w-full min-h-[160px] p-6 pb-4 flex flex-col justify-between items-start rounded-sm border border-[#272B30] bg-black">
                    <div className="flex flex-col justify-between items-end flex-1 w-full">
                      <div className="flex items-center gap-4 flex-1 w-full">
                        <div
                          className="flex items-center justify-center w-12 h-12 rounded-full"
                          style={{
                            backgroundColor: getComplianceColor(
                              selectedVenue.compliance,
                            ).bg,
                          }}
                        >
                          <span className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-[#111315]">
                            {selectedVenue.compliance}%
                          </span>
                        </div>

                        <div className="flex flex-col items-start gap-1 flex-1">
                          <div className="flex items-center justify-between w-full">
                            <span
                              className="text-[10px] font-semibold leading-[125%] tracking-[0.4px] uppercase text-right"
                              style={{
                                color: getComplianceColor(
                                  selectedVenue.compliance,
                                ).text,
                              }}
                            >
                              {selectedVenue.compliance}% Compliant
                            </span>
                            <span className="text-sm font-normal leading-5 tracking-[-0.28px] text-[#FCFCFC] opacity-20">
                              {selectedVenue.date}
                            </span>
                          </div>

                          <div className="flex items-center justify-center gap-2 w-full">
                            <span className="flex-1 text-lg font-bold leading-[125%] text-white">
                              {selectedVenue.name}
                            </span>
                          </div>

                          <div className="flex items-start gap-2 w-full">
                            <span className="flex-1 text-base font-normal leading-[150%] text-white">
                              {selectedVenue.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between w-full">
                        <button
                          onClick={handlePrevVenue}
                          className="flex items-center justify-center p-2 pt-0 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <ChevronLeft className="w-6 h-6 text-[#6F767E]" />
                        </button>
                        <button
                          onClick={handleNextVenue}
                          className="flex items-center justify-center p-2 pt-0 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <ChevronRight className="w-6 h-6 text-[#6F767E]" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="w-full px-6 py-4 flex flex-col items-start gap-5">
                    <div className="flex flex-col items-start gap-2 w-full">
                      <span className="text-xl font-semibold leading-8 tracking-[-0.4px] text-[#FCFCFC]">
                        Explanation
                      </span>
                      <p className="text-sm font-normal leading-[125%] text-[#EFEFEF]">
                        Madison Square Garden shows {selectedVenue.compliance}%
                        compliance with your requirements. This natural
                        amphitheater provides an unparalleled concert experience
                        with its unique geological acoustics. While the venue
                        offers stunning visuals and natural sound enhancement,
                        it has limitations in technical infrastructure and
                        weather dependency that may impact your specific needs.
                      </p>
                    </div>

                    <div className="flex items-center gap-0.5">
                      <svg
                        className="w-6 h-6"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.7755 5.77564L16.4306 3.81024H17.5691L18.2242 5.77564L20.1896 6.43077V7.56919L18.2242 8.22432L17.5691 10.1897H16.4306L15.7755 8.22432L13.8101 7.56919V6.43077L15.7755 5.77564Z"
                          fill="#FB4CBA"
                        />
                        <path
                          d="M17.9999 12V19H15.9999V12H17.9999Z"
                          fill="#FB4CBA"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.33716 5.99998H10.6625L14.0328 19H11.9667L11.1889 16H6.8107L6.03292 19H3.9668L7.33716 5.99998ZM7.32921 14H10.6704L9.11493 7.99998H8.88477L7.32921 14Z"
                          fill="#FB4CBA"
                        />
                      </svg>
                      <span className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                        Rider DIGEST
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-6 w-[408px]">
                  <div className="flex flex-col items-start gap-5 w-full">
                    <span className="text-xl font-semibold leading-8 tracking-[-0.4px] text-[#FCFCFC]">
                      Suggestions
                    </span>

                    <div className="flex flex-col items-start gap-3 w-full">
                      <div className="flex items-start gap-3 w-full">
                        <Check
                          className="w-6 h-6 text-[#219464] flex-shrink-0 mt-0.5"
                          strokeWidth={1}
                        />
                        <span className="flex-1 text-sm font-normal leading-[125%] text-[#EFEFEF]">
                          Invest in weather protection equipment and backup
                          power systems
                        </span>
                      </div>

                      <div className="h-px w-full rounded-full bg-[#272B30]"></div>

                      <div className="flex items-start gap-3 w-full">
                        <Check
                          className="w-6 h-6 text-[#219464] flex-shrink-0 mt-0.5"
                          strokeWidth={1}
                        />
                        <span className="flex-1 text-sm font-normal leading-[125%] text-[#EFEFEF]">
                          Work with venue to enhance technical infrastructure
                          for your specific needs
                        </span>
                      </div>

                      <div className="h-px w-full rounded-full bg-[#272B30]"></div>

                      <div className="flex items-start gap-3 w-full">
                        <Check
                          className="w-6 h-6 text-[#219464] flex-shrink-0 mt-0.5"
                          strokeWidth={1}
                        />
                        <span className="flex-1 text-sm font-normal leading-[125%] text-[#EFEFEF]">
                          Plan for altitude considerations and artist comfort
                          accommodations
                        </span>
                      </div>

                      <div className="h-px w-full rounded-full bg-[#272B30]"></div>

                      <div className="flex items-start gap-3 w-full">
                        <Check
                          className="w-6 h-6 text-[#219464] flex-shrink-0 mt-0.5"
                          strokeWidth={1}
                        />
                        <span className="flex-1 text-sm font-normal leading-[125%] text-[#EFEFEF]">
                          Consider acoustic consulting to maximize the natural
                          sound benefit
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-end gap-4 flex-1 w-full mt-auto">
                    <button
                      type="button"
                      className="flex-1 px-4 py-2 flex items-center justify-center gap-2 rounded-lg bg-[#FF634E] text-[13px] font-bold leading-6 tracking-[-0.13px] text-[#FCFCFC] hover:bg-[#FF6A55] transition-colors"
                    >
                      See Full Analysis
                    </button>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="flex-1 px-4 py-2 flex items-center justify-center gap-2 rounded-lg border-2 border-[#272B30] text-[13px] font-bold leading-6 tracking-[-0.13px] text-[#FCFCFC] hover:bg-white/5 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
