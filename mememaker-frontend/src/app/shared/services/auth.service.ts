// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user/user.model';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  signIn(user: User) {
    return this.http.post('/api/user/signin', user);
  }

  logIn(user: User) {
    return this.http.post('/api/user/login', user);
  }
}
