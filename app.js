const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

yargs.command({
  command: 'add',
  describe: 'Adding a new note',
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note content',
      demandOption: true,
      type: 'string'
    },
    timeStamp: {
      describe: 'Timestamp'
    }
  },
  handler: function (argv) {
    let timeStamp = Date.now();
    console.log(chalk.blue('Adding new note'));
    console.log('Title: ' + argv.title);
    console.log('Content: ' + argv.body);
    notes.addNote(argv.title, argv.body, timeStamp);
  }
});

yargs.command({
  command: 'remove',
  describe: 'Removing note',
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function (argv) {
    console.log(chalk.red('Removing note'));
    notes.removeNote(argv.title);
  }
});

yargs.command({
  command: 'index',
  describe: 'List notes',
  handler: function () {
    console.log(chalk.blue('Current notes:'));
  }
});

yargs.command({
  command: 'read',
  describe: 'Read note',
  handler: function () {
    console.log(chalk.blue('Read note:'));
  }
});

console.log(chalk.green('Starting Program!'));
yargs.parse();
