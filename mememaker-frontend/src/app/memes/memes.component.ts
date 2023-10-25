import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Meme } from '../shared/types/meme.type';
import { DialogMemeComponent } from '../shared/dialog-meme/dialog-meme.component';
import { MemesService } from '../shared/services/memes.service';
import { DialogSelectTemplateComponent } from '../shared/dialog-select-template/dialog-select-template.component';

@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.css']
})
export class MemesComponent implements OnInit {
  private _memes: Meme[];
  private _selectTemplateDialog: MatDialogRef<DialogSelectTemplateComponent, Meme> | undefined;
  private _memeDialog: MatDialogRef<DialogMemeComponent, Meme> | undefined;

  private _dialogStatus: string;

  constructor(
    private _router: Router,
    private _memesService: MemesService,
    private _dialog: MatDialog
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

    ngOnInit(): void {
        // this._memesService
        //     .fetchBlanks()
        //     .subscribe({next: (memes: Meme[]) => (this._memes = memes)})
        // console.log(this._memes)
    }

    showDialog(): void {
      // set dialog status
      this._dialogStatus = 'active';
      
      // open select template modal
      this._selectTemplateDialog = this._dialog.open(DialogSelectTemplateComponent, {
        width: '300px',
        disableClose: true,
      });

      // open modal
      // this._memeDialog = this._dialog.open(DialogMemeComponent, {
      //   position:{left: "15%"},
      //   width: '70%',
      //   disableClose: true,
      // });
  
      // subscribe to afterClosed observable to set dialog status and do process
      this._selectTemplateDialog
        .afterClosed()
        // .pipe(
        //   filter((person: Person | undefined) => !!person),
        //   map((person: Person | undefined) => {
        //     // delete obsolete attributes in original object which are not required in the API
        //     delete person?.id;
        //     delete person?.photo;
  
        //     return person;
        //   }),
        //   mergeMap((person: Person | undefined) => this._add(person))
        // )
        // .subscribe({
        //   next: (person: Person) => (this._people = this._people.concat(person)),
        //   error: () => (this._dialogStatus = 'inactive'),
        //   complete: () => (this._dialogStatus = 'inactive'),
        // });
    }
}
