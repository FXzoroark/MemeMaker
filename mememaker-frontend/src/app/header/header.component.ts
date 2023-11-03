import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/types/user.type';
import { AuthService } from '../shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from '../shared/dialog-login/dialog-login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  constructor(private router: Router, public dialog: MatDialog) {}

  onSignIn() {
    
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(DialogLoginComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {

    });
  }

  goToHome() {
    // Logique pour le bouton Home
    this.router.navigate(['/']);
  }
}
