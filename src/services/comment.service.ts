import {Injectable} from '@angular/core';
import {ResourceService} from './resource.service';
import {Comment} from '../models/comment';
import {HttpClient} from '@angular/common/http';
import {CommentSerializer} from '../utils/comment-serializer';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends ResourceService<Comment> {

  constructor(http: HttpClient) {
    super(http, 'comments', new CommentSerializer());
  }
}
