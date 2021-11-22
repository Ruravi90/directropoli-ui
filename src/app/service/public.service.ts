import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Directory } from '../models/directory';
import { Member } from '../models/member';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(private http: HttpClient) { }

  publics(): Observable<Directory[]> {
    return this.http.post<Directory[]>(environment.apiBase + "public/directories/publics",{});
  }
  search(data:any): Observable<Directory[]> {
    return this.http.post<Directory[]>(environment.apiBase + "public/directories/search",data);
  }
  publicWithMembers(id:Number): Observable<Directory[]> {
    return this.http.post<Directory[]>(environment.apiBase + "public/directories/" + id + "/members",{});
  }
  getForCodeDirectory(code:String): Observable<Directory> {
    return this.http.post<Directory>(environment.apiBase + "public/directories/getForCode",{code: code});
  }
  publicDirectory(directoryId:any): Observable<Directory> {
    return this.http.post<Directory>(environment.apiBase + "public/directories/" + directoryId,{});
  }

  publicMember(id:number): Observable<Member> {
    return this.http.post<Member>(environment.apiBase + "public/members/" + id,{});
  }
  getForCodeMember(code:String): Observable<Member> {
    return this.http.post<Member>(environment.apiBase + "public/members/getForCode",{code: code});
  }
  createMemberPublic(member:Member): Observable<Member> {
    return this.http.post<Member>(environment.apiBase + "public/members/join",member);
  }

  categories(): Observable<Category[]> {
    return this.http.post<Category[]>(environment.apiBase + "public/categories",{});
  }
}
