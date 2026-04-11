import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";

interface TourStep {
  target: string; // data-tour attribute value
  title: string;
  description: string;
  position: "bottom" | "top" | "right";
}

const tourSteps: TourStep[] = [
  {
    target: "lifecycle-strip",
    title: "Bygningens livssyklus",
    description:
      "Naviger mellom de 5 fasene i bygningens levetid — fra design til redesign. Klikk på en fase for å utforske.",
    position: "bottom",
  },
  {
    target: "kpi-section",
    title: "Nøkkeltall",
    description:
      "Her ser du de viktigste KPI-ene for valgt fase: score, risikoer og besparelser — alt basert på simulering.",
    position: "bottom",
  },
  {
    target: "insight-box",
    title: "VirtualHouse Insight",
    description:
      "En AI-generert oppsummering som forklarer hva dataene betyr, og hva du bør fokusere på.",
    position: "bottom",
  },
  {
    target: "detail-section",
    title: "Detaljert analyse",
    description:
      "Dykk dypere inn i dataene: designproblemer, testresultater, anomalier eller oppgraderingsscenarioer.",
    position: "top",
  },
];

const STORAGE_KEY = "vh-tour-completed";

const OnboardingTour = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0, width: 0 });
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);

  // Show tour on first visit
  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      const timer = setTimeout(() => setIsActive(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const updatePosition = useCallback(() => {
    const step = tourSteps[currentStep];
    const el = document.querySelector(`[data-tour="${step.target}"]`);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    setHighlightRect(rect);

    const tooltipWidth = Math.min(360, window.innerWidth - 32);
    let top: number;
    let left: number;

    if (step.position === "bottom") {
      top = rect.bottom + 12;
      left = rect.left + rect.width / 2 - tooltipWidth / 2;
    } else if (step.position === "top") {
      top = rect.top - 12 - 160;
      left = rect.left + rect.width / 2 - tooltipWidth / 2;
    } else {
      top = rect.top;
      left = rect.right + 12;
    }

    // Keep on screen
    left = Math.max(16, Math.min(left, window.innerWidth - tooltipWidth - 16));
    top = Math.max(16, top);

    setTooltipPos({ top, left, width: tooltipWidth });
  }, [currentStep]);

  useEffect(() => {
    if (!isActive) return;
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isActive, currentStep, updatePosition]);

  const close = () => {
    setIsActive(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  const next = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      close();
    }
  };

  const prev = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const step = tourSteps[currentStep];

  if (!isActive) return null;

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9998]"
        style={{ pointerEvents: "none" }}
      >
        {/* Dark overlay with cutout */}
        <svg className="absolute inset-0 h-full w-full" style={{ pointerEvents: "auto" }}>
          <defs>
            <mask id="tour-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              {highlightRect && (
                <rect
                  x={highlightRect.left - 8}
                  y={highlightRect.top - 8}
                  width={highlightRect.width + 16}
                  height={highlightRect.height + 16}
                  rx="12"
                  fill="black"
                />
              )}
            </mask>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="hsla(216, 45%, 5%, 0.75)"
            mask="url(#tour-mask)"
            onClick={close}
          />
        </svg>

        {/* Highlight border */}
        {highlightRect && (
          <motion.div
            layoutId="highlight"
            className="absolute rounded-xl border-2 border-primary/60 shadow-[0_0_30px_hsl(185_70%_50%/0.2)]"
            style={{
              top: highlightRect.top - 8,
              left: highlightRect.left - 8,
              width: highlightRect.width + 16,
              height: highlightRect.height + 16,
              pointerEvents: "none",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="fixed z-[9999] rounded-xl border border-border bg-card p-5 shadow-2xl"
          style={{
            top: tooltipPos.top,
            left: tooltipPos.left,
            width: tooltipPos.width,
          }}
        >
          {/* Close button */}
          <button
            onClick={close}
            className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Content */}
          <div className="mb-1 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
              Steg {currentStep + 1} av {tourSteps.length}
            </span>
          </div>
          <h3 className="mb-1.5 text-base font-bold text-foreground">{step.title}</h3>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            {step.description}
          </p>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={prev}
              disabled={currentStep === 0}
              className="flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Forrige
            </button>

            {/* Dots */}
            <div className="flex gap-1.5">
              {tourSteps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentStep
                      ? "w-4 bg-primary"
                      : i < currentStep
                      ? "w-1.5 bg-primary/40"
                      : "w-1.5 bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {currentStep === tourSteps.length - 1 ? "Fullfør" : "Neste"}
              {currentStep < tourSteps.length - 1 && <ChevronRight className="h-3.5 w-3.5" />}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default OnboardingTour;
