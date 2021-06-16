import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class MenusRecipes extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'string',
    required: true,
  })
  MenuId: string;

  @property({
    type: 'string',
    required: true,
  })
  RecipeId: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<MenusRecipes>) {
    super(data);
  }
}

export interface MenusRecipesRelations {
  // describe navigational properties here
}

export type MenusRecipesWithRelations = MenusRecipes & MenusRecipesRelations;
