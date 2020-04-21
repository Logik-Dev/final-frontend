import {Resource} from './resource';

export interface Photo extends Resource {
  id: number;
  url: string;
}
