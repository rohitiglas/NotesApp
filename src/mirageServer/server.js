import {createServer, Model} from 'miragejs';
export function makeServer({environment = 'test'} = {}) {
  let server = createServer({
    environment,
    models: {
      notes: Model,
      users: Model,
    },
    seeds(server) {
      server.create('user', {
        email: 'rohitiglas2@gmail.com',
        userName: 'Rohit Bansal',
      });
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
      this.post('api/login/', (schema, request) => {
        return {
          status: 200,
          access_token: '4ba50ee6-34ac-46bf-8dc7-18eb9383aa72',
          token_type: 'bearer',
          refresh_token: '0508d0cd-af91-43eb-8e9e-06e9a29f0ff6',
          expires_in: 86379,
          scope: 'basic',
        };
      });

      this.post('api/forgetPassword/', (schema, request) => {
        return {
          status: 200,
          otp: 123456,
          access_token: '4ba50ee6-34ac-46bf-8dc7-18eb9383aa72',
          token_type: 'bearer',
          refresh_token: '0508d0cd-af91-43eb-8e9e-06e9a29f0ff6',
          expires_in: 86379,
          scope: 'basic',
        };
      });
      this.post('api/otpVerification/', (schema, request) => {
        return {
          status: 200,
          access_token: '4ba50ee6-34ac-46bf-8dc7-18eb9383aa72',
          token_type: 'bearer',
          refresh_token: '0508d0cd-af91-43eb-8e9e-06e9a29f0ff6',
          expires_in: 86379,
          scope: 'basic',
        };
      });
      this.patch('api/resetPassword/', (schema, request) => {
        return {
          status: 200,
          access_token: '4ba50ee6-34ac-46bf-8dc7-18eb9383aa72',
          token_type: 'bearer',
          refresh_token: '0508d0cd-af91-43eb-8e9e-06e9a29f0ff6',
          expires_in: 86379,
          scope: 'basic',
        };
      });
      this.post('api/registerUser/', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.users.create(attrs);
      });
      this.get('api/notes/', (schema, request) => {
        return schema.notes.all();
      });
      this.get('api/notes/:id', (schema, request) => {
        let id = request.params.id;
        return schema.notes.find(id);
      });
      this.post('api/notes/', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.notes.create(attrs);
      });
      this.patch('api/notes/:id', (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let note = schema.notes.find(id);
        return note.update(newAttrs);
      });
      this.delete('api/notes/:id', (schema, request) => {
        let id = request.params.id;
        return schema.notes.find(id).destroy();
      });
    },
  });
  return server;
}
