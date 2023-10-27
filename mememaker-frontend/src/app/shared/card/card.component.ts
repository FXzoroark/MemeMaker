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

  @ViewChild("canvas") canvas!: ElementRef<HTMLCanvasElement>;

  private _meme : Meme
  

  constructor(private _router: Router, private _memesService: MemesService){
    this._meme = {} as Meme
  }

  get meme(): Meme{
    return this._meme;
  }

  @Input()
  set meme(meme: Meme){
    console.log(meme)
    this._meme = meme;
    this._updateCanvas();
  }

  private _updateCanvas(): void{
    this._memesService.fetchCanva(this.meme.path!)
    .subscribe({
      next: (res: Blob) => {
        let img = new Image
        img.src = URL.createObjectURL(res).toString();
        img.onload = () => {
          this.canvas.nativeElement.width = img.width;
          this.canvas.nativeElement.height = img.height;

          let displayedctx: any = this.canvas.nativeElement.getContext("2d");
          displayedctx.drawImage(img, 0, 0);
          displayedctx.save();
        }
      }
    })
  }

}
