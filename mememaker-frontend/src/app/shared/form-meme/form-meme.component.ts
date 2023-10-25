import { Component, ElementRef, EventEmitter, Renderer2, ViewChild } from '@angular/core';
import { Canvas, createCanvas, loadImage } from 'canvas';
import { DragboxData } from '../types/dragboxData.type';
import { Meme } from '../types/meme.type';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-meme',
  templateUrl: './form-meme.component.html',
  styleUrls: ['./form-meme.component.css']
})
export class FormMemeComponent {
  @ViewChild("container") container!: ElementRef<HTMLDivElement>
  @ViewChild("canvas") canvas!: ElementRef<HTMLCanvasElement>;

  private _blankCanvas!: Canvas;
  private _dragboxesDataInit: DragboxData[];
  private _dragboxesData: DragboxData[];

  private _model: Meme;

  private readonly _cancel$: EventEmitter<void>;
  private readonly _submit$: EventEmitter<Meme>;

  private readonly _form: FormGroup;

  sFile = "/assets/sueur.jpg";
  sSave = "/assets/sueur_custom.jpg";


  constructor(private renderer: Renderer2){
    this._dragboxesDataInit = [{id:"1", left:100, top:100, rot:0, width: 100, height: 100, content:""}, {id:"2", left:200, top:300, rot:30.0, width: 100, height:50, content:""}, {id:"3", left:200, top:300, rot:30.0, width: 100, height:50, content:""}];
    this._dragboxesData = [...this._dragboxesDataInit];
    this._model = {} as Meme;
    this._submit$ = new EventEmitter<Meme>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();
    
  }

  get dragboxesDataInit(): DragboxData[]{
    return this._dragboxesDataInit;
  }

  get form(): FormGroup {
    return this._form;
  }

  
  ngOnInit(): void {
    loadImage(this.sFile).then(img => {
      this.canvas.nativeElement.width = img.width;
      this.canvas.nativeElement.height = img.height;
      this._blankCanvas = createCanvas(img.width, img.height);


      let displayedctx: any = this.canvas.nativeElement.getContext("2d")!;
      displayedctx.drawImage(img, 0, 0);
      displayedctx.save();

      let blankctx = this._blankCanvas.getContext("2d")
      blankctx.drawImage(img, 0, 0);
      blankctx.save();
      
      this.updateCanvas();
    })
  }

  updateCanvas(): void {
    let displayedctx: any = this.canvas.nativeElement.getContext("2d")!;
    displayedctx.drawImage(this._blankCanvas, 0, 0)

    this._dragboxesData.forEach(element => {
      displayedctx.save()
      displayedctx.translate(element.left, element.top)
      displayedctx.rotate(element.rot * Math.PI/180)
      displayedctx.font = '20px Arial';
      displayedctx.fillStyle = 'blue';
      displayedctx.fillText("default", 0, 0);
      displayedctx.restore();
    });
  }

  updateDragboxData(updatedDragboxData: DragboxData): void {
    console.log(updatedDragboxData);
    this._dragboxesData = this._dragboxesData.map(dragboxData => dragboxData.id == updatedDragboxData.id ? updatedDragboxData : dragboxData);
    this.updateCanvas();
  }

  /**
   * Function to build our form
   */
  private _buildForm(): FormGroup {
    return new FormGroup({
      title: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
      description: new FormControl(),
      inputs: new FormArray([])
    });
  }

}
