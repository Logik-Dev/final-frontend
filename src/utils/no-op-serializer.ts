import {Serializer} from '../models/serializer';
import {Resource} from '../models/resource';

export class NoOpSerializer<T extends Resource> implements Serializer {
  fromJson(json: any): T {
    return json as T;
  }

  toJson(resource: T): any {
    return resource;
  }

}
