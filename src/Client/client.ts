import * as net from 'net';
import * as yargs from 'yargs';
import * as chalk from 'chalk';
import {RequestType} from '../types';

if (process.argv.length < 3) {
  console.log('Message don\'t specified');
} else {
  const client = net.connect({port: 60300}); // Conexión establecida.

  let wholeData = '';
  client.on('data', (parte) => {
    wholeData += parte.toString();
    const request = JSON.parse(wholeData); // Creación del objeto con la respuesta del server

    switch (request.type) {
      case 'add':
        if (request.success == true) {
          console.log(chalk.green('New note added!'));
        } else {
          console.log(chalk.red('Note already exists!'));
        }
        break;
      case 'remove':
        if (request.success == true) {
          console.log(chalk.green('Note removed!'));
        } else {
          console.log(chalk.red('Note doesnt exists!'));
        }
        break;
      case 'update':
        if (request.success == true) {
          console.log(chalk.green('Note updated!'));
        } else {
          console.log(chalk.red('Note doesnt exists!'));
        }
        break;
      case 'read':
        if (request.success == true) {
          console.log(chalk.keyword(request.notes[0].color).bold(request.notes[0].title + '\n'));
          console.log(chalk.keyword(request.notes[0].color).bold(request.notes[0].body));
        } else {
          console.log(chalk.red('Note doesnt exists!'));
        }
        break;
      case 'list':
        if (request.success == true) {
          request.notes.forEach((element: any) => {
            console.log(chalk.keyword(element.color)(element.title));
          });
        } else {
          console.log(chalk.red('Note doesnt exists!'));
        }
        break;
      default:
        console.log(chalk.red('Message unfound!'));
        break;
    }
  });


  let command: RequestType = { // Objeto de tipo Request
    type: 'add',
    user: '',
  };

  /**
   * Comando para añadir una nota al usuario.
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
          command = {
            type: 'add',
            user: argv.username,
            title: argv.title,
            body: argv.body,
            color: argv.color,
          };

          client.write(JSON.stringify(command) + '\n', (err) => { // Envio del request al server
            if (err) console.log(chalk.red('Data couldn\'t be sent'));
          });
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
        command = {
          type: 'remove',
          user: argv.username,
          title: argv.title,
        };

        client.write(JSON.stringify(command) + '\n', (err) => {
          if (err) console.log(chalk.red('Data couldn\'t be sent'));
        });
      }
    },
  });

  /**
  * Comando para modificar un una nota existente
  */
  yargs.command( {
    command: 'update',
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
        command = {
          type: 'update',
          user: argv.username,
          title: argv.title,
          newParam: argv.newParam,
          valParam: argv.valParam,
        };

        client.write(JSON.stringify(command) + '\n', (err) => {
          if (err) console.log(chalk.red('Data couldn\'t be sent'));
        });
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
        command = {
          type: 'read',
          user: argv.username,
          title: argv.title,
        };

        client.write(JSON.stringify(command) + '\n', (err) => {
          if (err) console.log(chalk.red('Data couldn\'t be sent'));
        });
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
        command = {
          type: 'list',
          user: argv.username,
        };

        client.write(JSON.stringify(command) + '\n', (err) => {
          if (err) console.log(chalk.red('Data couldn\'t be sent'));
        });
      }
    },
  });

  yargs.argv;
}
