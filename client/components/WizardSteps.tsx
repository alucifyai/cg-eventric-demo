import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Create Tour", path: "/", completed: false },
  { id: 2, label: "Select Venues", path: "/select-venues", completed: false },
  {
    id: 3,
    label: "Rider Validation",
    path: "/rider-validation",
    hasIcon: true,
    completed: false,
  },
  { id: 4, label: "Tour Review", path: "/tour-review", completed: false },
];

export default function WizardSteps() {
  const location = useLocation();

  const getCurrentStepId = () => {
    const currentStep = steps.find((s) => s.path === location.pathname);
    return currentStep?.id || 1;
  };

  const currentStepId = getCurrentStepId();

  return (
    <div className="flex items-center justify-center gap-6 w-full pb-12">
      {steps.map((step) => {
        const isActive = location.pathname === step.path;
        const isCompleted = step.id < currentStepId;

        return (
          <Link
            key={step.id}
            to={step.path}
            className={cn(
              "flex items-center gap-2 px-6 py-4 flex-1 transition-all text-[13px] font-bold leading-6 tracking-[-0.13px]",
              isActive
                ? "bg-[#FF634E] text-[#FCFCFC] rounded-[48px]"
                : isCompleted
                  ? "bg-white/25 text-[#FCFCFC] rounded-[32px]"
                  : "bg-black/25 text-[#FCFCFC] rounded-[32px]",
            )}
          >
            {step.hasIcon && (
              <svg
                className="w-4 h-4 fill-white flex-shrink-0"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.8087 1.96539L12.4638 0H13.6023L14.2574 1.96539L16.2228 2.62053V3.75895L14.2574 4.41408L13.6023 6.37947H12.4638L11.8087 4.41408L9.84332 3.75895V2.62053L11.8087 1.96539Z" />
                <path d="M14.0331 8.18974V15.1897H12.0331V8.18974H14.0331Z" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.37037 2.18974H6.69575L10.066 15.1897H7.99989L7.22214 12.1897H2.8439L2.06612 15.1897H0L3.37037 2.18974ZM3.36242 10.1897H6.70364L5.14813 4.18974H4.91797L3.36242 10.1897Z"
                />
              </svg>
            )}
            <span className="flex-1">{step.label}</span>
            {isCompleted ? (
              <svg
                className="w-4 h-4 flex-shrink-0"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 6.33333L7 10L5.66667 8.66667M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
                  stroke="#83BF6E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 opacity-10 flex-shrink-0"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.1">
                  <path
                    d="M10 6.33333L7 10L5.66667 8.66667M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
                    stroke="#83BF6E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            )}
          </Link>
        );
      })}
    </div>
  );
}
