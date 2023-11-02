import { Component, ElementRef, Input, ViewChild } from '@angular/core';
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

  private _meme : Meme
  

  constructor(private _router: Router, private _memesService: MemesService){
    this._meme = {} as Meme
  }

  get meme(): Meme{
    return this._meme;
  }

  @Input()
  set meme(meme: Meme){
    this._meme = meme;
    this._updateCanvas();
  }

  private _updateCanvas(): void{
    this._memesService.fetchCanva(this.meme.path!)
    .subscribe({
      next: (res: Blob) => {
        this.image.nativeElement.src = URL.createObjectURL(res).toString();
        this.image.nativeElement.alt = this.meme.title;
      }
    })
  }

}
