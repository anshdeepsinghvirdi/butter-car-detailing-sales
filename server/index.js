import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;
const db = new Database(path.join(__dirname, "enquiries.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS enquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    service TEXT NOT NULL,
    message TEXT DEFAULT '',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "Butter Car Detailing API" });
});

app.post("/api/enquiries", (req, res) => {
  const { name, phone, service, message = "" } = req.body || {};
  if (!name || !phone || !service) {
    return res.status(400).json({ error: "Name, phone and service are required." });
  }

  const result = db.prepare(
    "INSERT INTO enquiries (name, phone, service, message) VALUES (?, ?, ?, ?)"
  ).run(name.trim(), phone.trim(), service.trim(), message.trim());

  res.status(201).json({ success: true, id: result.lastInsertRowid });
});

app.get("/api/enquiries", (_req, res) => {
  const rows = db.prepare("SELECT * FROM enquiries ORDER BY id DESC").all();
  res.json(rows);
});

app.delete("/api/enquiries/:id", (req, res) => {
  const result = db.prepare("DELETE FROM enquiries WHERE id = ?").run(req.params.id);
  if (!result.changes) return res.status(404).json({ error: "Enquiry not found." });
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Butter Car Detailing API running on http://localhost:${PORT}`);
});