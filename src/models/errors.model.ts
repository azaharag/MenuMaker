import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Errors extends Model {
  @property({
    type: 'number',
    required: true,
  })
  code: number;

  @property({
    type: 'string',
    required: true,
  })
  message: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Errors>) {
    super(data);
  }
}

export interface ErrorsRelations {
  // describe navigational properties here
}

export type ErrorsWithRelations = Errors & ErrorsRelations;
