import {User} from './user';

export interface Comment {
  id: number;
  content: string;
  rating: number;
  author: User;
  publishedOn: Date;
}
