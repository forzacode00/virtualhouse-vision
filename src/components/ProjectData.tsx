import { useState } from "react";
import { FileText, Upload, CheckCircle2, Clock, X, Sparkles, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const documents = [
  { name: "funksjonsbeskrivelse_parkveien.pdf", type: "FBD", params: 42, status: "parsed" as const },
  { name: "tegningsgrunnlag_VVS_rev3.pdf", type: "VVS", params: 28, status: "parsed" as const },
  { name: "energiberegning_simien.csv", type: "SIMIEN", params: 64, status: "parsed" as const },
  { name: "sdanlegg_punktliste.xlsx", type: "SD-anlegg", params: null, status: "processing" as const },
];

const ProjectData = () => {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => setUploading(false), 2200);
  };

  return (
    <>
      {/* Minimalist trigger — inline in context strip */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
      >
        <FileText className="h-3 w-3" />
        Filer ({documents.length})
      </button>

      {/* Panel overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 top-24 z-50 w-full max-w-lg -translate-x-1/2 rounded-lg border border-border bg-card p-5 shadow-xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Datagrunnlag</h3>
                  <p className="text-[11px] text-muted-foreground">Dokumenter som mater simuleringsmotoren</p>
                </div>
                <button onClick={() => setOpen(false)} className="rounded p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-1.5">
                {documents.map((doc, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-secondary/30">
                    <FileText className="h-4 w-4 shrink-0 text-primary/60" />
                    <div className="min-w-0 flex-1">
                      <span className="block truncate text-sm text-foreground">{doc.name}</span>
                      <span className="text-[10px] text-muted-foreground">
                        {doc.params ? `${doc.params} parametere ekstrahert` : "Analyseres…"}
                      </span>
                    </div>
                    {doc.status === "parsed" ? (
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-success" />
                    ) : (
                      <Clock className="h-3.5 w-3.5 shrink-0 animate-pulse text-warning" />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/50">
                  <Sparkles className="h-3 w-3" />
                  AI-drevet dokumentanalyse
                </div>
                <AnimatePresence mode="wait">
                  {uploading ? (
                    <motion.div
                      key="spin"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1.5 text-xs text-primary"
                    >
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Analyserer…
                    </motion.div>
                  ) : (
                    <motion.button
                      key="btn"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={handleUpload}
                      className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      <Upload className="h-3 w-3" />
                      Last opp
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectData;
