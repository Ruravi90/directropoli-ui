import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MercadopagoService {

  constructor(private http: HttpClient) { }

  monthPro(data:any): Observable<any> {
    return this.http.post<any>(environment.apiBase + "mercadopago/checkout_month_pro",data);
  }
  yearPro(data:any): Observable<any> {
    return this.http.post<any>(environment.apiBase + "mercadopago/checkout_year_pro",data);
  }
}
