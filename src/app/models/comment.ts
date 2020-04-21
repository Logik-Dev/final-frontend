import {User} from './user';
import {Resource} from './resource';
import {Moment} from 'moment';

export interface Comment extends Resource{
  id?: number;
  content: string;
  rating: number;
  author: User;
  publishedOn: Moment;
}
