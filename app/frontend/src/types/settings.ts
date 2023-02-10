export enum SettingType {
  INT = 'INT64',
  FLOAT = 'FLOAT64',
  STRING = 'STRING',
  TIME = 'TIMESTAMP',
}

export interface Setting {
  type: SettingType;
  name: string;
}

export type Settings = Setting[];
