const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const { mockReq, mockRes } = require('sinon-express-mock');

const controller = require('../../controllers/ingredients.controller.ts');

const Ingredient = require('../../models/ingredients.model');

chai.use(sinonChai);
const expect = chai.expect;

let TodoMock;
describe('Ingredients unit test', () => {
  describe('/GET ingredients', () => {
    it('GET all', (done) => {
      const expectedResult = [];
      TodoMock = sinon.mock(Ingredient);
      TodoMock.expects('find').yields(null, expectedResult);

      const req = mockReq();
      const res = mockRes();

      controller.Find(req, res);

      TodoMock.verify();
      expect(res.json).to.be.calledWith(expectedResult);

      done();
    });
  })
})
