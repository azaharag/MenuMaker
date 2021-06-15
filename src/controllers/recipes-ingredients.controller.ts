import {
  Count,
  CountSchema,
  Filter, repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Ingredients, RecipeIngredient, Recipes
} from '../models';
import {IngredientsRepository, RecipeIngredientRepository, RecipesRepository} from '../repositories';

export class RecipesIngredientsController {
  constructor(
    @repository(RecipesRepository) protected recipesRepository: RecipesRepository,
    @repository(IngredientsRepository) protected ingredientRepository: IngredientsRepository,
    @repository(RecipeIngredientRepository) protected recipeIngredientRepository: RecipeIngredientRepository
  ) { }

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
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Ingredients>,
  ): Promise<Ingredients[]> {
    return this.recipesRepository.Ingredients(id).find(filter);
  }

  @post('/recipes/{id}/ingredients', {
    responses: {
      '200': {
        description: 'create a Ingredients model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ingredients)}},
      },
    },
  })
  async create(
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
    if (ingrediente == null)
      return this.recipesRepository.Ingredients(id).create(ingredients);
    else {
      //this.ingredientRepository.findById(ingrediente[0].Id);
      let ri: RecipeIngredient = new RecipeIngredient();
      ri.IngredientId = ingrediente[0].Id;
      console.log(id);
      ri.RecipeId = id!;
      this.recipeIngredientRepository.create(ri);
      return ingrediente[0]
    }

  }

  @patch('/recipes/{id}/ingredients', {
    responses: {
      '200': {
        description: 'Recipes.Ingredients PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ingredients, {partial: true}),
        },
      },
    })
    ingredients: Partial<Ingredients>,
    @param.query.object('where', getWhereSchemaFor(Ingredients)) where?: Where<Ingredients>,
  ): Promise<Count> {
    return this.recipesRepository.Ingredients(id).patch(ingredients, where);
  }

  @del('/recipes/{id}/ingredients', {
    responses: {
      '200': {
        description: 'Recipes.Ingredients DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ingredients)) where?: Where<Ingredients>,
  ): Promise<Count> {
    return this.recipesRepository.Ingredients(id).delete(where);
  }
}
