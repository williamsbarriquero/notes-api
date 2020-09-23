const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const notes = [
  {
    id: "8e7269e0-78cf-4015-9b68-743c6a9c048c",
    title: "Estudar Node",
    description: "Estudar conceitos básicos do Node"
  },
  {
    id: "095a03e4-2c85-4255-8649-981967151bfd",
    title: "Estudar React",
    description: "Estudar conceitos básicos do React"
  }
];

app.get("/notes", (req, res) => {
  return res.json(notes);
});

app.post("/notes", (req, res) => {
  const { title, description } = req.body;

  const note = {
    id: uuid(),
    title,
    description,
  };

  notes.push(note);

  return res.status(201).json(note);
});

app.put("/notes/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const index = notes.findIndex(r => r.id === id);

  if (index < 0) {
    return res.status(400).json({ error: 'Note not exisits' });
  }

  const note = { id, title, description };

  notes.splice(index, 1, note);
  
  return res.json(note);
});

app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;

  const index = notes.findIndex(r => r.id === id);

  if (index < 0) {
    return res.status(400).json({ error: 'Note not exisits' });
  }

  notes.splice(index, 1);
  
  return res.status(204).send();
});

module.exports = app;
