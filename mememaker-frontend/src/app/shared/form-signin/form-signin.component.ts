import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../types/user.type';

@Component({
  selector: 'app-form-signin',
  templateUrl: './form-signin.component.html',
  styleUrls: ['./form-signin.component.css']
})
export class FormSigninComponent {
  userForm: FormGroup;

  @Output('cancel')
  cancel$: EventEmitter<void> = new EventEmitter<void>();

  @Output('submit')
  submit$: EventEmitter<User> = new EventEmitter<User>();

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this._buildForm(); // Utilisation de la méthode _buildForm pour créer le FormGroup
  }

  cancel(): void {
    this.cancel$.emit();
  }

  submit(): void {
    if (this.userForm.valid) {
      const userData: User = this.userForm.value as User;
      this.submit$.emit(userData);
    }
  }

  private _buildForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
}
