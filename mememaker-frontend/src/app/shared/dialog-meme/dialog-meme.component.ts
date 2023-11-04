import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MemeSelected } from '../types/meme-selected.type';
import { MemeToProcess } from '../types/meme-to-process.type';

@Component({
  selector: 'app-dialog-meme',
  templateUrl: './dialog-meme.component.html',
  styleUrls: ['./dialog-meme.component.css']
})
export class DialogMemeComponent {
  constructor(
    private _dialogRef: MatDialogRef<DialogMemeComponent, MemeToProcess>,
    @Inject(MAT_DIALOG_DATA) private _memeSelected: MemeSelected) {}

  get memeSelected(): MemeSelected{
    return this._memeSelected;
  }

  onCancel(): void{
    this._dialogRef.close();
  }

  onSave(memeToProcess: any): void{
    this._dialogRef.close(memeToProcess);
  }
}
