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
