import {Resource} from './resource';

export interface Address extends Resource {
  id?: number;
  label: string;
  zipCode: number;
  longitude: number;
  latitude: number;
  city: string;
}
