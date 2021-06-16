import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, post, put, requestBody,
  response
} from '@loopback/rest';
import {Errors, Ingredients} from '../models';
import {IngredientsRepository} from '../repositories';

export class IngredientsController {
  constructor(
    @repository(IngredientsRepository)
    public ingredientsRepository: IngredientsRepository,
  ) { }

  @post('/ingredients')
  @response(201, {
    description: 'Ingredients model instance',
    content: {'application/json': {schema: getModelSchemaRef(Ingredients)}},
  })
  @response(400, {
    description: 'Bad Request',
    content: {'application/json': {schema: getModelSchemaRef(Errors)}},
  })
  @response(500, {
    description: 'Internal Server Error',
    content: {'application/json': {schema: getModelSchemaRef(Errors)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ingredients, {
            title: 'NewIngredients',
            exclude: ['id'],
          }),
        },
      },
    })
    ingredients: Omit<Ingredients, 'id'>,
  ): Promise<Ingredients> {
    return this.ingredientsRepository.create(ingredients);
  }

  @get('/ingredients')
  @response(200, {
    description: 'Array of Ingredients model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Ingredients, {includeRelations: true}),
        },
      },
    },
  })
  @response(400, {
    description: 'Bad Request',
    content: {'application/json': {schema: getModelSchemaRef(Errors)}},
  })
  @response(404, {
    description: 'Not Found',
    content: {'application/json': {schema: getModelSchemaRef(Errors)}},
  })
  @response(500, {
    description: 'Internal Server Error',
    content: {'application/json': {schema: getModelSchemaRef(Errors)}},
  })
  async find(
    @param.filter(Ingredients) filter?: Filter<Ingredients>,
  ): Promise<Ingredients[]> {
    return this.ingredientsRepository.find(filter);
  }

  @get('/ingredients/{id}')
  @response(200, {
    description: 'Ingredients model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Ingredients, {includeRelations: true}),
      },
    },
  })
  @response(404, {
    description: 'Not Found',
    content: {'application/json': {schema: getModelSchemaRef(Errors)}},
  })
  @response(500, {
    description: 'Internal Server Error',
    content: {'application/json': {schema: getModelSchemaRef(Errors)}},
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Ingredients, {exclude: 'where'}) filter?: FilterExcludingWhere<Ingredients>
  ): Promise<Ingredients> {
    return this.ingredientsRepository.findById(id, filter);
  }

  @put('/ingredients/{id}')
  @response(200, {
    description: 'Ingredients PUT success',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Ingredients, {includeRelations: true}),
      },
    },
  })
  @response(400, {
    description: 'Bad Request',
    content: {'application/json': {schema: getModelSchemaRef(Errors)}},
  })
  @response(404, {
    description: 'Not Found',
    content: {'application/json': {schema: getModelSchemaRef(Errors)}},
  })
  @response(500, {
    description: 'Internal Server Error',
    content: {'application/json': {schema: getModelSchemaRef(Errors)}},
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() ingredients: Ingredients,
  ): Promise<Ingredients> {
    await this.ingredientsRepository.replaceById(id, ingredients);
    return this.ingredientsRepository.findById(id);
  }

  @del('/ingredients/{id}')
  @response(204, {
    description: 'Ingredients DELETE success',
  })
  @response(404, {
    description: 'Not Found',
    content: {'application/json': {schema: getModelSchemaRef(Errors)}},
  })
  @response(500, {
    description: 'Internal Server Error',
    content: {'application/json': {schema: getModelSchemaRef(Errors)}},
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ingredientsRepository.deleteById(id);
  }
}
function ErrorResponse(ErrorResponse: any): import("@loopback/rest").SchemaObject | import("@loopback/rest").ReferenceObject | undefined {
  throw new Error('Function not implemented.');
}

