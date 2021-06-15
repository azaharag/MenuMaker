import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyThroughRepositoryFactory, repository} from '@loopback/repository';
import {DbmenumakerDataSource} from '../datasources';
import {Ingredients, RecipeIngredient, Recipes, RecipesRelations} from '../models';
import {IngredientsRepository} from './ingredients.repository';
import {RecipeIngredientRepository} from './recipe-ingredient.repository';

export class RecipesRepository extends DefaultCrudRepository<
  Recipes,
  typeof Recipes.prototype.Id,
  RecipesRelations
> {

  public readonly Ingredients: HasManyThroughRepositoryFactory<Ingredients, typeof Ingredients.prototype.Id,
    RecipeIngredient,
    typeof Recipes.prototype.Id
  >;

  constructor(
    @inject('datasources.dbmenumaker') dataSource: DbmenumakerDataSource, @repository.getter('RecipeIngredientRepository') protected recipeIngredientRepositoryGetter: Getter<RecipeIngredientRepository>, @repository.getter('IngredientsRepository') protected ingredientsRepositoryGetter: Getter<IngredientsRepository>,
  ) {
    super(Recipes, dataSource);
    this.Ingredients = this.createHasManyThroughRepositoryFactoryFor('Ingredients', ingredientsRepositoryGetter, recipeIngredientRepositoryGetter,);
  }
}
