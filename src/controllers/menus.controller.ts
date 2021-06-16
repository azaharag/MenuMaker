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
import {Menus, MenusRecipes, Recipes} from '../models';
import {MenusRecipesRepository, MenusRepository, RecipesRepository} from '../repositories';

export class MenusController {
  constructor(
    @repository(MenusRepository)
    public menusRepository: MenusRepository,
    @repository(RecipesRepository) protected recipesRepository: RecipesRepository,
    @repository(MenusRecipesRepository) protected menusRecipesRepository: MenusRecipesRepository,
  ) { }

  @post('/menus')
  @response(200, {
    description: 'Menus model instance',
    content: {'application/json': {schema: getModelSchemaRef(Menus)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Menus, {
            title: 'NewMenus',
            exclude: ['Id'],
          }),
        },
      },
    })
    menus: Omit<Menus, 'Id'>,
  ): Promise<Menus> {
    return this.menusRepository.create(menus);
  }

  @get('/menus')
  @response(200, {
    description: 'Array of Menus model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Menus, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Menus) filter?: Filter<Menus>,
  ): Promise<Menus[]> {
    return this.menusRepository.find(filter);
  }


  @get('/menus/{id}')
  @response(200, {
    description: 'Menus model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Menus, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Menus, {exclude: 'where'}) filter?: FilterExcludingWhere<Menus>
  ): Promise<Menus> {
    return this.menusRepository.findById(id, filter);
  }

  @put('/menus/{id}')
  @response(204, {
    description: 'Menus PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() menus: Menus,
  ): Promise<void> {
    await this.menusRepository.replaceById(id, menus);
  }

  @del('/menus/{id}')
  @response(204, {
    description: 'Menus DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.menusRepository.deleteById(id);
  }
  //Relación
  @get('/menus/{id}/recipes', {
    responses: {
      '200': {
        description: 'Array of Menus has many Recipes through MenusRecipes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Recipes)},
          },
        },
      },
    },
  })
  async findRel(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Recipes>,
  ): Promise<Recipes[]> {
    return this.menusRepository.recipes(id).find(filter);
  }

  @post('/menus/{id}/recipes', {
    responses: {
      '201': {
        description: 'create a Recipes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Recipes)}},
      },
    },
  })
  async createRel(
    @param.path.string('id') id: typeof Menus.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recipes, {
            title: 'NewRecipesInMenus',
            exclude: ['Id'],
          }),
        },
      },
    }) recipes: Recipes,
  ): Promise<Recipes> {

    let receta = await this.recipesRepository.find({where: {Name: recipes.Name}, });

    if (receta.length > 0) {
      let mr: MenusRecipes = new MenusRecipes();
      mr.MenuId = id!;
      mr.RecipeId = receta[0].id;
      this.menusRecipesRepository.create(mr);
      return receta[0];
    }
    else {
      throw ('Don\'t exist the recipe');
    }
  }

  @del('/menus/{id}/recipes', {
    responses: {
      '204': {
        description: 'Menus.Recipes DELETE success count',
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Recipes)) where?: Where<Recipes>,
  ): Promise<void> {
    await this.menusRepository.recipes(id).delete(where);
  }
}
