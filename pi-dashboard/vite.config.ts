import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const MAINTENANCE_FILE = resolve(__dirname, "..", "maintenance-tasks.json");

function maintenanceApiPlugin() {
  return {
    name: "maintenance-api",
    configureServer(server: { middlewares: { use: (arg0: string, arg1: (req: any, res: any) => void) => void; }; }) {
      server.middlewares.use("/api/maintenance-tasks", (req, res) => {
        if (req.method === "GET") {
          try {
            const data = readFileSync(MAINTENANCE_FILE, "utf-8");
            res.setHeader("Content-Type", "application/json");
            res.end(data);
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "Failed to read maintenance file" }));
          }
        } else if (req.method === "POST") {
          let body = "";
          req.on("data", (chunk: string) => (body += chunk));
          req.on("end", () => {
            try {
              const parsed = JSON.parse(body);
              writeFileSync(MAINTENANCE_FILE, JSON.stringify(parsed, null, 2), "utf-8");
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ ok: true }));
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: "Failed to write maintenance file" }));
            }
          });
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), maintenanceApiPlugin()],
});