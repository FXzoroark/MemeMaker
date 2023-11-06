import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../types/user.type';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.css']
})
export class DialogLoginComponent {

  constructor(
    private _dialogRef: MatDialogRef<DialogLoginComponent, User>,
    private _authService: AuthService
  ) {}

  onCancel(): void{
    this._dialogRef.close();
  }

  onLogIn(user: User) {
    this._dialogRef.close(user); 
  }
}
