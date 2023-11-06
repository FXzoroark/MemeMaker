// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../types/user.type';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  signIn(user: User) {
    // this.authService.signIn(user).subscribe((response) => {
    //   // Traiter la réponse de l'authentification ici
    // });
    return this.http.post('/api/user/signin', user);
  }

  logIn(user: User) {
    // this.authService.logIn(user).subscribe((response) => {
    //   // Traiter la réponse de la connexion ici
    // });
    //console.log("Reached auth service");
    return this.http.post('/api/user/login', user);
  }
}
