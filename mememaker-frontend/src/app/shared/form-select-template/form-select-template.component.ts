import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MemesService } from '../services/memes.service';
import { Meme } from '../types/meme.type';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MemeSelected } from '../types/meme-selected.type';

@Component({
  selector: 'app-form-select-template',
  templateUrl: './form-select-template.component.html',
  styleUrls: ['./form-select-template.component.css']
})
export class FormSelectTemplateComponent implements AfterViewInit {

  private _blanksMemes: Meme[];
  private _memesImgUrls: any;
  private readonly _cancel$: EventEmitter<void>;
  private readonly _submit$: EventEmitter<MemeSelected>;
  private readonly _form: FormGroup;

  constructor(
    private _memesService: MemesService,
  ){
    this._blanksMemes = [];
    this._memesImgUrls = {}
    this._submit$ = new EventEmitter<MemeSelected>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();
  }

  get blanksMemes(): Meme[]{
    return this._blanksMemes;
  }

  get memesImgUrls(): any{
    return this._memesImgUrls;
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

  ngAfterViewInit(): void {
    this._memesService
    .fetchBlanks()
    .subscribe({next: (memes: Meme[]) => {
      this._blanksMemes = memes
      this._blanksMemes.forEach(element => {
        this._memesService.fetchCanva(element.path!)
        .subscribe({
          next: (res: Blob) => {
            let img = URL.createObjectURL(res)
            this._memesImgUrls[element.id!] = img;
          }
        })
       });
    }});
  }

  cancel(): void{
    this._cancel$.emit();
  }

  submit(meme: Meme): void{
    this._submit$.emit({meme: meme, canvaUrl: (this._memesImgUrls[meme.id!]).slice()});
  }


  private _buildForm(): FormGroup{
    return new FormGroup({
      blankMeme: new FormControl<Meme | null>(null, Validators.compose([Validators.required]))
    })
  }

}
