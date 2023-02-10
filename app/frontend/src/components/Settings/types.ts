export enum Operations {
  All = 'all',
  Value = 'value',
  COUNT = 'count',
  AVG = 'avg',
  MAX = 'max',
  MIN = 'min',
}

export type Operation = Operations;

export interface QueryType {
  operation: Operation;
  value: string;
}
