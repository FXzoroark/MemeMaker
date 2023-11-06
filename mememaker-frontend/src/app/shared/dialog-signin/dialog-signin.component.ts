import { Component } from '@angular/core';
import { User } from '../types/user.type';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dialog-signin',
  templateUrl: './dialog-signin.component.html',
  styleUrls: ['./dialog-signin.component.css']
})
export class DialogSigninComponent {

  constructor(
    private _dialogRef: MatDialogRef<DialogSigninComponent, User>,
    private _authService: AuthService
  ) {}

  onCancel(): void{
    this._dialogRef.close();
  }

  onSignIn(user: User) {
    //console.log(user);
    //this._authService.logIn(user);
    this._dialogRef.close(user); 
  }

}
