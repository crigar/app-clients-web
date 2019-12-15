import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  public login( data ){
    let url = this.url + 'user/sign-up'
    return this.http.post(url, data);
  }

  public newUser( data ){
    let url = this.url + 'user/sign-up'
    return this.http.post(url, data);
  }
}
