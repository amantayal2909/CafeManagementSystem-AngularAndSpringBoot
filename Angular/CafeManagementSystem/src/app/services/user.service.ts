import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  signup(data: any) {
    const user = localStorage.getItem('token');
    console.log(user);

    // const userToken = JSON.parse(user)

    return this.httpClient.post(this.url + '/user/signup', data, {
      headers: new HttpHeaders()
        .set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + user),
    });
  }

  forgotPassword(data: any) {
    return this.httpClient.post(this.url + '/user/forgotPassword', data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  login(data: any) {
    return this.httpClient.post(this.url + '/user/login', data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  checkToken() {
    // const user = localStorage.getItem('token');
    const user = window.sessionStorage.getItem('token');
    console.log(user);
    if (user) {
      const userToken = JSON.parse(user);
      return this.httpClient.get(this.url + '/user/checkToken', {
        headers: new HttpHeaders()
          .set('Content-type', 'application/json')
          .set('Authorization', 'Bearer ' + userToken),
      });
    }
    return this.httpClient.get(this.url + '/user/checkToken', {
      headers: new HttpHeaders()
        .set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + user),
    });
  }

  changePassword(data: any) {
    return this.httpClient.post(this.url + '/user/changePassword', data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  getUsers() {
    return this.httpClient.get(this.url + '/user/get');
  }

  update(data: any) {
    return this.httpClient.post(this.url + '/user/update', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
