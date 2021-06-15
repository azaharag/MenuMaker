import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Recipes} from '../models';
import {RecipesRepository} from '../repositories';

export class RecipeController {
  constructor(
    @repository(RecipesRepository)
    public recipesRepository : RecipesRepository,
  ) {}

  @post('/recipes')
  @response(200, {
    description: 'Recipes model instance',
    content: {'application/json': {schema: getModelSchemaRef(Recipes)}},
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

  @get('/recipes/count')
  @response(200, {
    description: 'Recipes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Recipes) where?: Where<Recipes>,
  ): Promise<Count> {
    return this.recipesRepository.count(where);
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
  async find(
    @param.filter(Recipes) filter?: Filter<Recipes>,
  ): Promise<Recipes[]> {
    return this.recipesRepository.find(filter);
  }

  @patch('/recipes')
  @response(200, {
    description: 'Recipes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recipes, {partial: true}),
        },
      },
    })
    recipes: Recipes,
    @param.where(Recipes) where?: Where<Recipes>,
  ): Promise<Count> {
    return this.recipesRepository.updateAll(recipes, where);
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
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Recipes, {exclude: 'where'}) filter?: FilterExcludingWhere<Recipes>
  ): Promise<Recipes> {
    return this.recipesRepository.findById(id, filter);
  }

  @patch('/recipes/{id}')
  @response(204, {
    description: 'Recipes PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recipes, {partial: true}),
        },
      },
    })
    recipes: Recipes,
  ): Promise<void> {
    await this.recipesRepository.updateById(id, recipes);
  }

  @put('/recipes/{id}')
  @response(204, {
    description: 'Recipes PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() recipes: Recipes,
  ): Promise<void> {
    await this.recipesRepository.replaceById(id, recipes);
  }

  @del('/recipes/{id}')
  @response(204, {
    description: 'Recipes DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.recipesRepository.deleteById(id);
  }
}
