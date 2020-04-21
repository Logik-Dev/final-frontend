import {Serializer} from '../models/serializer';
import {Comment} from '../models/comment';
import * as moment from 'moment';
import {DATE_TIME_FORMAT} from './dates';

export class CommentSerializer implements Serializer {
  fromJson(json: any): Comment {
    const comment: Comment = {...json};
    comment.publishedOn = moment(json.publishedOn, DATE_TIME_FORMAT).locale('fr');
    return comment;
  }

  toJson(comment: Comment): any {
    return comment;
  }

}
