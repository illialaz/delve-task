import { Settings } from '../types/settings';
import http from './axios';

export const getSettings = async (): Promise<Settings> => {
  return await new Promise((resolve, reject) => {
    http
      .get<Settings>('/')
      .then((res) => resolve(res.data))
      .catch((e) => reject(e));
  });
};
