import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class ApiserviceService {
  Url = environment.apiDomain;
  constructor(private http: HttpClient) {
    environment;
  }

  get(params: any) {
    return this.http.get(`${this.Url}${params}`).pipe(map((res) => res), catchError(error => {
      return throwError(error);
    }));
  }
  put(params: any, data?: any) {
    return this.http.put(`${this.Url}${params}`, data).pipe(map((res) => res), catchError(error => {
      return throwError(error);
    }));
  }
  post(params: any, data?: any) {
    return this.http.post(`${this.Url}${params}`, data).pipe(map((res) => res), catchError(error => {
      return throwError(error);
    }));
  }
}
