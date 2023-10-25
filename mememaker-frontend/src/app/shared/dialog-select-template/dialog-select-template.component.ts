import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Meme } from '../types/meme.type';

@Component({
  selector: 'app-dialog-select-template',
  templateUrl: './dialog-select-template.component.html',
  styleUrls: ['./dialog-select-template.component.css']
})
export class DialogSelectTemplateComponent{


  constructor(
    private _dialogRef: MatDialogRef<DialogSelectTemplateComponent, Meme>,
    ){}



  onCancel(): void{
    this._dialogRef.close();
  }

  onSave(meme: Meme): void{
    this._dialogRef.close(meme);
  }
}
