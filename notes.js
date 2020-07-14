const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicates = notes.filter((note) => note.title === title);

  const timeStamp = Date.now();
  const timeString = new Date(timeStamp);

  if (duplicates.length === 0) {
    notes.push({
      title: title,
      body: body,
      timeStamp: timeString
    })
    console.log('New note added at:' + timeString);
  } else {
    console.log('Title already used');
  }

  saveNotes(notes);
}

const loadNotes = () => {
  try {
    const dataJSON = fs.readFileSync('./notes.json').toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const removeNote = (title) => {
  console.log('Removing: ' + title);
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);
  if (notesToKeep.length === notes.length) {
    console.log(chalk.red.inverse('No note found!'));
  } else {
    console.log(chalk.green.inverse('Note removed!'));
    saveNotes(notesToKeep);
  }
}

const listNotes = () => {
  const notes = loadNotes()
  notes.forEach((note) => {
    console.log(chalk.red('Title: ' + note.title));
    console.log(chalk.red('Content: ' + note.body));
  })
}

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find(note => note.title == title);
  if (note) {
    console.log(chalk.inverse('Title: ' + note.title));
    console.log('Content: ' + note.body);
  } else {
    console.log(chalk.red.inverse('No note found'));
  }
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}

