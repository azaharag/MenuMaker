import {
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, getWhereSchemaFor, param, post, put, requestBody,
  response
} from '@loopback/rest';
import {Errors, Ingredients, RecipeIngredient, Recipes} from '../models';
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
  //Relación Receta-Ingredientes
  @get('/recipes/{id}/ingredients', {
    responses: {
      '200': {
        description: 'Array of Recipes has many Ingredients through RecipeIngredient',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ingredients)},
          },
        },
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
  async findRel(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Ingredients>,
  ): Promise<Ingredients[]> {
    return this.recipesRepository.Ingredients(id).find(filter);
  }

  @post('/recipes/{id}/ingredients', {
    responses: {
      '201': {
        description: 'create a Ingredients model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ingredients)}},
      },
    },
  })
  @response(400, {
    description: 'Bad Request',
    content: {'application/json': {schema: getModelSchemaRef(Errors)}},
  })
  @response(500, {
    description: 'Internal Server Error',
    content: {'application/json': {schema: getModelSchemaRef(Errors)}},
  })
  async createRel(
    @param.path.string('id') id: typeof Recipes.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ingredients, {
            title: 'NewIngredientsInRecipes',
            //exclude: ['Id'],
          }),
        },
      },
    }) ingredients: Ingredients,
  ): Promise<Ingredients> {

    let ingrediente = await this.ingredientRepository.find({
      where: {
        Name: ingredients.Name
      },
    });
    console.log(ingrediente);
    if (ingrediente.length == 0) {
      return this.recipesRepository.Ingredients(id).create(ingredients);
    }
    else {
      //this.ingredientRepository.findById(ingrediente[0].Id);
      let ri: RecipeIngredient = new RecipeIngredient();
      ri.IngredientId = ingrediente[0].Id;
      ri.RecipeId = id!;
      this.recipeIngredientRepository.create(ri);
      return ingrediente[0]
    }
  }

  @del('/recipes/{id}/ingredients', {
    responses: {
      '204': {
        description: 'Recipes.Ingredients DELETE success',
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
  async deleteRel(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ingredients)) where?: Where<Ingredients>,
  ): Promise<void> {
    await this.recipesRepository.Ingredients(id).delete(where);
  }
}
