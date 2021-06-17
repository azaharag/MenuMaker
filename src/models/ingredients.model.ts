import {Entity, model, property} from '@loopback/repository';
import uuid from 'uuid-random';

@model({settings: {strict: true}})
export class Ingredients extends Entity {
  @property({
    id: true,
    type: 'string',
    required: false,
    default: uuid(),
    hidden: true,
  })
  Id: string;

  @property({
    type: 'string',
    required: true,
  })
  Name: string;

  @property({
    type: 'string',
    required: true,
  })
  Type: string;

  @property({
    type: 'number',
    required: true,
  })
  Calories: number;

  @property({
    type: 'string',
  })
  Photo?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Ingredients>) {
    super(data);
  }
}

export interface IngredientsRelations {
  // describe navigational properties here
}

export type IngredientsWithRelations = Ingredients & IngredientsRelations;
