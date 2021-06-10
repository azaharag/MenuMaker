import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbmenumakerDataSource} from '../datasources';
import {Ingredients, IngredientsRelations} from '../models';

export class IngredientsRepository extends DefaultCrudRepository<
  Ingredients,
  typeof Ingredients.prototype.Id,
  IngredientsRelations
> {
  constructor(
    @inject('datasources.dbmenumaker') dataSource: DbmenumakerDataSource,
  ) {
    super(Ingredients, dataSource);
  }
}
