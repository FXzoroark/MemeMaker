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

  private readonly _cancel$: EventEmitter<void>;
  private readonly _submit$: EventEmitter<User>;

  constructor(private formBuilder: FormBuilder) {
    this._cancel$ = new EventEmitter<void>;
    this._submit$ = new EventEmitter<User>
    this.userForm = this._buildForm(); // Utilisation de la méthode _buildForm pour créer le FormGroup
  }
  @Output('cancel')
  get cancel$(): EventEmitter<void> {
    return this._cancel$;
  }

  @Output('submit')
  get submit$(): EventEmitter<User> {
    return this._submit$;
  }

  cancel(): void {
    this._cancel$.emit();
  }

  submit(): void {
    if (this.userForm.valid) {
      const userData: User = this.userForm.value as User;
      this._submit$.emit(userData);
    }
  }

  private _buildForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
}
