import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface SidebarSection {
  id: string;
  label: string;
  icon?: string;
  subsections?: string[];
}

const sections: SidebarSection[] = [
  {
    id: "equipment",
    label: "Equipment",
    subsections: ["Audio", "Backline", "Lighting", "Staging", "Video", "Other"],
  },
  { id: "facilities", label: "Facilities" },
  { id: "information", label: "Information" },
  { id: "parking", label: "Parking" },
  { id: "local-crew", label: "Local Crew" },
  { id: "logistics", label: "Logistics" },
  { id: "production", label: "Production" },
];

export default function RiderSidebar() {
  const [expandedSection, setExpandedSection] = useState("equipment");

  return (
    <div className="flex flex-col items-start w-60">
      <div className="flex flex-col items-start w-full">
        {sections.map((section, index) => (
          <div key={section.id} className="w-full">
            <button
              onClick={() =>
                setExpandedSection(
                  expandedSection === section.id ? "" : section.id,
                )
              }
              className={`flex items-center justify-between w-full px-3 py-2 rounded-xl ${
                expandedSection === section.id
                  ? "bg-white/80 border border-white"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`rounded-full border-white/25 ${
                    expandedSection === section.id
                      ? "w-3 h-3 border-[3px]"
                      : "w-3 h-3 border-4"
                  }`}
                ></div>
                <span
                  className={`text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase ${
                    expandedSection === section.id
                      ? "text-black/80"
                      : "text-white"
                  }`}
                >
                  {section.label}
                </span>
              </div>
              {section.subsections ? (
                expandedSection === section.id ? (
                  <ChevronUp
                    className={`w-4 h-4 ${
                      expandedSection === section.id
                        ? "text-black/50"
                        : "text-white"
                    }`}
                  />
                ) : (
                  <ChevronDown
                    className={`w-4 h-4 ${
                      expandedSection === section.id
                        ? "text-black/50"
                        : "text-white"
                    }`}
                  />
                )
              ) : (
                <ChevronDown
                  className={`w-4 h-4 ${
                    expandedSection === section.id
                      ? "text-black/50"
                      : "text-white"
                  }`}
                />
              )}
            </button>

            {section.subsections && expandedSection === section.id && (
              <div className="flex flex-col pb-5">
                {section.subsections.map((sub) => (
                  <div
                    key={sub}
                    className="flex items-start h-[30px] justify-start"
                  >
                    <div className="w-9 h-12 relative">
                      <div className="w-0.5 h-[14px] bg-[#3C3C3C] absolute left-6 top-0 rounded-t-sm"></div>
                      <svg
                        className="absolute left-6 top-3 w-3 h-3"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1V5C1 9.41828 4.58172 13 9 13H13"
                          stroke="#3C3C3C"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 py-3 px-3">
                      <span className="text-sm font-normal leading-5 tracking-[-0.28px] text-white/60">
                        {sub}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
