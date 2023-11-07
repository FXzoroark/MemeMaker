import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/types/user.type';
import { AuthService } from '../shared/services/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogLoginComponent } from '../shared/dialog-login/dialog-login.component';
import { DialogSigninComponent } from '../shared/dialog-signin/dialog-signin.component';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private _signInDialog: MatDialogRef<DialogSigninComponent, User> | undefined;
  constructor(private router: Router, public dialog: MatDialog, private _authService: AuthService) {}

  openSigninDialog() {
    this._signInDialog = this.dialog.open(DialogSigninComponent, {
      width: '300px',
    });

    this._signInDialog.afterClosed().pipe(
      filter((user: User | undefined) => !!user),
      mergeMap((user: User | undefined) => this._authService.signIn(user as User))
    ).subscribe({
      complete: () => (console.log("fini signin"))
    })
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(DialogLoginComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().pipe(
      filter((user: User | undefined) => !!user),
      mergeMap((user: User | undefined) => this._authService.logIn(user as User))
    ).subscribe({
      complete: () => (console.log("fini login"))
    })
  }

  goToHome() {
    // Logique pour le bouton Home
    this.router.navigate(['/']);
  }
}
