import {Note} from '../Notes/note';
import * as fs from 'fs';
import * as chalk from 'chalk';

/**
 * Clase User, la cual la usaremos para verificar el usuario, y para almacenar todos los métodos de nuestra aplicación
 * ya que desde aqui, podremos acceder a cada usuario individualmente
 */
export class User {
  private userNotes: Note[] = [];
  /**
   * Constructor de la clase
   * @param username nombre de usuario, del usuario correspondiente
   */
  constructor(private username: string) {
    const existDirectory: boolean = fs.existsSync(`src/Note_app/Database/${this.username}`);
    if (existDirectory == false) {
      fs.mkdir(`src/Note_app/Database/${this.username}`, () => {
        console.log(chalk.green('New User Directory created!'));
      });
    }
  }

  /**
   * Acceso al nombre del usuario.
   * @returns el nombre del usuario
   */
  getUsername(): string {
    return this.username;
  }
  /**
   * Cambiar el nombre de usuario.
   * @param newUsername el nuevo nombre de usuario.
   */
  setUsername(newUsername: string): void {
    this.username = newUsername;
  }

  /**
   * Método para acceder a las notas de un usuario
   * @returns las notas del usuario en forma de array
   */
  getNotes() {
    return this.userNotes;
  }


  /**
   * Método para añadir una nueva nota al usuario.
   * @param title titulo de la nota.
   * @param body contenido de la nota.
   * @param color color de la nota.
   */
  public addNote(title: string, body: string, color: 'red' | 'blue' | 'yellow' | 'green'): boolean {
    const existFile: boolean = fs.existsSync(`src/Note_app/Database/${this.username}/${title}.json`);

    if (existFile == false) {
      this.userNotes.push(new Note(title, body, color));
      fs.writeFile(`src/Note_app/Database/${this.username}/${title}.json`, `${jsonFormat(title, body, color)}`, () => {});
      return true;
    }
    return false;
  }


  /**
   * Método para eliminar una nota existente del usuario.
   * @param title titulo de la nota.
   */
  public removeNote(title: string): boolean {
    const existFile: boolean = fs.existsSync(`src/Note_app/Database/${this.username}/${title}.json`);

    if (existFile == true) {
      fs.rm(`src/Note_app/Database/${this.username}/${title}.json`, () => {});
      return true;
    } else {
      return false;
    }
  }


  /**
   * Método para modificar una nota
   * @param title El titulo de la nota
   * @param newParam El parámetro que queremos modificar
   * @param valParam El nuevo valor del parámetro
   */
  public modifyNote(title: string, newParam: string, valParam: string): boolean {
    const existFile: boolean = fs.existsSync(`src/Note_app/Database/${this.username}/${title}.json`);

    if (existFile == true) {
      const noteContent = fs.readFileSync(`src/Note_app/Database/${this.username}/${title}.json`);
      const data = JSON.parse(noteContent.toString());

      switch (newParam) {
        case "title":
          fs.renameSync(`src/Note_app/Database/${this.username}/${title}.json`, `src/Note_app/Database/${this.username}/${valParam}.json`);
          fs.writeFile(`src/Note_app/Database/${this.username}/${valParam}.json`, `${jsonFormat(valParam, data.body, data.color)}`, () => {});
          return true;
          break;
        case "body":
          fs.writeFile(`src/Note_app/Database/${this.username}/${data.title}.json`, `${jsonFormat(data.title, valParam, data.color)}`, () => {});
          return true;
          break;
        case "color":
          fs.writeFile(`src/Note_app/Database/${this.username}/${data.title}.json`, `${jsonFormat(data.title, data.body, valParam)}`, () => {});
          return true;
          break;
      }
    } else {
      console.error(chalk.red(`${title} note, doesnt exists!`));
    }
    return false;
  }


  /**
   * Método para leer el contenido de una nota
   * @param title El titulo de la nota que queremos leer
   */
  public readNote(title: string) {
    const existFile: boolean = fs.existsSync(`src/Note_app/Database/${this.username}/${title}.json`);

    if (existFile == true) {
      const noteContent = fs.readFileSync(`src/Note_app/Database/${this.username}/${title}.json`);
      const data = JSON.parse(noteContent.toString());

      /*
      switch (data.color) {
        case "red":
          console.log(chalk.blue(`¡Nota de ${this.username}!`));
          console.log('------------------');
          console.log(chalk.red(`Title: ${data.title}\n${data.body}\n`));
          break;
        case "blue":
          console.log(chalk.blue(`¡Nota de ${this.username}!`));
          console.log('------------------');
          console.log(chalk.blue(`Title: ${data.title}\n${data.body}\n`));
          break;
        case "green":
          console.log(chalk.blue(`¡Nota de ${this.username}!`));
          console.log('------------------');
          console.log(chalk.green(`Title: ${data.title}\n${data.body}\n`));
          break;
        case "yellow":
          console.log(chalk.blue(`¡Nota de ${this.username}!`));
          console.log('------------------');
          console.log(chalk.yellow(`Title: ${data.title}\n${data.body}\n`));
          break;
      }
      */
      return new Note(data.title, data.body, data.color);
    } else {
      console.error(chalk.red(`${title} note, doesnt exists!`));
    }
    return null;
  }


  /**
   * Método para listar todas las notas de un usuario
   */
  public listNotes() {
    const existFile: boolean = fs.existsSync(`src/Note_app/Database/${this.username}`);
    const userNote: Note[] = [];

    if (existFile == true) {
      /*
      console.log(chalk.blue(`¡Notas de ${this.username}!`));
      console.log('------------------');
      */
      fs.readdirSync(`src/Note_app/Database/${this.username}`).forEach((item) => {
        const userContent = fs.readFileSync(`src/Note_app/Database/${this.username}/${item}`);
        const data = JSON.parse(userContent.toString());

        /*
        switch (data.color) {
          case "red":
            console.log(chalk.red(`${data.title}`));
            break;
          case "blue":
            console.log(chalk.blue(`${data.title}`));
            break;
          case "green":
            console.log(chalk.green(`${data.title}`));
            break;
          case "yellow":
            console.log(chalk.yellow(`${data.title}`));
            break;
        }
        */
        userNote.push(new Note(data.title, data.body, data.color));
      });
      return userNote;
    } else {
      console.error(chalk.red(`${this.username} user, doesnt exists!`));
    }
    return [];
  }
}

/**
 * Función para parsear en formato json las notas, para así almacenarlas en un fichero nuevo, que sea de
 * extensión .json
 */
export function jsonFormat(title: string, body: string, color: string): string {
  return '{\n\t"title\": \"' + title + '\",\n\t"body\": \"' + body + '\",\n\t"color\": \"' + color + '\"\n}';
}


