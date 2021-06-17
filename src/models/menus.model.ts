import {Entity, hasMany, model, property} from '@loopback/repository';
import uuid from 'uuid-random';
import {MenusRecipes} from './menus-recipes.model';
import {Recipes} from './recipes.model';

@model({settings: {strict: true}})
export class Menus extends Entity {
  @property({
    type: 'string',
    id: true,
    required: false,
    default: uuid(),
    hidden: true,
  })
  Id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Name: string;

  @property({
    type: 'string',
    required: true,
  })
  ChefId: string;

  @hasMany(() => Recipes, {through: {model: () => MenusRecipes, keyFrom: 'MenuId', keyTo: 'RecipeId'}})
  recipes: Recipes[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Menus>) {
    super(data);
  }
}

export interface MenusRelations {
  // describe navigational properties here
}

export type MenusWithRelations = Menus & MenusRelations;
