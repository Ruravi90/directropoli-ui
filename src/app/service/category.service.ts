import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  categories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.apiBase + "categories")
  }
  category(id:number): Observable<Category> {
    return this.http.get<Category>(environment.apiBase + "categories/" + id)
  }
  create(member:Category): Observable<Category> {
    return this.http.post<Category>(environment.apiBase + "categories",member);
  }
  update(id:number,member:Category): Observable<Category> {
    return this.http.put<Category>(environment.apiBase + "categories/"+id,member);
  }
  delete(id:number): Observable<number> {
    return this.http.delete<number>(environment.apiBase + "categories/"+id);
  }
}
