import { Component, EventEmitter, Output } from '@angular/core';
import { MemeSelected } from '../types/meme-selected.type';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-upload-template',
  templateUrl: './form-upload-template.component.html',
  styleUrls: ['./form-upload-template.component.css']
})
export class FormUploadTemplateComponent {

  private readonly _cancel$: EventEmitter<void>;
  private readonly _submit$: EventEmitter<MemeSelected>;
  private readonly _form: FormGroup;

  constructor(){
    this._submit$ = new EventEmitter<MemeSelected>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();
  }

  
  get form(): FormGroup{
    return this._form;
  }

  @Output('cancel')
  get cancel$(): EventEmitter<void> {
    return this._cancel$;
  }

  @Output('submit')
  get submit$(): EventEmitter<MemeSelected> {
    return this._submit$;
  }


  cancel(): void{
    this._cancel$.emit();
  }

  submit(file: File): void {
    this._submit$.emit({meme: {title: file.name.split(".")[0], dragboxesDatas: [{left:10, top:10, rot:0, width:100, height:100, content:""}]}, canvaUrl: URL.createObjectURL(file)});
  }

  onFileDropped(fileList: any){
    this._form.get("imageInput")?.setValue(fileList[0]);
  }

  private _buildForm(): FormGroup {
    return new FormGroup({
      imageInput: new FormControl(null, Validators.compose([Validators.required, this.imageValidator, this.sizeValidator]))
    })
  }

  imageValidator(control: AbstractControl): ValidationErrors | null {
    const file = <File>control.value;
    return (!file || ["image/jpeg", "image/png", "image/jpg"].includes(file.type)) ? null : {'errorType': 'The file need to be an jpeg or png or jpg'};
  }
  sizeValidator(control: AbstractControl): ValidationErrors | null {
    const file = <File>control.value
    return (!file || file.size < 1e7) ? null : {'errorSize': 'File size need to be less than 10Mo'}
  }

}
