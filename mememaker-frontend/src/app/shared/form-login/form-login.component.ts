import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { User } from '../types/user.type';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent {
  private _user: User = { username: '', password: '' };
  private readonly _cancel$: EventEmitter<void>;
  private readonly _submit$: EventEmitter<User>;
  private readonly _form: FormGroup; // Utilisez le modificateur d'accès public

  constructor() {
    this._submit$ = new EventEmitter<User>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm(); // Utilisez la propriété publique
  }

  get form(): FormGroup{
    return this._form;
  }

  get user(): User{
    return this._user;
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
    this._submit$.emit(this._user);
  }

  private _buildForm(): FormGroup {
    return new FormGroup({
      user: new FormGroup({
        username: new FormControl(this.user.username, Validators.required),
        password: new FormControl(this.user.password, Validators.required)
      })
    });
  }
}
