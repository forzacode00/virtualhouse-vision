import { useState } from "react";
import { CheckCircle2, Upload, Sparkles, FileText, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const parameters = [
  { name: "Location", value: "Oslo (climate zone)", source: "Manual" },
  { name: "BRA / BTA", value: "6,000 / 7,200 m²", source: "Uploaded FBD" },
  { name: "Building type", value: "Office (kontorbygg)", source: "Uploaded FBD" },
  { name: "Floors", value: "9 (U1 + plan 1-8)", source: "Uploaded FBD" },
  { name: "Heat source", value: "District heating (fjernvarme)", source: "Manual" },
  { name: "Supply temp radiators", value: "55 / 40 °C", source: "Uploaded FBD" },
  { name: "Design outdoor temp (DUT)", value: "-21.8 °C (Oslo, NS-EN 12831)", source: "Auto" },
  { name: "Room setpoint", value: "21 °C", source: "TEK17 default" },
  { name: "Installed heating capacity", value: "150 kW", source: "Uploaded FBD" },
  { name: "Ventilation SFP target", value: "≤ 1.5 kW/(m³/s)", source: "TEK17 §14-3" },
  { name: "Heat recovery target", value: "≥ 80%", source: "TEK17 §14-3" },
  { name: "Cooling capacity", value: "200 kW", source: "Uploaded FBD" },
];

const sourceBadge: Record<string, string> = {
  "Uploaded FBD": "bg-primary/15 text-primary border-primary/25",
  "Manual": "bg-muted text-muted-foreground border-border",
  "Auto": "bg-info/15 text-info border-info/25",
  "TEK17 default": "bg-warning/15 text-warning border-warning/25",
  "TEK17 §14-3": "bg-warning/15 text-warning border-warning/25",
};

const ProjectData = () => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => setUploading(false), 2000);
  };

  return (
    <section className="mb-6 rounded-lg border border-border bg-card p-6">
      <h2 className="mb-1 text-xl font-semibold text-foreground">Project Data</h2>
      <p className="mb-5 text-sm text-muted-foreground">Parkveien Kontorbygg</p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[60fr_40fr]">
        {/* Parameter table */}
        <div className="overflow-auto rounded-md border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Parameter</th>
                <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Value</th>
                <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Source</th>
              </tr>
            </thead>
            <tbody>
              {parameters.map((p, i) => (
                <tr
                  key={i}
                  className="border-b border-border/50 transition-colors hover:bg-secondary/20"
                >
                  <td className="px-4 py-2 text-foreground">{p.name}</td>
                  <td className="px-4 py-2 text-right font-mono font-bold text-foreground">{p.value}</td>
                  <td className="px-4 py-2 text-right">
                    <span className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold ${sourceBadge[p.source] ?? sourceBadge["Manual"]}`}>
                      {p.source}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Upload area */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-1 flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/20 p-6 text-center">
            <AnimatePresence mode="wait">
              {uploading ? (
                <motion.div
                  key="uploading"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center gap-3"
                >
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm font-medium text-foreground">Parsing document…</p>
                  <p className="text-xs text-muted-foreground">Extracting parameters with AI</p>
                </motion.div>
              ) : (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">funksjonsbeskrivelse_parkveien.pdf</span>
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  </div>
                  <p className="text-xs text-success font-semibold">Parsed successfully</p>
                  <p className="text-xs text-muted-foreground">42 parameters extracted automatically</p>
                  <div className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground/70">
                    <Sparkles className="h-3.5 w-3.5" />
                    AI-powered document parsing
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleUpload}
              className="flex flex-1 items-center justify-center gap-2 rounded-md border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary/40"
            >
              <Upload className="h-3.5 w-3.5" />
              Upload new document
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-md border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary/40">
              Edit parameters
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectData;
