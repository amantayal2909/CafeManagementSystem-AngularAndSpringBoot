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
    console.log("get details" ,user);
    
    if (user) {
      const userToken = JSON.parse(user);
      console.log("inside if", userToken);
      
      return this.httpClient.get(this.url + "/dashboard/details", {
        headers: new HttpHeaders()
          .set('Content-type', 'application/json')
          .set('Authorization', 'Bearer ' + userToken),
      });
    }
    return this.httpClient.get(this.url + "/dashboard/details");
  }

}
