import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbmenumakerDataSource} from '../datasources';
import {Recipes, RecipesRelations} from '../models';

export class RecipesRepository extends DefaultCrudRepository<
  Recipes,
  typeof Recipes.prototype.Id,
  RecipesRelations
> {
  constructor(
    @inject('datasources.dbmenumaker') dataSource: DbmenumakerDataSource,
  ) {
    super(Recipes, dataSource);
  }
}
