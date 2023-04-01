import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  getDetails() {
    const user = window.sessionStorage.getItem('token');
    if (user) {
      const userToken = JSON.parse(user);
      return this.httpClient.get(this.url + "/dashboard/details", {
        headers: new HttpHeaders()
          .set('Content-type', 'application/json')
          .set('Authorization', 'Bearer ' + userToken),
      });
    }
    return this.httpClient.get(this.url + "/dashboard/details");
  }

}
