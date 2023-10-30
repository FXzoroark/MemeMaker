import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/user/user.model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  user: User = { username: '', password: '' };

  constructor(private router: Router, private authService: AuthService) {}

  onSignIn(user: User) {
    this.authService.signIn(user).subscribe((response) => {
      // Traiter la réponse de l'authentification ici
    });
  }

  onLogIn(user: User) {
    this.authService.logIn(user).subscribe((response) => {
      // Traiter la réponse de la connexion ici
    });
  }

  goToHome() {
    // Logique pour le bouton Home
    this.router.navigate(['/']);
  }
}
