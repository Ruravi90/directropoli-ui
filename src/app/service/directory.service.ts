import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Directory } from '../models/directory';
import { DirectoryResult } from 'src/app/models/directory-result';


@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  constructor(private http: HttpClient) { }

  directories(): Observable<Directory[]> {
    return this.http.get<Directory[]>(environment.apiBase + "directories");
  }
  directory(id:Number): Observable<Directory> {
    return this.http.get<Directory>(environment.apiBase + "directories/" + id);
  }
  withMembers(id:Number): Observable<Directory[]> {
    return this.http.get<Directory[]>(environment.apiBase + "directories/" + id + "/members");
  }
  search(data:any): Observable<DirectoryResult[]> {
    return this.http.post<DirectoryResult[]>(environment.apiBase + "directories/find", data);
  }
  changeIsPublic(directory:Directory): Observable<Directory> {
    return this.http.put<Directory>(environment.apiBase + "directories/isPublic/" + directory.id, {isPublic: directory.isPublic})
  }
  create(directory:Directory): Observable<Directory> {
    return this.http.post<Directory>(environment.apiBase + "directories", directory);
  }
  update(directory:Directory): Observable<Directory> {
    return this.http.put<Directory>(environment.apiBase + "directories/" + directory.id, directory);
  }
  delete(id:Number): Observable<Number> {
    return this.http.delete<Number>(environment.apiBase + "directories/"+id);
  }
}
