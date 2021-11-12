import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Directory } from '../models/directory';


@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  constructor(private http: HttpClient) { }

  directories(): Observable<Directory[]> {
    return this.http.get<Directory[]>(environment.apiBase + "directories");
  }
  publics(): Observable<Directory[]> {
    return this.http.post<Directory[]>(environment.apiBase + "directories/publics",{});
  }
  directory(id:Number): Observable<Directory> {
    return this.http.get<Directory>(environment.apiBase + "directories/" + id);
  }
  withMembers(id:Number): Observable<Directory[]> {
    return this.http.get<Directory[]>(environment.apiBase + "directories/" + id + "/members");
  }
  publicWithMembers(id:Number): Observable<Directory[]> {
    return this.http.post<Directory[]>(environment.apiBase + "directories/public/" + id + "/members",{});
  }
  getForCode(code:String): Observable<Directory> {
    return this.http.post<Directory>(environment.apiBase + "directories/public/getForCode",{code: code});
  }
  search(data:any): Observable<Directory[]> {
    return this.http.post<Directory[]>(environment.apiBase + "directories/find/", data);
  }
  directoryPublic(directoryId:any): Observable<Directory> {
    return this.http.get<Directory>(environment.apiBase + "directories/find/" + directoryId)
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
