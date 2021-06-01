import {createServer, Model} from 'miragejs';
export function makeServer({environment = 'test'} = {}) {
  let server = createServer({
    environment,
    models: {
      notes: Model,
    },
    seeds(server) {
      server.create('note', {
        title: 'Title1',
        body: 'Description is the pattern of narrative development that aims to make vivid a place, object, character, or group. Description is one of four rhetorical modes, along with exposition, argumentation, and narration. In practice it would be difficult to write literature that drew on just one of the four basic modes',
      });
      server.create('note', {
        title: 'Title2',
        body: 'By drawing on a fundamental description of cause and effect found in Einstein’s theory of special relativity, researchers from Imperial College London have come up with a way to help AIs make better guesses too.',
      });
      server.create('note', {
        title: 'Title3',
        body: 'However, as the workaround description implies, this separate tracking carries the risk of someone still being served the same ad even after the limit has been exceeded.',
      });
    },
    routes() {
      this.namespace = 'api/notes';
      // this.get('/api/movies', () => {
      //   return {
      //     movies: [
      //       {id: 1, name: 'Inception', year: 2010},
      //       {id: 2, name: 'Interstellar', year: 2014},
      //       {id: 3, name: 'Dunkirk', year: 2017},
      //     ],
      //   };
      // });
      this.get('/', (schema, request) => {
        return schema.notes.all();
      });
      this.get('/:id', (schema, request) => {
        let id = request.params.id;
        return schema.notes.find(id);
      });
      this.post('/', (schema, request) => {
        console.log("kskskkskskkskskksks",request);
        let attrs = JSON.parse(request.requestBody);
        return schema.notes.create(attrs);
      });
      this.patch('/:id', (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let note = schema.notes.find(id);
        return note.update(newAttrs);
      });
      this.delete('/:id', (schema, request) => {
        let id = request.params.id;
        return schema.notes.find(id).destroy();
      });
    },
  });
  return server;
}
