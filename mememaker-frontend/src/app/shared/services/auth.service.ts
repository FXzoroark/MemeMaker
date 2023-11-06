import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../types/user.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _backendURL: any;

  constructor(private _http: HttpClient) {
    this._backendURL = {}
    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    // @ts-ignore
    Object.keys(environment.backend.endpoints).forEach(
      (k) =>
        // @ts-ignore
        (this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`)
    );
  }

  signIn(user: User): Observable<any> {
    return this._http.post(`${this._backendURL.signup}`, user);
  }

  logIn(user: User): Observable<any> {
    return this._http.post(`${this._backendURL.login}`, user);
  }
}
