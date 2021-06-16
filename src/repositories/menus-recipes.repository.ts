import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbmenumakerDataSource} from '../datasources';
import {MenusRecipes, MenusRecipesRelations} from '../models';

export class MenusRecipesRepository extends DefaultCrudRepository<
  MenusRecipes,
  typeof MenusRecipes.prototype.Id,
  MenusRecipesRelations
> {
  constructor(
    @inject('datasources.dbmenumaker') dataSource: DbmenumakerDataSource,
  ) {
    super(MenusRecipes, dataSource);
  }
}
