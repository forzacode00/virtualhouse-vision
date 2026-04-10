import { useState } from "react";
import { CheckCircle2, Upload, Sparkles, FileText, Loader2, Clock, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const documents = [
  {
    name: "funksjonsbeskrivelse_parkveien.pdf",
    type: "Funksjonsbeskrivelse (FBD)",
    status: "parsed" as const,
    params: 42,
    date: "12. mar 2025",
  },
  {
    name: "tegningsgrunnlag_VVS_rev3.pdf",
    type: "VVS-tegninger",
    status: "parsed" as const,
    params: 28,
    date: "14. mar 2025",
  },
  {
    name: "energiberegning_simien.csv",
    type: "SIMIEN-eksport",
    status: "parsed" as const,
    params: 64,
    date: "18. mar 2025",
  },
  {
    name: "sdanlegg_punktliste.xlsx",
    type: "SD-anlegg punktliste",
    status: "processing" as const,
    params: null,
    date: "I dag",
  },
];

const statusConfig = {
  parsed: { icon: CheckCircle2, label: "Analysert", className: "text-success" },
  processing: { icon: Clock, label: "Analyseres…", className: "text-warning animate-pulse" },
  error: { icon: AlertCircle, label: "Feil", className: "text-destructive" },
};

const ProjectData = () => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => setUploading(false), 2200);
  };

  const totalParams = documents.reduce((sum, d) => sum + (d.params ?? 0), 0);

  return (
    <section className="mb-6 rounded-lg border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Datagrunnlag</h2>
          <p className="text-[11px] text-muted-foreground">
            Dokumenter lastet opp og analysert av AI — danner grunnlag for simulering
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60">
          <Sparkles className="h-3.5 w-3.5" />
          AI-drevet dokumentanalyse
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto]">
        {/* Document list */}
        <div className="space-y-2">
          {documents.map((doc, i) => {
            const s = statusConfig[doc.status];
            const StatusIcon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 rounded-md border border-border/60 bg-secondary/20 px-4 py-2.5 transition-colors hover:bg-secondary/40"
              >
                <FileText className="h-4 w-4 shrink-0 text-primary/70" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium text-foreground">{doc.name}</span>
                    <span className="shrink-0 rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                      {doc.type}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span>{doc.date}</span>
                    {doc.params && <span>{doc.params} parametere ekstrahert</span>}
                  </div>
                </div>
                <div className={`flex items-center gap-1.5 text-[11px] font-medium ${s.className}`}>
                  <StatusIcon className="h-3.5 w-3.5" />
                  {s.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary + upload */}
        <div className="flex flex-col items-center gap-3 lg:w-56">
          <div className="flex w-full flex-col items-center rounded-md border border-border/60 bg-secondary/20 p-4 text-center">
            <span className="font-mono text-2xl font-bold text-primary">{totalParams}</span>
            <span className="text-[11px] text-muted-foreground">parametere totalt</span>
            <span className="mt-1 text-[10px] text-muted-foreground/60">fra {documents.length} dokumenter</span>
          </div>

          <AnimatePresence mode="wait">
            {uploading ? (
              <motion.div
                key="uploading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex w-full flex-col items-center gap-2 rounded-md border-2 border-dashed border-primary/40 bg-primary/5 p-4"
              >
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <span className="text-xs text-foreground">Analyserer dokument…</span>
              </motion.div>
            ) : (
              <motion.button
                key="upload"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={handleUpload}
                className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-dashed border-border bg-secondary/10 px-3 py-3 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
              >
                <Upload className="h-4 w-4" />
                Last opp dokument
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProjectData;
