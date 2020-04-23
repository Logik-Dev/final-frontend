import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  url = environment.API_URL;
  constructor(private http: HttpClient) {}

  public upload(photos: File[], roomId: number): Observable<{result: string}> {
    const formData = new FormData();
    photos.forEach(photo => {
      formData.append('files', photo, photo.name);
    });
    return this.http.post<{result: string}>(`${this.url}/photos/rooms/${roomId}`, formData);
  }

}
