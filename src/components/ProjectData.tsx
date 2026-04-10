import { useState } from "react";
import { FileText, Upload, CheckCircle2, Clock, X, Sparkles, Loader2, ScrollText, Settings, MessageSquare } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const documents = [
  { name: "funksjonsbeskrivelse_parkveien.pdf", params: 42, status: "parsed" as const },
  { name: "tegningsgrunnlag_VVS_rev3.pdf", params: 28, status: "parsed" as const },
  { name: "energiberegning_simien.csv", params: 64, status: "parsed" as const },
  { name: "BIM_arkitekt_parkveien.ifc", params: 156, status: "parsed" as const },
  { name: "driftslogg_2024_Q1-Q3.xlsx", params: 31, status: "parsed" as const },
  { name: "sdanlegg_punktliste.xlsx", params: 89, status: "parsed" as const },
  { name: "sdanlegg_trendeksport_mars.csv", params: null, status: "processing" as const },
];

const suggestedQuestions = [
  "Hva er dimensjonerende utetemperatur for Oslo?",
  "Er ventilasjonsanlegget TEK17-kompatibelt?",
  "Hva er estimert energibruk per m²?",
  "Hvilke designkonflikter er funnet?",
];

type PanelType = "files" | "log" | "settings" | "ask" | null;

const ProjectData = () => {
  const [activePanel, setActivePanel] = useState<PanelType>(null);
  const [uploading, setUploading] = useState(false);

  const toggle = (panel: PanelType) => setActivePanel(prev => prev === panel ? null : panel);

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => setUploading(false), 2200);
  };

  const tabs = [
    { id: "files" as const, icon: FileText, label: `Filer (${documents.length})` },
    { id: "log" as const, icon: ScrollText, label: "Logg" },
    { id: "settings" as const, icon: Settings, label: "Innstillinger" },
    { id: "ask" as const, icon: Sparkles, label: "Spør VH" },
  ];

  return (
    <>
      {/* Tab row */}
      <div className="flex items-center gap-1">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activePanel === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => toggle(tab.id)}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] transition-all ${
                isActive
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-3 w-3" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <AnimatePresence>
        {activePanel && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setActivePanel(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 right-0 z-50 mt-2 rounded-lg border border-border bg-card shadow-lg"
              style={{ maxWidth: activePanel === "ask" ? 520 : 440 }}
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <span className="text-xs font-semibold text-foreground">
                  {activePanel === "files" && "Datagrunnlag"}
                  {activePanel === "log" && "Aktivitetslogg"}
                  {activePanel === "settings" && "Prosjektinnstillinger"}
                  {activePanel === "ask" && "Spør VirtualHouse"}
                </span>
                <button onClick={() => setActivePanel(null)} className="rounded p-0.5 text-muted-foreground hover:text-foreground">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="p-4">
                {activePanel === "files" && (
                  <>
                    <div className="space-y-1">
                      {documents.map((doc, i) => (
                        <div key={i} className="flex items-center gap-3 rounded px-3 py-2 transition-colors hover:bg-secondary/30">
                          <FileText className="h-3.5 w-3.5 shrink-0 text-primary/60" />
                          <span className="flex-1 truncate text-sm text-foreground">{doc.name}</span>
                          {doc.status === "parsed" ? (
                            <span className="flex items-center gap-1 text-[10px] text-success">
                              <CheckCircle2 className="h-3 w-3" />
                              {doc.params}
                            </span>
                          ) : (
                            <Clock className="h-3 w-3 animate-pulse text-warning" />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground/50">
                        <Sparkles className="h-3 w-3" />
                        AI-analysert
                      </span>
                      <AnimatePresence mode="wait">
                        {uploading ? (
                          <motion.span key="spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 text-[11px] text-primary">
                            <Loader2 className="h-3 w-3 animate-spin" /> Analyserer…
                          </motion.span>
                        ) : (
                          <motion.button key="btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleUpload} className="flex items-center gap-1.5 rounded border border-border px-2.5 py-1 text-[11px] text-muted-foreground hover:bg-secondary hover:text-foreground">
                            <Upload className="h-3 w-3" /> Last opp
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                )}

                {activePanel === "log" && (
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex justify-between"><span>SIMIEN-fil analysert — 64 parametere</span><span className="text-[10px]">i dag</span></div>
                    <div className="flex justify-between"><span>VVS-tegninger lastet opp</span><span className="text-[10px]">14. mar</span></div>
                    <div className="flex justify-between"><span>FBD parsert — 42 parametere</span><span className="text-[10px]">12. mar</span></div>
                    <div className="flex justify-between"><span>Prosjekt opprettet</span><span className="text-[10px]">10. mar</span></div>
                  </div>
                )}

                {activePanel === "settings" && (
                  <div className="space-y-3 text-xs text-muted-foreground">
                    <div className="flex justify-between"><span>Klimasone</span><span className="font-medium text-foreground">Oslo</span></div>
                    <div className="flex justify-between"><span>Standard (TEK)</span><span className="font-medium text-foreground">TEK17</span></div>
                    <div className="flex justify-between"><span>Simuleringsperiode</span><span className="font-medium text-foreground">2024–2034</span></div>
                    <div className="flex justify-between"><span>Beregningsmotor</span><span className="font-medium text-foreground">VH Core v2.1</span></div>
                  </div>
                )}

                {activePanel === "ask" && (
                  <div className="space-y-2">
                    {suggestedQuestions.map((q, i) => (
                      <button
                        key={i}
                        className="w-full rounded-md border border-border px-3 py-2 text-left text-xs text-foreground transition-colors hover:bg-secondary/30"
                      >
                        {q}
                      </button>
                    ))}
                    <div className="mt-2 flex items-center gap-2 rounded-md border border-border px-3 py-2">
                      <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Spør om hva som helst…</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectData;
