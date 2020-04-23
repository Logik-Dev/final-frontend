import {Resource} from '../models/resource';
import {HttpClient} from '@angular/common/http';
import {Serializer} from '../models/serializer';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';



export class ResourceService<T extends Resource> {
  url = environment.API_URL;
  constructor(private http: HttpClient,
              private endpoint: string,
              private serializer: Serializer,
              private childEndpoint?: string) {}

              public create(item: T): Observable<T> {
                return this.http.post<T>(`${this.url}/${this.endpoint}`, this.serializer.toJson(item)).pipe(
                  map(data => this.serializer.fromJson(data) as T)
                );
              }

              public findById(id: number | string): Observable<T> {
                return this.http.get(`${this.url}/${this.endpoint}/${id}`).pipe(
                  map(data => this.serializer.fromJson(data) as T)
                );
              }

              public findByChildId(id: number): Observable<T> {
                return this.http.get(`${this.url}/${this.endpoint}/${this.childEndpoint}/${id}`).pipe(
                  map(data => this.serializer.fromJson(data) as T)
                );
              }
              public findAll(options?: any): Observable<T[]> {
                  return this.http.get(`${this.url}/${this.endpoint}${this.optionsToString(options)}`).pipe(
                    map(data => this.convert(data))
                  );
              }

              public update(item: T): Observable<T> {
                return this.http.put<T>(`${this.url}/${this.endpoint}`, this.serializer.toJson(item)).pipe(
                  map(data => this.serializer.fromJson(data) as T)
                );
              }

              public delete(id: number) {
                return this.http.delete(`${this.url}/${this.endpoint}/${id}`);
              }

              public exists(options: any): Observable<{result: boolean}> {
                return this.http.get<{result: boolean}>(`${this.url}/${this.endpoint}${this.optionsToString(options)}`);
              }

              private convert(data: any): T[] {
                return data.map(item => this.serializer.fromJson(item) as T);
              }

              private optionsToString(options: any): string {
                  if (options) {
                    let result = '?';
                    Object.keys(options).map(key => result += key + '=' + options[key] + '&');
                    return result.slice(0, -1);
                  } else {
                    return '';
                  }

              }
}
