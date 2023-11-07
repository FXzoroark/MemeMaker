import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { User } from '../types/user.type';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent {
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
