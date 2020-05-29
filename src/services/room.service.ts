import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Room} from '../models/room';
import {ResourceService} from './resource.service';
import {RoomSerializer} from '../utils/room-serializer';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomService extends ResourceService<Room> {
  url = environment.API_URL;

  constructor(http: HttpClient) {
    super(http, 'rooms', new RoomSerializer(), 'users');
  }

  public search(query: string): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.url}/${this.endpoint}/search?query=${query}`);
  }

  nameAvailable(): AsyncValidatorFn {
    return (nameControl: AbstractControl): Observable<ValidationErrors | null> => {
      const name = nameControl.value;
      return this.exists({name}).pipe(
        map(response => response.result ? {nameExists: true} : null)
      );
    };
  }
}
