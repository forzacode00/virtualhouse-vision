import { useState, useRef } from "react";
import { FileText, Upload, CheckCircle2, Clock, X, Sparkles, Loader2, ScrollText, Settings, MessageSquare, Send, Bot, FileSpreadsheet, Box, FileType } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const fileIcon = (name: string) => {
  const ext = name.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return <FileText className="h-3.5 w-3.5 shrink-0 text-destructive/70" />;
  if (ext === "csv") return <FileType className="h-3.5 w-3.5 shrink-0 text-success/70" />;
  if (ext === "xlsx" || ext === "xls") return <FileSpreadsheet className="h-3.5 w-3.5 shrink-0 text-success/70" />;
  if (ext === "ifc") return <Box className="h-3.5 w-3.5 shrink-0 text-primary/70" />;
  return <FileText className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />;
};

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

const simulatedResponses: Record<string, string> = {
  "Hva er dimensjonerende utetemperatur for Oslo?": "Dimensjonerende utetemperatur (DUT) for Oslo er **-21.8 °C** iht. NS-EN 12831. Denne verdien er automatisk hentet basert på klimasone og brukes i varmetapsberegningene.",
  "Er ventilasjonsanlegget TEK17-kompatibelt?": "SFP-verdien er satt til **≤ 1.5 kW/(m³/s)** som tilfredsstiller TEK17 §14-3. Varmegjenvinning er ≥ 80%. Imidlertid er VAV-minimumslufting for høy i nattmodus — dette gir 12% unødvendig energibruk.",
  "Hva er estimert energibruk per m²?": "Opprinnelig design: **116 kWh/m²·år**. Etter VH-optimalisering: **108 kWh/m²·år**. TEK17-grensen er 115 kWh/m²·år. Optimaliseringen sparer ca. **NOK 72 000/år**.",
  "Hvilke designkonflikter er funnet?": "3 konflikter identifisert:\n1. Samtidig oppvarming/kjøling i soner 3-5 (KRITISK — NOK 89 000/år)\n2. Varmepumpe underdimensjonert for spissbelastning i februar\n3. Radiator- og ventilasjonsreturer deler samme rørløp (temperaturkonflikt)",
};

type PanelType = "files" | "log" | "settings" | "ask" | null;

const ProjectData = () => {
  const [activePanel, setActivePanel] = useState<PanelType>(null);
  const [uploading, setUploading] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [typing, setTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggle = (panel: PanelType) => setActivePanel(prev => prev === panel ? null : panel);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setChatMessages(prev => [...prev, { role: "user", text }]);
    setChatInput("");
    setTyping(true);
    const response = simulatedResponses[text] || `Basert på datagrunnlaget for Parkveien Kontorbygg: dette spørsmålet krever dypere analyse av de ${documents.reduce((s, d) => s + (d.params ?? 0), 0)} parameterne. Kjør en full simulering for detaljert svar.`;
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: "ai", text: response }]);
      setTyping(false);
    }, 1200);
  };

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
                  <div className="flex flex-col" style={{ maxHeight: 360 }}>
                    {/* Messages */}
                    <div className="flex-1 space-y-3 overflow-y-auto pr-1" style={{ maxHeight: 260 }}>
                      {chatMessages.length === 0 && (
                        <div className="space-y-1.5">
                          <p className="text-[11px] text-muted-foreground mb-2">Foreslåtte spørsmål:</p>
                          {suggestedQuestions.map((q, i) => (
                            <button
                              key={i}
                              onClick={() => sendMessage(q)}
                              className="w-full rounded-md border border-border px-3 py-2 text-left text-xs text-foreground transition-colors hover:bg-secondary/30"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      )}
                      {chatMessages.map((msg, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}
                        >
                          {msg.role === "ai" && <Bot className="mt-0.5 h-4 w-4 shrink-0 text-primary" />}
                          <div className={`rounded-md px-3 py-2 text-xs leading-relaxed ${
                            msg.role === "user"
                              ? "bg-primary/15 text-foreground max-w-[80%]"
                              : "bg-secondary/40 text-foreground max-w-[90%]"
                          }`}>
                            {msg.text.split("\n").map((line, j) => <p key={j} className={j > 0 ? "mt-1" : ""}>{line}</p>)}
                          </div>
                        </motion.div>
                      ))}
                      {typing && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Bot className="h-4 w-4 text-primary" />
                          <Loader2 className="h-3 w-3 animate-spin" />
                          <span>Analyserer datagrunnlag…</span>
                        </motion.div>
                      )}
                    </div>
                    {/* Input */}
                    <form
                      onSubmit={(e) => { e.preventDefault(); sendMessage(chatInput); }}
                      className="mt-3 flex items-center gap-2 border-t border-border pt-3"
                    >
                      <input
                        ref={inputRef}
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Spør om bygget, TEK17, energi…"
                        className="flex-1 rounded-md border border-border bg-secondary/20 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/40"
                        disabled={typing}
                      />
                      <button
                        type="submit"
                        disabled={!chatInput.trim() || typing}
                        className="rounded-md bg-primary/15 p-2 text-primary transition-colors hover:bg-primary/25 disabled:opacity-30"
                      >
                        <Send className="h-3.5 w-3.5" />
                      </button>
                    </form>
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
