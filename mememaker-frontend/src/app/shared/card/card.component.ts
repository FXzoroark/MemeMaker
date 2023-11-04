import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Meme } from '../types/meme.type';
import { Router } from '@angular/router';
import { MemesService } from '../services/memes.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @ViewChild("img") image!: ElementRef<HTMLImageElement>;
  @ViewChild("downloadButton") downloadButton!: ElementRef<HTMLLinkElement>;

  private readonly _delete$: EventEmitter<Meme>;

  private _meme : Meme
  

  constructor(private _router: Router, private _memesService: MemesService){
    this._meme = {} as Meme
    this._delete$ = new EventEmitter<Meme>();
  }

  get meme(): Meme{
    return this._meme;
  }

  @Input()
  set meme(meme: Meme){
    this._meme = meme;
    this._updateCanvas();
  }

  @Output('deleteMeme') get delete$(): EventEmitter<Meme> {
    return this._delete$;
  }

  delete(meme: Meme): void {
    this._delete$.emit(meme);
  }

  private _updateCanvas(): void{
    this._memesService.fetchCanva(this.meme.path!)
    .subscribe({
      next: (res: Blob) => {
        const url = URL.createObjectURL(res).toString()
        this.image.nativeElement.src = url;
        this.image.nativeElement.alt = this.meme.title;
        this.downloadButton.nativeElement.href = url;
      }
    })
  }

  isUpdateDateShowable(): boolean{
    return (new Date(this._meme.updatedAt!).getTime() - new Date(this._meme.createdAt!).getTime() > 3000) //time between > 3 secs (mongodb creation date purpose)
  }

}
