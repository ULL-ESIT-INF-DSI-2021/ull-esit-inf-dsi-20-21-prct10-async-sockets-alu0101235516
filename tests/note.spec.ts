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
