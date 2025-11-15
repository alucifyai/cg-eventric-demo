interface Venue {
  date: string;
  name: string;
  address: string;
}

const mockVenues: Venue[] = [
  {
    date: "02 / 12",
    name: "San Diego Symphony",
    address: "Pioneertown, CA US",
  },
  {
    date: "03 / 12",
    name: "San Diego Symphony",
    address: "Pioneertown, CA US",
  },
  { date: "04 / 12", name: "Roseland Theater", address: "Hamilton, ON CA" },
  { date: "05 / 12", name: "FirstOntario Centre", address: "Seattle, WA US" },
  { date: "06 / 12", name: "FirstOntario Centre", address: "Seattle, WA US" },
];

export default function VenueList() {
  return (
    <div className="flex flex-col items-start w-full max-w-[240px]">
      {mockVenues.map((venue, index) => (
        <div key={index} className="flex flex-col w-full">
          <div className="h-px w-full bg-white/25 opacity-20 rounded-full"></div>
          <div className="flex items-center gap-2 py-3 px-2">
            <div className="flex items-center gap-1 w-12 py-1">
              <span className="text-xs font-semibold leading-[150%] text-[#9A9FA5]">
                {venue.date}
              </span>
            </div>
            <div className="flex flex-col items-start flex-1">
              <div className="flex flex-col items-start w-full">
                <span className="text-[15px] font-bold leading-6 tracking-[-0.15px] text-[#FCFCFC]">
                  {venue.name}
                </span>
              </div>
              <div className="flex flex-col items-start w-full">
                <span className="text-xs font-normal leading-[150%] text-[#6F767E]">
                  {venue.address}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="h-px w-full bg-white/25 opacity-20 rounded-full"></div>
    </div>
  );
}
