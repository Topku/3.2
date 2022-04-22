const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);

  await fs.writeFile("./db.json", JSON.stringify(notes));
  console.log(chalk.bgGreen("Note was added"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("here is list of notes"));
  notes.forEach((note) => {
    console.log(note.id, chalk.red(note.title));
  });
}

async function removeNote(element) {
  const notes = await getNotes();
  const result = notes.filter(function (ele) {
    return ele.id !== element.id;
  });
  await fs.writeFile("./db.json", JSON.stringify(result));
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
};
