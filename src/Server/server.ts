import * as net from 'net';
import * as chalk from 'chalk';
import {User} from '../Note_app/Users/users';
import {EventEmitterServer} from './eventEmitterServer';
import {ResponseType} from '../types';


const server = net.createServer({allowHalfOpen: true}, (connection) => { // Creación del servidor
  console.log(chalk.blue('\nA Client has connected.\n'));
  const emit = new EventEmitterServer(connection); // Objeto EventEmitterServer

  emit.on('request', (message) => { // Procesando el evento recibido del objeto EventEmitter
    let response: ResponseType = {
      type: 'add',
      success: false,
    };
    const users = new User(message.user);

    switch (message.type) {
      case 'add':
        const add: boolean = users.addNote(message.title, message.body, message.color);
        if (add == true) {
          response = {
            type: 'add',
            success: true,
          };
        }
        break;
      case 'remove':
        const remove: boolean = users.removeNote(message.title);
        if (remove == true) {
          response = {
            type: 'remove',
            success: true,
          };
        }
        break;
      case 'update':
        const update: boolean = users.modifyNote(message.title, message.newParam, message.valParam);
        if (update == true) {
          response = {
            type: 'update',
            success: true,
          };
        }
        break;
      case 'read':
        const read = users.readNote(message.title);
        if (read != null) {
          response = {
            type: 'read',
            success: true,
            notes: [read],
          };
        }
        break;
      case 'list':
        const list = users.listNotes();
        if (list != []) {
          response = {
            type: 'list',
            success: true,
          };
          response.notes = list; // Daba error poniéndolo dentro del response directamente
        }
        break;
      default:
        console.log(chalk.red('Message type invalid!'));
        break;
    }

    connection.write(JSON.stringify(response), () => { // Envio de la respuesta al cliente
      console.log(chalk.green('Request done!'));
      connection.end();
    });
  });

  connection.on('close', () => {
    console.log(chalk.red('A client has disconnected.\n'));
  });
});

server.listen(60300, () => {
  console.log('Waiting conection...');
});
