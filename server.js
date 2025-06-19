const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 3000;
const FILE = "../tasks.json";
app.use(cors());
app.use(express.json());
app.get("/tasks", (req, res) => {
  const data = fs.readFileSync(FILE, "utf-8");
  res.json(JSON.parse(data));
});
app.post("/tasks", (req, res) => {
  const { task } = req.body;
  const data = JSON.parse(fs.readFileSync(FILE, "utf-8"));
  data.push(task);
  fs.writeFileSync(FILE, JSON.stringify(data));
  res.sendStatus(200);
});
app.delete("/tasks/:id", (req, res) => {
  const index = parseInt(req.params.id);
  const data = JSON.parse(fs.readFileSync(FILE, "utf-8"));
  data.splice(index, 1);
  fs.writeFileSync(FILE, JSON.stringify(data));
  res.sendStatus(200);
});
app.delete("/tasks", (req, res) => {
  fs.writeFileSync(FILE, JSON.stringify([]));
  res.sendStatus(200);
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
