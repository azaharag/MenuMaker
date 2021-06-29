import {
  createStubInstance,
  expect, StubbedInstanceWithSinonAccessor
} from '@loopback/testlab';
import sinon from 'sinon';
import {IngredientsController} from '../../controllers';
import {IngredientsRepository} from '../../repositories';

describe('IngredientsController (unit)', () => {
  let repository: StubbedInstanceWithSinonAccessor<IngredientsRepository>;
  beforeEach(givenStubbedRepository);

  describe('Ingredients()', () => {
    it('get all ingredients', async () => {
      const controller = new IngredientsController(repository);
      repository.stubs.find.resolves();

      const ingredients = await controller.find();

      expect(ingredients);
      sinon.assert.calledWithMatch(repository.stubs.find);

    });

    it('get an ingredients', async () => {
      const controller = new IngredientsController(repository);
      const ingrediente = await controller.find({
        where: {
          Name: 'Ajo'
        },
      });
      repository.stubs.findById.resolves(ingrediente[0]);

      const ingredients = await controller.findById(ingrediente[0].id);

      expect(ingredients).containEql({Name: 'Ajo'});
      sinon.assert.calledWithMatch(repository.stubs.findById, 'id');

    });
  });

  function givenStubbedRepository() {
    repository = createStubInstance(IngredientsRepository);
  }
});
