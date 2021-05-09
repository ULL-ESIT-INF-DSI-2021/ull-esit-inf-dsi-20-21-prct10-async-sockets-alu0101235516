# Informe. Práctica 9: Sistema de ficheros y creación de procesos en Node.js.
## Desarrollo de Sistemas Informáticos.
#### ADRIAN HERNANDEZ SUAREZ - alu0101235516@ull.edu.es


### _**Introducción.**_

  Para llevar a cabo este informe, hemos tenido que realizar 1 ejercicio sobre el manejor de cliente y servidor a través del uso de `sockets`. Como en las anteriores prácticas, hemos hecho uso de un directorio de trabajo, uso de `mocha` y `chai` para los tests y el uso de `TypeDoc` para la documentación.
  Todo esto llevado a cabo con la metodología TDD, y utilizando el trabajo con ficheros gracias a la API síncrona, que nos proporciona **Node.js**. A todo esto, le tenemos que añadir la nueva implementación de `GitHub Actions` y `SonarCLoud`, una para la integración contínua y la otra para la comprobación de calidad y seguridad, respectivamente.

### _**Objetivos.**_

  El objetivo de esta práctica es lograr el correcto diseño y la efiente implementación de una aplicación que ayude a los usuarios a conectarse desde un cliente y acceder a sus notas que están archivadas en un servidor a parte. Además de familiarizarnos aún más con las herramientas que vamos a usar, como `GitHub Actions` y `SonarCloud`.

### _**Primer paso: Creación de los directorios de trabajo**_

  Para completar este primer apartado, tendremos que seguir los pasos que se muestran en el siguiente enlace [Creación de un proyecto inicial para trabajar con TypeScript](https://ull-esit-inf-dsi-2021.github.io/typescript-theory/typescript-project-setup.html) con esto lo que conseguiremos será crear un espacio de trabajo ideal para comenzar con el desarrollo de los ejercicios propuestos.
  Cuando tengamos esta parte realizada, tendremos creado un directorio llamado `./src`, en este directorio es donde alojaremos todos los ficheros que vayamos necesitando para la implementación de la práctica.
  
### _**Segundo paso: Instalación de mocha y chai; Instanbul y Coveralls; GitHub Actions y Sonar Cloud; Además de la configuración de TypeDoc**_
  
  Una vez tengamos hecho el primer paso de esta práctica tendremos que hacer la instalación de TypeDoc, esto es un generador automático de documentación para proyectos de **TypeScript**.  Para conocer mejor esto y seguir la instalación y configuración correctamente, mire el siguiente enlace [Instalación y Configuración de TypeDoc](https://drive.google.com/file/d/19LLLCuWg7u0TjjKz9q8ZhOXgbrKtPUme/view). 
  Cuando tengamos la documentación creada, tendremos que proceder a la instalación de `Mocha` y de `Chai`. Para conocer mejor su funcionamiento y ver la correcta pauta de instalación, siga el siguiente enlace [Instalación y Configuración de Mocha y Chai](https://drive.google.com/file/d/1-z1oNOZP70WBDyhaaUijjHvFtqd6eAmJ/view).
  
  Una vez tengamos toda la instalación previa, tendremos que instalar Instabull y conocer el uso de Coveralls, para ello podemos seguir los pasos en el siguiente enlace [Instalación y Configuración de Instanbull y Coveralls](https://drive.google.com/file/d/1xLDc4CpoYpsAlCFO_4DMwu7MKCtcZDnh/view).
  
  Para concluir con las instalaciones, para la correcta configuración de GitHub Actions y SonarCloud, podemos hacer eso de los siguientes videos explicativos:
  
  - [GitHub Actions](https://drive.google.com/file/d/1FLPargdPBX6JaJ_85jNsRzxe34sMi-Z3/view).
  - [Sonar Cloud](https://drive.google.com/file/d/1hwtPovQlGvthaE7e7yYshC4v8rOtLSw0/view).
  
  Cuando tengamos todo esto listo, lo que conseguiremos es hacer un TDD del proyecto, es decir, las pruebas unitarias. Utilizando el comando `npm test` podremos ejecutar dichas pruebas, viendo si la función que hemos creado, es correcta o no. Para dar validez y constancia de esto, tendremos que hacer un commit antes de la realización del código y con el test hecho, viendo como falla dicho test, y luego tendremos que hacer otro commit después de la correcta realización del código para dar constancia de que esta bien realizado.
  
### _**Tercer paso: Realización de los ejercicios**_
#### _**Ejercicio:**_

  Antes de comenzar con los ficheros de esta práctica, tenemos que mencionar que he usado la aplicación hecha en la práctica 8, la cuál se basa en el manejo de ficheros, en este caso, de notas para un usuario en concreto. Como estos ficheros ya los hemos visto y explicado, simplemente les voy a proporcionar un enlace para que le puedan echar un vistazo más en profundidad. Aunque hay que mencionar que el fichero `users.ts` lo he modificado para la correcta implementación del mismo, con el uso del servidor/cliente.
  
  - [Fichero note.ts](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct10-async-sockets-alu0101235516/blob/master/src/Note_app/Notes/note.ts)
  - [Fichero users.ts](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct10-async-sockets-alu0101235516/blob/master/src/Note_app/Users/users.ts)
  - [Fichero index.ts](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct10-async-sockets-alu0101235516/blob/master/src/Note_app/index.ts)


##### _**Fichero types.ts**_

  En este fichero definimos los tipos para las aplicaciones clientes y servidor en formato JSON, de nuestra aplicación. RequestType se empleará en el cliente, y ResponseType en el servidor. Para ver más sobre el código puede acceder desde el siguiente enlace:

  - [Fichero types.ts](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct10-async-sockets-alu0101235516/blob/master/src/types.ts)


##### _**Fichero client.ts**_

  En este fichero empezaremos implementando el módulo `net` el cual lo usaremos para crear un socket cliente y establecer una conexión con el servidor, mediante el uso de `connect` y por el puerto **60300**, después de esto, haremos la creación del objeto de respuesta, es decir, la respuesta que captaremos desde el servidor, la cual la usaremos para exponerle al usuario por pantalla lo que ha sucedido acerca del comando utilizado.
  Para hacer esto, he hecho uso de un `switch` el cual va a valorar el tipo del mensaje, es decir, si el tipo del mensaje recibido es `add` por ejemplo, entraremos dentro del switch en el caso que coincida con eso y le expondremos al usuario por consola, un mensaje con la acción realizada.
  
  Por otro lado, tenemos instanciados dentro del fichero, los comandos que usamos en la aplicación de la nota, estos comandos tenemos un manejador, el cual iremos cambiando según lo que le queramos mandar al servidor. ¿Cómo hacemos eso?, previamente hemos creado un objeto de tipo `RequestType` el cual instanciaremos y dentro de cada comando lo iremos modificando según nos conviene.
  Cuando tengamos editado correctamente dicho objeto, tendremos que enviar el mismo hacia el servidor, para ello hacemos uso del `write`, el cual le enviará la request al servidor.
  
  Para ver el código en más profundidad, puede acceder a él desde el siguiente enlace:

  - [Fichero client.ts](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct10-async-sockets-alu0101235516/blob/master/src/Client/client.ts)


##### _**Fichero server.ts y users.ts**_

  Empezaré explicando el fichero server donde se encuentra el corazón de la aplicación.
  En server también haremos uso del módulo `net` pero a parte, usaremos la clase `EventEmitterServer`. Principalmente lo que haremos será crear un objeto tipo server, el cual lo usaremos para procesar los datos que nos llegan desde el cliente. Creamos un objeto de tipo `EventEmitterServer` para poder emitir dichos eventos.
  
  Cuando tengamos hecho esta parte, tendremos que crear una varaible de tipo `ResponseType` la cual la usaremos para procesar la respuesta del servidor al cliente, esto lo haremos inicializando dicha variable y dentro de cada caso de nuestro switch la iremos modificando según nos sea conveniente.
  
  Nuestro switch trabaja de la siguente manera, tenemos creada una constante llamada `users` la cual almacena el nombre del usuario en cuestión, a parte, la forma de gestionar el switch es igual que la del cliente, es decir, dependiendo del tipo del mensaje recibido. Si el mensaje es de tipo 'add' accederemos a dicho caso, etc.
Una vez dentro de un caso cualquiera, por ejemplo, el caso `add` haremos lo siguiente:
  
  - Creamos una constante de tipo boleano para comprobar si la acción de `addNote()` se a realizado correctamente, para poder llevar a cabo esto, he tenido que modificar el contenido de los métodos dentro de la clase `User`, para que estos sean de tipo booleano (al menos del comando `add` al comando `update`).
  - Comprobaremos si nuestra constante es true, en el caso de que sea cierto cambiaremos el contenido de nuestra variable `Response` poniéndo el success a true.

Finalmente, una vez tenemos hecho esto, le tendremos que mandar la respuesta al cliente, para ello hacemos uso de `write` y mandamos la respuesta en formato json, haciendo uso del `JSON.stringify(response)`, una vez le mandamos la respuesta al cliente, cerramos la conexión y el la procesará.

Para ver más acerca de los métodos de la clase `User` y del servidor, podemos acceder desde los siguientes enlaces:

  - [Fichero server.ts](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct10-async-sockets-alu0101235516/blob/master/src/Server/server.ts)
  - [Fichero users.ts](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct10-async-sockets-alu0101235516/blob/master/src/Note_app/Users/users.ts)


##### _**Fichero eventEmitterServer.ts**_

He realizado la clase `EventEmitterServer`, para complementar la funcionalidad del servidor del fichero server.ts que he explicado antes, esta clase hereda de la clase EventEmitter del módulo events.

Con esta clase podremos recibir y enviar eventos, en concreto resolveremos el problema de la recepción de mensajes a trozos mediante el evento recibido `data`. La idea es que esta clase sea capaz de emitir un evento de tipo request con cada recepción de un mensaje completo enviado por el servidor a través del socket correspondiente. Dicha recepción se obtendrá mediante el caracter `\n`.

  - [Fichero eventEmitterServer.ts](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct10-async-sockets-alu0101235516/blob/master/src/Server/eventEmitterServer.ts)


##### _**Tests y prueba del código**_

**TEST DEL EVENTEMITTERSERVER**
```typescript
import 'mocha';
import {expect} from 'chai';
import {EventEmitter} from 'events';
import {EventEmitterServer} from '../src/Server/eventEmitterServer';

describe('EventEmitterServer', () => {
  it('Request emitted', (done) => {
    const emit = new EventEmitter();
    const server = new EventEmitterServer(emit);

    server.on('request', (message) => {
      expect(message).to.be.eql({"title": "Test", "body": "Test", "color": "blue"});
      done();
    });

    emit.emit('data', '{"title": "Test", "body": "Test"');
    emit.emit('data', ', "color": "blue"}');
    emit.emit('data', '\n');
  });
});
``` 
**TEST DE LA CLASE NOTE**
```typescript
import 'mocha';
import {expect} from 'chai';
import {Note} from '../src/Note_app/Notes/note';

const note = new Note('Test', 'Test', 'blue');
const newNote = new Note('Test', 'Test', 'blue');

describe('Note function test', () => {
  it('Existing object', () => {
    expect(note).not.to.be.equal(null);
  });

  it('notes.getTitle() returns the note\'s title', () => {
    expect(note.getTitle()).to.be.equal('Test');
  });

  it('notes.getBody() returns the note\'s body', () => {
    expect(note.getBody()).to.be.equal('Test');
  });

  it('notes.getColor() returns the note\'s color', () => {
    expect(note.getColor()).to.be.equal('blue');
  });


  it('notes.setTitle() returns the new note\'s title', () => {
    expect(newNote.setTitle('NewTest'));
    expect(newNote.getTitle()).to.be.equal('NewTest');
  });

  it('notes.setBody() returns the new note\'s body', () => {
    expect(newNote.setBody('NewTest'));
    expect(newNote.getBody()).to.be.equal('NewTest');
  });

  it('notes.setColor() returns the new note\'s color', () => {
    expect(newNote.setColor('yellow'));
    expect(newNote.getColor()).to.be.equal('yellow');
  });
});
``` 

**PRUEBA DE LA APLICACIÓN (Usado de ejemplo el comando add)**
  - [!TEST ADD](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct10-async-sockets-alu0101235516/blob/gh-pages/images/add.PNG)

### _**Bibliografía.**_

Nombre | Enlaces
-------|--------
Introducción a Markdown | https://guides.github.com/features/mastering-markdown/
Información sobre GitHub Pages | https://docs.github.com/en/github/working-with-github-pages
Sitio web de Jekyll | https://jekyllrb.com/
GutHub Learning Lab | https://lab.github.com/
Curso de GitHub Pages | https://lab.github.com/githubtraining/github-pages
Visual Studio Code | https://code.visualstudio.com/
Instalar Visual Studio Code | https://code.visualstudio.com/docs/setup/setup-overview
Tutorial VSCode sobre Additional Components | https://code.visualstudio.com/docs/setup/additional-components
Tutorial VSCode sobre User Interface | https://code.visualstudio.com/docs/getstarted/userinterface
Tutorial VSCode sobre Basic Editing | https://code.visualstudio.com/docs/editor/codebasics
Tutorial VSCode sobre Extension MarketPlace | https://code.visualstudio.com/docs/editor/extension-gallery
Tutorial VSCode sobre IntelliSense | https://code.visualstudio.com/docs/editor/intellisense
Tutorial VSCode sobre Code Navigation | https://code.visualstudio.com/docs/editor/editingevolved
Tutorial VSCode sobre Debugging | https://code.visualstudio.com/docs/editor/debugging
Tutorial VSCode sobre Version Control | https://code.visualstudio.com/docs/editor/versioncontrol
Tutorial VSCode sobre Working with GitHub | https://code.visualstudio.com/docs/editor/github
Tutorial VSCode sobre Integrated Terminal | https://code.visualstudio.com/docs/editor/integrated-terminal
Tutorial VSCode sobre Tasks | https://code.visualstudio.com/docs/editor/tasks
Tutorial VSCode sobre Snippets | https://code.visualstudio.com/docs/editor/userdefinedsnippets
Tutorial VSCode sobre Emmet | https://code.visualstudio.com/docs/editor/emmet
Tutorial VSCode sobre Command Line | https://code.visualstudio.com/docs/editor/command-line
Tutorial VSCode sobre  Multiroot Workspaces | https://code.visualstudio.com/docs/editor/multi-root-workspaces
Tutorial VSCode sobre  Accessibility | https://code.visualstudio.com/docs/editor/accessibility
Conectarnos desde VSCode a una máquina remota por SSH | https://code.visualstudio.com/docs/remote/ssh-tutorial
Informe de la práctica 1 de DSI | https://ull-esit-inf-dsi-2021.github.io/ull-esit-inf-dsi-20-21-prct01-iaas-alu0101206479/
Live Share Extension Pack | https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare-pack
Documentación de Visual Studio Live Share | https://docs.microsoft.com/en-us/visualstudio/liveshare/
Libro Essential TypeScript: From Beginner to Pro | https://learning.oreilly.com/library/view/essential-typescript-from/9781484249796/html/Part_1.xhtml
