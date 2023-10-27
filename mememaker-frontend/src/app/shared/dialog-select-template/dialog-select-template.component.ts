import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MemeSelected } from '../types/meme-selected.type';

@Component({
  selector: 'app-dialog-select-template',
  templateUrl: './dialog-select-template.component.html',
  styleUrls: ['./dialog-select-template.component.css']
})
export class DialogSelectTemplateComponent{


  constructor(
    private _dialogRef: MatDialogRef<DialogSelectTemplateComponent, MemeSelected>,
    ){}

  onCancel(): void{
    this._dialogRef.close();
  }

  onSave(data: any): void{
    this._dialogRef.close(data);
  }
}
