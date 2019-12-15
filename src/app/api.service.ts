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
    let url = this.url + 'login'
    return this.http.post(url,data);
  }

  public newUser( data ){
    let url = this.url + 'user/sign-up'
    return this.http.post(url, data);
  }

  public newClient( data ){
    let url = this.url + 'client/create'
    return this.http.post(url, data);
  }

  public newEntity( data ){
    let url = this.url + 'entity/create'
    return this.http.post(url, data);
  }

  public getEntities(  ){
    let url = this.url + 'entity/all-entities'
    return this.http.get(url);
  }

  public getUserByParam( param ){
    let url = this.url + 'user/search?param=' + param;
    return this.http.get(url);
  }
}
