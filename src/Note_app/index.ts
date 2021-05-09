import {User} from './Users/users';
import * as yargs from 'yargs';
import * as chalk from 'chalk';

/**
 * Comando para añadir una nota nueva.
 */
yargs.command( {
  command: 'add',
  describe: 'Add a new note',
  builder: {
    username: {
      describe: 'User',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.username === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
      if (argv.color == 'red' || argv.color == 'blue' || argv.color == 'yellow' || argv.color == 'green') {
        const user = new User(argv.username);
        user.addNote(argv.title, argv.body, argv.color);
      } else {
        console.error(chalk.red('The color asigned its incorrect!'));
      }
    }
  },
});


/**
 * Comando para eliminar una nota de un usuario.
 */
yargs.command( {
  command: 'remove',
  describe: 'Remove an existing note',
  builder: {
    username: {
      describe: 'User',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.username === 'string' && typeof argv.title === 'string') {
      const user = new User(argv.username);
      user.removeNote(argv.title);
    }
  },
});


/**
 * Comando para modificar un una nota existente
 */
yargs.command( {
  command: 'modify',
  describe: 'Modify an existing note',
  builder: {
    username: {
      describe: 'User',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    newParam: {
      describe: 'Parameter wants to change',
      demandOption: true,
      type: 'string',
    },
    valParam: {
      describe: 'New parameter content',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.username === 'string' && typeof argv.title === 'string' && typeof argv.newParam === 'string' && typeof argv.valParam === 'string') {
      const user = new User(argv.username);
      user.modifyNote(argv.title, argv.newParam, argv.valParam);
    }
  },
});


/**
 * Comando para leer el contenido de una nota
 */
yargs.command( {
  command: 'read',
  describe: 'Read a note',
  builder: {
    username: {
      describe: 'User',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.username === 'string' && typeof argv.title === 'string') {
      const user = new User(argv.username);
      user.readNote(argv.title);
    }
  },
});


/**
 * Comando para listar todas las notas de un usuario
 */
yargs.command( {
  command: 'list',
  describe: 'List user`s notes',
  builder: {
    username: {
      describe: 'User',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.username === 'string') {
      const user = new User(argv.username);
      user.listNotes();
    }
  },
});

yargs.argv;
