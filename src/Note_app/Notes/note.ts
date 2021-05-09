/**
 * Clase Nota, esta contendrá la estructura de una nota.
 */
export class Note {
  /**
   * Constructor de la clase
   * @param title El titulo de la nota
   * @param body El cuerpo o mensaje de la nota
   * @param color El color de la nota
   */
  constructor(private title: string, private body: string, private color: 'red' | 'blue' | 'yellow' | 'green') {}

  /**
   * Método para obtener o acceder al titulo de una nota
   * @returns el titutlo de la nota
   */
  getTitle() {
    return this.title;
  }
  /**
   * Método para cambiar el titulo de una nota
   * @param newTitle el nuevo titulo que queremos asignar
   */
  setTitle(newTitle: string) {
    this.title = newTitle;
  }

  /**
   * Método para acceder al cuerpo de la nota
   * @returns el cuerpo de la nota
   */
  getBody() {
    return this.body;
  }
  /**
   * Método para cambiar el cuerpo de la nota
   * @param newBody el nuevo cuerpo de la nota
   */
  setBody(newBody: string) {
    this.body = newBody;
  }

  /**
   * Método para acceder al color de la nota
   * @returns el color de la nota
   */
  getColor() {
    return this.color;
  }
  /**
   * Método para cambiar el color de la nota, el cual solo puede ser azul, rojo, amarillo o verde
   * @param newColor el nuevo color que queremos asignar.
   */
  setColor(newColor: 'red' | 'blue' | 'yellow' | 'green') {
    this.color = newColor;
  }
}

