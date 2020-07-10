const fs = require('fs');
const chalk = require('chalk');

const getNotes = function () {
  return 'Your notes...'
}

const addNote = function (title, body) {
  const notes = loadNotes();
  const duplicates = notes.filter(function (note) {
    return note.title === title
  });

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

const loadNotes = function () {
  try {
    const dataJSON = fs.readFileSync('./notes.json').toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
}

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const removeNote = function (title) {
  console.log('Removing: ' + title);
  const notes = loadNotes();
  const notesToKeep = notes.filter(function (note) {
    return note.title !== title
  });
  if (notesToKeep.length === notes.length) {
    console.log(chalk.red.inverse('No note found!'));
  } else {
    console.log(chalk.green.inverse('Note removed!'));
    saveNotes(notesToKeep);
  }

}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote
}

