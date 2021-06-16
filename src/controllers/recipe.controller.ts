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
import {Errors, Recipes} from '../models';
import {IngredientsRepository, RecipeIngredientRepository, RecipesRepository} from '../repositories';

export class RecipeController {
  constructor(
    @repository(RecipesRepository)
    public recipesRepository: RecipesRepository,
    @repository(IngredientsRepository) protected ingredientRepository: IngredientsRepository,
    @repository(RecipeIngredientRepository) protected recipeIngredientRepository: RecipeIngredientRepository
  ) { }

  @post('/recipes')
  @response(201, {
    description: 'Recipes model instance',
    content: {'application/json': {schema: getModelSchemaRef(Recipes)}},
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
          schema: getModelSchemaRef(Recipes, {
            title: 'NewRecipes',
            exclude: ['Id'],
          }),
        },
      },
    })
    recipes: Omit<Recipes, 'Id'>,
  ): Promise<Recipes> {
    return this.recipesRepository.create(recipes);
  }

  @get('/recipes')
  @response(200, {
    description: 'Array of Recipes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Recipes, {includeRelations: true}),
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
    @param.filter(Recipes) filter?: Filter<Recipes>,
  ): Promise<Recipes[]> {
    return this.recipesRepository.find(filter);
  }

  @get('/recipes/{id}')
  @response(200, {
    description: 'Recipes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Recipes, {includeRelations: true}),
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
    @param.filter(Recipes, {exclude: 'where'}) filter?: FilterExcludingWhere<Recipes>
  ): Promise<Recipes> {
    return this.recipesRepository.findById(id, filter);
  }

  @put('/recipes/{id}')
  @response(200, {
    description: 'Recipes PUT success',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Recipes, {includeRelations: true}),
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
    @requestBody() recipes: Recipes,
  ): Promise<Recipes> {
    await this.recipesRepository.replaceById(id, recipes);
    return this.recipesRepository.findById(id);
  }

  @del('/recipes/{id}')
  @response(204, {
    description: 'Recipes DELETE success',
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
    await this.recipesRepository.deleteById(id);
  }
}
