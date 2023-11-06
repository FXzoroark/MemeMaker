import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  
  constructor(private router: Router) {}

  signIn() {
    // Logique pour la page "Sign in"
  }

  logIn() {
    // Logique pour la page "Log in"
  }

  goToHome() {
    // Logique pour le bouton Home
    this.router.navigate(['/']);
  }
}
