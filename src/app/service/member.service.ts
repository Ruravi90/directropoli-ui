import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Member } from '../models/member';


@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  members(): Observable<Member[]> {
    return this.http.get<Member[]>(environment.apiBase + "members");
  }
  member(id:number): Observable<Member> {
    return this.http.get<Member>(environment.apiBase + "members/" + id);
  }
  create(member:Member): Observable<Member> {
    return this.http.post<Member>(environment.apiBase + "members",member);
  }
  addImages(id:Number, images:any): Observable<Member> {
    return this.http.post<Member>(environment.apiBase + "members/addImages",{ id: id, images: [images] });
  }
  addPromotions(id:Number, promotions:any): Observable<Member> {
    return this.http.post<Member>(environment.apiBase + "members/addPromotions",{ id: id, promotions: [promotions] });
  }
  update(id:number,member:Member): Observable<Member> {
    return this.http.put<Member>(environment.apiBase + "members/"+id,member);
  }
  delete(id:number): Observable<number> {
    return this.http.delete<number>(environment.apiBase + "members/"+id);
  }
}

