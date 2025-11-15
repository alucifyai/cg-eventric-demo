import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronUp, Edit2, RotateCw, X } from "lucide-react";
import Header from "@/components/Header";
import WizardSteps from "@/components/WizardSteps";
import RiderSidebar from "@/components/RiderSidebar";

interface RiderItem {
  id: string;
  code: string;
  title: string;
  description: string;
  isEditing?: boolean;
}

const equipmentItems: RiderItem[] = [
  {
    id: "audio",
    code: "01.1",
    title: "Audio",
    description: "Full PA system with 32-channel mixing board",
  },
  {
    id: "backline",
    code: "01.2",
    title: "Backline",
    description: "Full PA system with 32-channel mixing board",
  },
  {
    id: "lighting",
    code: "01.3",
    title: "Lighting",
    description: "Full PA system with 32-channel mixing board",
  },
  {
    id: "staging",
    code: "01.4",
    title: "Staging",
    description: "40ft x 20ft stage with risers",
  },
  {
    id: "video",
    code: "01.4",
    title: "Video",
    description:
      "LED backdrop screens Nullam quis risus eget urna mollis ornare vel eu leo. Maecenas sed diam eget risus varius blandit sit amet non magna. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.",
    isEditing: true,
  },
  {
    id: "other",
    code: "01.5",
    title: "Other / Misc",
    description:
      "Special effects equipment and pyrotechnics setup — etiam porta sem malesuada magna mollis euismod.",
  },
];

export default function RiderValidation() {
  const navigate = useNavigate();
  const [items, setItems] = useState(equipmentItems);
  const [editTexts, setEditTexts] = useState<Record<string, string>>(
    equipmentItems.reduce(
      (acc, item) => {
        acc[item.id] = item.description;
        return acc;
      },
      {} as Record<string, string>,
    ),
  );

  const handleContinue = () => {
    navigate("/tour-review");
  };

  const handleEditClick = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isEditing: true } : item,
      ),
    );
  };

  const handleUpdate = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, description: editTexts[id], isEditing: false }
          : item,
      ),
    );
  };

  const handleCancel = (id: string) => {
    setEditTexts((prev) => ({
      ...prev,
      [id]: items.find((item) => item.id === id)?.description || "",
    }));
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isEditing: false } : item,
      ),
    );
  };

  const handleTextChange = (id: string, value: string) => {
    setEditTexts((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: `url('https://api.builder.io/api/v1/image/assets/TEMP/92e7ccf47438de89b48e9367e61ba1e6665a3f63?width=3360') center/cover no-repeat, linear-gradient(0deg, rgba(1, 3, 73, 0.30) 0%, rgba(1, 3, 73, 0.30) 100%), #000`,
        backgroundBlendMode: "screen, lighten, normal",
      }}
    >
      <Header />

      <main className="flex justify-center items-start w-full">
        <div className="w-full max-w-[1280px] px-6 py-6 flex flex-col items-start gap-6">
          <WizardSteps />

          <div className="flex items-center gap-4 w-full">
            <div className="flex flex-col justify-center items-start flex-1">
              <h1 className="text-[32px] font-bold leading-[125%] text-[#FCFCFC]">
                Rider Validation
              </h1>
              <p className="text-sm font-normal leading-5 tracking-[-0.28px] text-[#FCFCFC] opacity-60">
                [ name of the tour goes here ]
              </p>
            </div>

            <div className="flex flex-col justify-center items-end opacity-60">
              <span className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                Tour Rider
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal leading-5 tracking-[-0.28px] text-[#FCFCFC]">
                  tech_rider_file_name.PDF
                </span>
                <span className="text-sm font-normal leading-5 tracking-[-0.28px] text-[#FCFCFC]">
                  ·
                </span>
                <span className="text-sm font-normal leading-5 tracking-[-0.28px] text-[#FCFCFC]">
                  1.45 Mb
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center items-end">
              <div className="flex items-center justify-end gap-2 px-6 py-2 bg-black/25 rounded-lg cursor-pointer hover:bg-black/40 transition-colors">
                <span className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                  Update
                </span>
                <RotateCw className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-6 w-full">
            <RiderSidebar />

            <div className="flex-1 flex flex-col gap-8">
              <div className="flex flex-col items-start gap-0.5 w-full">
                <div className="flex items-center justify-center gap-2 px-4 py-2 w-full">
                  <span className="flex-1 text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                    01 Equipment
                  </span>
                  <span className="flex-1 text-right text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                    5 topics
                  </span>
                  <ChevronUp className="w-6 h-6 text-white" />
                </div>

                {items.map((item) => (
                  <div key={item.id} className="w-full">
                    {item.isEditing ? (
                      <div className="flex flex-col items-start gap-2 p-4 bg-black/50 rounded-sm w-full">
                        <div className="flex items-center justify-center gap-2 w-full">
                          <span className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white opacity-20">
                            {item.code}
                          </span>
                          <span className="text-lg font-bold leading-[125%] text-white">
                            {item.title}
                          </span>
                          <div className="w-4 h-4 bg-[#B5E4CA] rounded"></div>
                          <span className="flex-1 text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                            Edit Description
                          </span>
                        </div>

                        <div className="flex flex-col items-end gap-18 p-6 w-full">
                          <div className="flex flex-col items-start gap-6 w-full">
                            <textarea
                              value={editTexts[item.id]}
                              onChange={(e) =>
                                handleTextChange(item.id, e.target.value)
                              }
                              className="w-full min-h-[100px] bg-transparent text-white font-light leading-[150%] opacity-60 outline-none resize-none"
                              style={{
                                fontFamily: "IBM Plex Mono, monospace",
                                fontSize: "16px",
                              }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-4 w-full">
                          <div
                            onClick={() => handleUpdate(item.id)}
                            className="flex items-center justify-end gap-2 px-6 py-2 bg-[#FF634E] rounded-lg cursor-pointer hover:bg-[#FF6A55] transition-colors"
                          >
                            <span className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white/80">
                              Update
                            </span>
                            <RotateCw className="w-4 h-4 text-white/80" />
                          </div>
                          <div
                            onClick={() => handleCancel(item.id)}
                            className="flex items-center justify-end gap-2 px-6 py-2 bg-black rounded-lg cursor-pointer hover:bg-black/80 transition-colors"
                          >
                            <span className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                              Cancel Changes
                            </span>
                            <X className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-start gap-2 p-4 bg-black/[0.08] rounded-sm w-full">
                        <div className="flex items-center justify-center gap-2 w-full">
                          <span className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white opacity-20">
                            {item.code}
                          </span>
                          <span className="flex-1 text-lg font-bold leading-[125%] text-white">
                            {item.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 w-full">
                          <span className="flex-1 text-base font-normal leading-[150%] text-white/60">
                            {item.description}
                          </span>
                          <div
                            onClick={() => handleEditClick(item.id)}
                            className="flex items-center justify-end gap-2 opacity-20 hover:opacity-100 transition-opacity cursor-pointer"
                          >
                            <span className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                              Edit
                            </span>
                            <Edit2 className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-start gap-0.5 w-full opacity-30">
                <div className="flex items-center justify-center gap-4 px-4 py-2 w-full">
                  <span className="flex-1 text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white opacity-30">
                    02 Facilities
                  </span>
                  <span className="flex-1 text-right text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white opacity-10">
                    xx topics
                  </span>
                  <div className="w-4 h-4 bg-black/25 border-2 border-black/25 rounded flex items-center justify-center">
                    <ChevronUp className="w-3 h-3 text-white/60" />
                  </div>
                </div>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex flex-col items-start p-4 bg-black/[0.08] border border-black/20 rounded-sm w-full"
                  >
                    <div className="flex items-center justify-center gap-2 w-full">
                      <span className="flex-1 text-lg font-bold leading-[125%] text-white opacity-10">
                        ·····
                      </span>
                      <span className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                        03.2
                      </span>
                    </div>
                    <div className="flex items-start gap-2 w-full">
                      <span className="flex-1 text-base font-normal leading-[150%] text-white opacity-10">
                        ····
                      </span>
                      <span className="flex-1 text-base font-normal leading-[150%] text-white opacity-10">
                        add comments
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-start gap-0.5 w-full opacity-30">
                <div className="flex items-center justify-center gap-4 px-4 py-2 w-full">
                  <span className="flex-1 text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white opacity-30">
                    03 Information
                  </span>
                  <span className="flex-1 text-right text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white opacity-10">
                    xx topics
                  </span>
                  <div className="w-4 h-4 bg-black/25 border-2 border-black/25 rounded flex items-center justify-center">
                    <ChevronUp className="w-3 h-3 text-white/60" />
                  </div>
                </div>
                <div className="flex flex-col items-start p-4 bg-black/[0.08] rounded-sm w-full">
                  <div className="flex items-center justify-center gap-2 w-full">
                    <span className="flex-1 text-lg font-bold leading-[125%] text-white">
                      WiFi SSID:
                    </span>
                    <span className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                      03.1
                    </span>
                  </div>
                  <div className="flex items-start gap-2 w-full">
                    <span className="flex-1 text-base font-normal leading-[150%] text-white">
                      Morbi leo risus, porta ac consectetur ac, vestibulum at
                      eros.
                    </span>
                    <span className="flex-1 text-base font-normal leading-[150%] text-white">
                      Curabitur blandit tempus porttitor.
                    </span>
                  </div>
                </div>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex flex-col items-start p-4 bg-black/[0.08] rounded-sm w-full"
                  >
                    <div className="flex items-center justify-center gap-2 w-full">
                      <span className="flex-1 text-lg font-bold leading-[125%] text-white opacity-10">
                        ·····
                      </span>
                      <span className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                        {i === 3 ? "0x.X" : "03.2"}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 w-full">
                      <span className="flex-1 text-base font-normal leading-[150%] text-white opacity-10">
                        {i === 3
                          ? "·················��·················"
                          : "····"}
                      </span>
                      <span className="flex-1 text-base font-normal leading-[150%] text-white opacity-10">
                        add comments
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-start gap-0.5 w-full opacity-30">
                <div className="flex items-center justify-center gap-4 px-4 py-2 w-full">
                  <span className="flex-1 text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white opacity-30">
                    04 Parking
                  </span>
                  <span className="flex-1 text-right text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white opacity-10">
                    xx topics
                  </span>
                  <div className="w-4 h-4 bg-black/25 border-2 border-black/25 rounded flex items-center justify-center">
                    <ChevronUp className="w-3 h-3 text-white/60" />
                  </div>
                </div>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex flex-col items-start p-4 bg-black/[0.08] border border-black/20 rounded-sm w-full"
                  >
                    <div className="flex items-center justify-center gap-2 w-full">
                      <span className="flex-1 text-lg font-bold leading-[125%] text-white opacity-10">
                        ·····
                      </span>
                      <span className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                        {i === 3 ? "0x.X" : "03.2"}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 w-full">
                      <span className="flex-1 text-base font-normal leading-[150%] text-white opacity-10">
                        {i === 3
                          ? "···································"
                          : "····"}
                      </span>
                      <span className="flex-1 text-base font-normal leading-[150%] text-white opacity-10">
                        add comments
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-start gap-0.5 w-full opacity-30">
                <div className="flex items-center justify-center gap-4 px-4 py-2 w-full">
                  <span className="flex-1 text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white opacity-30">
                    05 Local Crew
                  </span>
                  <span className="flex-1 text-right text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white opacity-10">
                    14 topics
                  </span>
                  <div className="w-4 h-4 bg-black/25 border-2 border-black/25 rounded flex items-center justify-center">
                    <ChevronUp className="w-3 h-3 text-white/60" />
                  </div>
                </div>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex flex-col items-start p-4 bg-black/[0.08] border border-black/20 rounded-sm w-full"
                  >
                    <div className="flex items-center justify-center gap-2 w-full">
                      <span className="flex-1 text-lg font-bold leading-[125%] text-white opacity-10">
                        ·····
                      </span>
                      <span className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                        {i === 4 ? "0x.X" : "03.2"}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 w-full">
                      <span className="flex-1 text-base font-normal leading-[150%] text-white opacity-10">
                        {i === 4
                          ? "···································"
                          : "····"}
                      </span>
                      <span className="flex-1 text-base font-normal leading-[150%] text-white opacity-10">
                        add comments
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-start gap-0.5 w-full">
                <div className="flex items-center justify-center gap-4 px-4 py-2 w-full">
                  <span className="flex-1 text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                    06 Logistics
                  </span>
                  <span className="flex-1 text-right text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white opacity-10">
                    14 topics
                  </span>
                  <div className="w-4 h-4 bg-black/25 border-2 border-black/25 rounded flex items-center justify-center">
                    <ChevronUp className="w-3 h-3 text-white/60" />
                  </div>
                </div>
                <div className="flex flex-col items-start p-4 bg-black/[0.08] border border-black/20 rounded-sm w-full">
                  <div className="flex items-center justify-center gap-2 w-full">
                    <span className="flex-1 text-lg font-bold leading-[125%] text-white opacity-10">
                      ·····
                    </span>
                    <span className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                      0x.X
                    </span>
                  </div>
                  <div className="flex items-start gap-2 w-full">
                    <span className="flex-1 text-lg font-bold leading-[125%] text-white opacity-10">
                      ···································
                    </span>
                    <span className="flex-1 text-base font-normal leading-[150%] text-white opacity-10">
                      add comments
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-0.5 w-full">
                <div className="flex items-center justify-center gap-4 px-4 py-2 w-full">
                  <span className="flex-1 text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                    07 Production
                  </span>
                  <span className="flex-1 text-right text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white opacity-10">
                    14 topics
                  </span>
                  <div className="w-4 h-4 bg-black/25 border-2 border-black/25 rounded flex items-center justify-center">
                    <ChevronUp className="w-3 h-3 text-white/60" />
                  </div>
                </div>
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex flex-col items-start p-4 bg-black/[0.08] border border-black/20 rounded-sm w-full"
                  >
                    <div className="flex items-center justify-center gap-2 w-full">
                      <span className="flex-1 text-lg font-bold leading-[125%] text-white opacity-10">
                        ·····
                      </span>
                      <span className="text-xs font-semibold leading-[125%] tracking-[0.96px] uppercase text-white">
                        {i === 2 ? "0x.X" : "03.2"}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 w-full">
                      <span className="flex-1 text-base font-normal leading-[150%] text-white opacity-10">
                        {i === 2
                          ? "···································"
                          : "····"}
                      </span>
                      <span className="flex-1 text-base font-normal leading-[150%] text-white opacity-10">
                        add comments
                      </span>
                    </div>
                  </div>
                ))}
              </div>
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
              onClick={handleContinue}
              className="w-[200px] px-5 py-3 flex items-center justify-center gap-2 rounded-xl bg-[#FF634E] text-[15px] font-bold leading-6 tracking-[-0.15px] text-white/80 hover:bg-[#FF6A55] transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
