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
  user: User = { username: '', password: '' };

  constructor(
    private dialogRef: MatDialogRef<DialogLoginComponent, User>,
    private authService: AuthService
  ) {}

  onLogIn() {
    // Traitement de la connexion ici
    this.dialogRef.close(); // Ferme la fenêtre de dialogue
  }
}
