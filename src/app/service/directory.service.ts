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
    return this.http.get<Directory[]>(environment.apiBase + "directories")
  }
  directory(id:number): Observable<Directory> {
    return this.http.get<Directory>(environment.apiBase + "directories/" + id)
  }
  withMembers(id:number): Observable<Directory[]> {
    return this.http.get<Directory[]>(environment.apiBase + "directories/" + id + "/members")
  }
  search(data:any): Observable<Directory[]> {
    return this.http.post<Directory[]>(environment.apiBase + "directories/find/",data)
  }
  directoryPublic(directoryId:any): Observable<Directory> {
    return this.http.get<Directory>(environment.apiBase + "directories/find/"+directoryId)
  }
  create(directory:Directory): Observable<Directory> {
    return this.http.post<Directory>(environment.apiBase + "directories",directory);
  }
  update(id:number,directory:Directory): Observable<Directory> {
    return this.http.put<Directory>(environment.apiBase + "directories/"+id,directory);
  }
  delete(id:number): Observable<number> {
    return this.http.delete<number>(environment.apiBase + "directories/"+id);
  }
}
