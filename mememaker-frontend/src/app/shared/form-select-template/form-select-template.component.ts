import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MemesService } from '../services/memes.service';
import { Meme } from '../types/meme.type';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-select-template',
  templateUrl: './form-select-template.component.html',
  styleUrls: ['./form-select-template.component.css']
})
export class FormSelectTemplateComponent implements AfterViewInit {

  private _blanksmemes: Meme[];
  private _imgMemes: any;
  private readonly _cancel$: EventEmitter<void>;
  private readonly _submit$: EventEmitter<Meme>;
  private readonly _form: FormGroup;
  private readonly _environment;

  constructor(
    private _memesService: MemesService,
  ){
    this._blanksmemes = [];
    this._imgMemes = {}
    this._submit$ = new EventEmitter<Meme>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();
    this._environment = environment;
  }

  get blanksmemes(): Meme[]{
    return this._blanksmemes;
  }

  get imgMemes(): any{
    return this._imgMemes;
  }
  
  get form(): FormGroup{
    return this._form;
  }

  get environment(): any{
    return this._environment;
  }

  @Output('cancel')
  get cancel$(): EventEmitter<void> {
    return this._cancel$;
  }

  @Output('submit')
  get submit$(): EventEmitter<Meme> {
    return this._submit$;
  }

  ngAfterViewInit(): void {
    //this._memesService.fetchCanva("ds")
    this._memesService
    .fetchBlanks()
    .subscribe({next: (memes: Meme[]) => {
      this._blanksmemes = memes
      this._blanksmemes.forEach(element => {
        fetch("http://0.0.0.0:3000" + element.path)
        .then(res => res.blob())
        .then(blob =>{
          let img = URL.createObjectURL(blob);
          this._imgMemes[element.id!] = img
          console.log(this._imgMemes)
        });
      });
    }});
  }

  cancel(): void{
    console.log(this._blanksmemes)
    this._cancel$.emit();
  }

  submit(meme: Meme): void{
    this._submit$.emit(meme);
  }


  private _buildForm(): FormGroup{
    return new FormGroup({
      blank_meme: new FormControl<Meme | null>(null, Validators.compose([Validators.required]))
    })
  }

}
