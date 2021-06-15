import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class RecipeIngredient extends Entity {
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
  RecipeId: string;

  @property({
    type: 'string',
    required: true,
  })
  IngredientId: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<RecipeIngredient>) {
    super(data);
  }
}

export interface RecipeIngredientRelations {
  // describe navigational properties here
}

export type RecipeIngredientWithRelations = RecipeIngredient & RecipeIngredientRelations;
