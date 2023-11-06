import { Component, OnInit } from '@angular/core';
import { MemeSelected } from '../shared/types/meme-selected.type';
import { ActivatedRoute, Router } from '@angular/router';
import { MemesService } from '../shared/services/memes.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogMemeComponent } from '../shared/dialog-meme/dialog-meme.component';
import { Meme } from '../shared/types/meme.type';
import { Observable, filter, map, mergeMap } from 'rxjs';
import { MemeToProcess } from '../shared/types/meme-to-process.type';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit{

  private _memesDialog: MatDialogRef<DialogMemeComponent, MemeToProcess> | undefined;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _memesService: MemesService,
    private _dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this._route.params
        .pipe(
          map((params: any) => params.id),
          mergeMap((id:string) => this._memesService.fetchOne(id))
        )
        .subscribe((meme: Meme) => {
          this._memesService.fetchOne(meme.id_blank!)
              .subscribe((memeBlank) => {
                this._memesService.fetchCanva(memeBlank.path!)
                .subscribe((blob: Blob) => this._initModal({meme, canvaUrl: URL.createObjectURL(blob)})
                )
              })
        })
  }




  private _initModal(memeSelected: MemeSelected): void {
    this._memesDialog = this._dialog.open(DialogMemeComponent, {
      position:{left: "20%"},
      width: '60%',
      disableClose: true,
      data: memeSelected
    })

    this._memesDialog
        .afterClosed()
        .pipe(
          filter((memeToProcess: MemeToProcess| undefined) => !!memeToProcess),
          map((memeToProcess: MemeToProcess | undefined) => (this._update(memeToProcess as MemeToProcess)))                  
          )
          .subscribe({
            complete: () => this._router.navigate(["/memes"])
          })
  }

  _update(memeToProcess: MemeToProcess){
    const id = memeToProcess?.meme.id;
    delete memeToProcess?.meme.id;
    return this._memesService.update(id!, memeToProcess.meme).pipe(
      map((meme: Meme) => 
        memeToProcess.canvas.toBlob((blob) =>
          this._memesService.upload(meme.id!, blob!).subscribe({
            complete: () => this._router.navigate(["/memes"])
          })

        )
      )
    ).subscribe()
  }
}
