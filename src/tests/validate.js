const fs = require('fs');
const path = require('path');

const Validator = require('json-schema').Validator;

const doc = fs.readFileSync(path.join(__dirname, 'openapi.json'), 'utf8');


exports.validate = (options) => {
  //const validator = new Validator();
  //Validator.addSchema(doc['components'].Task, '/#/definitions/Task');
  Validator.addSchema(doc.components.schema.errors, '/#/components/schemas/Errors');

  const response = doc['paths'][options.path][options.method].responses[options.status];
  const validate = Validator.validate(options.value, response.schema, { base: '/' });
  if (!validate.valid) return validate.errors[0];

  return null;
};
