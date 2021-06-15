import {Entity, model, property, hasMany} from '@loopback/repository';
import uuid from 'uuid-random';
import {Ingredients} from './ingredients.model';
import {RecipeIngredient} from './recipe-ingredient.model';

@model({settings: {strict: false}})
export class Recipes extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  Category: string;

  @property({
    type: 'string',
    id: true,
    required: false,
    default: uuid()
  })
  Id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Kitchen_type: string;

  @property({
    type: 'string',
    required: true,
  })
  Dish_type: string;

  @property({
    type: 'number',
    required: true,
  })
  Difficulty: number;

  @property({
    type: 'string',
    required: true,
  })
  Time: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  Steps: string[];

  @hasMany(() => Ingredients, {through: {model: () => RecipeIngredient, keyFrom: 'RecipeId', keyTo: 'IngredientId'}})
  Ingredients: Ingredients[];
  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Recipes>) {
    super(data);
  }
}

export interface RecipesRelations {
  // describe navigational properties here
}

export type RecipesWithRelations = Recipes & RecipesRelations;
