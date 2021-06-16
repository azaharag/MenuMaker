import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbmenumakerDataSource} from '../datasources';
import {Menus, MenusRelations, Recipes, MenusRecipes} from '../models';
import {MenusRecipesRepository} from './menus-recipes.repository';
import {RecipesRepository} from './recipes.repository';

export class MenusRepository extends DefaultCrudRepository<
  Menus,
  typeof Menus.prototype.Id,
  MenusRelations
> {

  public readonly recipes: HasManyThroughRepositoryFactory<Recipes, typeof Recipes.prototype.Id,
          MenusRecipes,
          typeof Menus.prototype.Id
        >;

  constructor(
    @inject('datasources.dbmenumaker') dataSource: DbmenumakerDataSource, @repository.getter('MenusRecipesRepository') protected menusRecipesRepositoryGetter: Getter<MenusRecipesRepository>, @repository.getter('RecipesRepository') protected recipesRepositoryGetter: Getter<RecipesRepository>,
  ) {
    super(Menus, dataSource);
    this.recipes = this.createHasManyThroughRepositoryFactoryFor('recipes', recipesRepositoryGetter, menusRecipesRepositoryGetter,);
    this.registerInclusionResolver('recipes', this.recipes.inclusionResolver);
  }
}
