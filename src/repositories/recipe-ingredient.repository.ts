import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbmenumakerDataSource} from '../datasources';
import {RecipeIngredient, RecipeIngredientRelations} from '../models';

export class RecipeIngredientRepository extends DefaultCrudRepository<
  RecipeIngredient,
  typeof RecipeIngredient.prototype.Id,
  RecipeIngredientRelations
> {
  constructor(
    @inject('datasources.dbmenumaker') dataSource: DbmenumakerDataSource,
  ) {
    super(RecipeIngredient, dataSource);
  }
}
