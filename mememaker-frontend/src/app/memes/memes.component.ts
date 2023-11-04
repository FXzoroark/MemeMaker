import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Meme } from '../shared/types/meme.type';
import { DialogMemeComponent } from '../shared/dialog-meme/dialog-meme.component';
import { MemesService } from '../shared/services/memes.service';
import { DialogSelectTemplateComponent } from '../shared/dialog-select-template/dialog-select-template.component';
import { Observable, Subject, filter, map, mergeMap, of, pluck } from 'rxjs';
import { MemeSelected } from '../shared/types/meme-selected.type';
import { MemeToProcess } from '../shared/types/meme-to-process.type';

@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.css']
})
export class MemesComponent implements OnInit {
  private _memes: Meme[];
  private _selectTemplateDialog: MatDialogRef<DialogSelectTemplateComponent, MemeSelected> | undefined;
  private _memeDialog: MatDialogRef<DialogMemeComponent, MemeToProcess> | undefined;

  private _dialogStatus: string;

  constructor(
    private _router: Router,
    private _memesService: MemesService,
    private _dialog: MatDialog,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    this._memes = [];
    this._dialogStatus = 'inactive';
  }

    /**
   * Returns private property _dialogStatus
   */
    get dialogStatus(): string {
      return this._dialogStatus;
    }

    get memes(): Meme[]{
      return this._memes
    }

    ngOnInit(): void {
        this._memesService
            .fetchMemes()
            .subscribe({next: (memes: Meme[]) => (this._memes = memes)})
    }

    delete(meme: Meme): void {
      this._memesService
          .delete(meme.id!)
          .subscribe(
            (id:string) =>
              (this._memes = this._memes.filter((meme: Meme) => meme.id != id))
          )
    }

    showDialog(): void {

      // set dialog status
      this._dialogStatus = 'active';
      
      // open select template modal
      this._selectTemplateDialog = this._dialog.open(DialogSelectTemplateComponent, {
        width: '300px',
        disableClose: true,
      });


      // subscribe to afterClosed observable to set dialog status and do process
      this._selectTemplateDialog
        .afterClosed()
        .pipe(
          filter((memeSelected: MemeSelected | undefined) => !!memeSelected)
        )
        .subscribe({
          next: (memeSelected: MemeSelected | undefined) =>{

            this._memeDialog = this._dialog.open(DialogMemeComponent, {
              position:{left: "20%"},
              width: '60%',
              disableClose: true,
              data: memeSelected
            });

            this._memeDialog
                .afterClosed()
                .pipe(
                  filter((memeToProcess: MemeToProcess | undefined) => !!memeToProcess),
                  mergeMap((memeToProcess: MemeToProcess | undefined) => (this._add(memeToProcess as MemeToProcess)))                  
                )
                .subscribe({
                  error: () => (this._dialogStatus = 'inactive'),
                  complete: () => (this._dialogStatus = 'inactive')
                })
          },
          error: () => (this._dialogStatus = 'inactive'),
          complete: () => (this._dialogStatus = 'inactive')
        });
    }

    private _add(memeToProcess: MemeToProcess): Observable<void>{
      return this._memesService.create(memeToProcess.meme).pipe(
        map((meme: Meme) =>{
          memeToProcess.canvas.toBlob((blob) => {
            this._memesService.upload(meme.id!, blob!)
                              .subscribe((res) => {this._memes.push({...meme, path:res.path}); this._changeDetectorRef.detectChanges()})
          })
        })
      )
    }

}