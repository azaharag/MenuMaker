import {Client, expect} from '@loopback/testlab';
import {MenumakerApplication} from '../..';
import {setupApplication} from './test-helper';

describe('IngredientsController', () => {
  let app: MenumakerApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /ingredients', async () => {
    const res = await client.get('/ingredients').expect(200);
    expect(res.body).to.equal(Object);
  });
});
