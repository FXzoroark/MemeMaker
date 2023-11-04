import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Canvas, createCanvas, loadImage } from 'canvas';
import { DragboxData } from '../types/dragboxData.type';
import { Meme } from '../types/meme.type';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MemeSelected } from '../types/meme-selected.type';
import { DomSanitizer } from '@angular/platform-browser';
import { text } from 'stream/consumers';
import { drawText } from 'canvas-txt';
import { MemeToProcess } from '../types/meme-to-process.type';

@Component({
  selector: 'app-form-meme',
  templateUrl: './form-meme.component.html',
  styleUrls: ['./form-meme.component.css']
})
export class FormMemeComponent implements OnChanges{
  // @ViewChild("container") container!: ElementRef<HTMLDivElement>
  @ViewChild("canvas") canvas!: ElementRef<HTMLCanvasElement>;

  private _blankCanvas!: Canvas;
  private _memeSelected: MemeSelected;
  private _dragboxesDatasInit: DragboxData[];
  private _dragboxesDatas: DragboxData[];
  private _ratioCanvasX!: number;
  private _ratioCanvasY!: number;
  private _fontSize: number;
  private _fontHeight: number;


  private readonly _cancel$: EventEmitter<void>;
  private readonly _submit$: EventEmitter<MemeToProcess>;

  private _form: FormGroup;

  private _isUpdateMode: boolean;


  constructor(private _fb: FormBuilder){
    this._dragboxesDatasInit = [];
    this._dragboxesDatas = []
    this._memeSelected = {} as MemeSelected
    this._submit$ = new EventEmitter<MemeToProcess>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();
    this._fontSize = 40;
    this._fontHeight = this._fontSize*1.286;
    this._isUpdateMode = false;
  }

  @Input()
  set memeSelected(memeSelected: MemeSelected){
    this._memeSelected = memeSelected;
  }

  @Output('cancel')
  get cancel$(): EventEmitter<void> {
    return this._cancel$;
  }

  @Output('submit')
  get submit$(): EventEmitter<MemeToProcess> {
    return this._submit$;
  }

  get dragboxesDatasInit(){
    return this._dragboxesDatasInit;
  }

  get dragboxesDatas(){
    return this._dragboxesDatas;
  }

  get form(): FormGroup {
    return this._form;
  }

  get dragboxInputs(){
    return this._form.controls["dragboxInputs"] as FormArray;
  }

  get isUpdateMode(): boolean {
    return this._isUpdateMode;
  }
  
  ngOnChanges(): void {
    let img = new Image
    img.src = this._memeSelected.canvaUrl.toString();
    img.onload = () => {
      this.canvas.nativeElement.width = img.width;
      this.canvas.nativeElement.height = img.height;
      this._blankCanvas = createCanvas(img.width, img.height);
  
  
      let displayedctx: any = this.canvas.nativeElement.getContext("2d");
      displayedctx.drawImage(img, 0, 0)
      displayedctx.font = this._fontSize+'px Impact';
      displayedctx.fillStyle = 'black';
      displayedctx.save();

      let blankctx: any = this._blankCanvas.getContext("2d")
      blankctx.drawImage(img, 0, 0);
      blankctx.save();
      
      //ratio between the size of the canva rendered on the screen and the actual img size, used to asjust dragoboxes data and print at the right place
      this._ratioCanvasX =  this.canvas.nativeElement.offsetWidth/img.width
      this._ratioCanvasY =  this.canvas.nativeElement.offsetHeight/img.height
      this._initDragboxes();
      this._dragboxesDatas = [...this._dragboxesDatasInit]
      //create the form
      this._form = this._buildForm();
      //set form values if this is in update mode
      if(this._memeSelected.meme.id_blank){ //if id_blank => update
        this._form.patchValue({"title": this._memeSelected.meme.title, "description": this._memeSelected.meme.description})
        this._isUpdateMode = true;
      }
      //add inputs for every dragboxes
      this.dragboxesDatas.forEach((dragbox)=> this._addDragboxFormControl(dragbox.content))

      this.updateCanvas();

    }

  }

  private _initDragboxes(): void{
    this._memeSelected.meme.dragboxesDatas.forEach((dragbox: DragboxData) => {
      this._dragboxesDatasInit.push({...dragbox, left: dragbox.left*this._ratioCanvasX, top: dragbox.top*this._ratioCanvasY, width: dragbox.width*this._ratioCanvasX, height: dragbox.height*this._ratioCanvasY})
    })
  }

  updateCanvas(): void {
    let displayedctx: any = this.canvas.nativeElement.getContext("2d")!;
    displayedctx.drawImage(this._blankCanvas, 0, 0)
    displayedctx.beginPath();
    displayedctx.arc(52, 106, 5, Math.PI * 2, true)
    displayedctx.stroke()
    this._dragboxesDatas.forEach(dragbox => {
      displayedctx.translate(dragbox.left/this._ratioCanvasX, dragbox.top/this._ratioCanvasY)
      displayedctx.rotate(dragbox.rot * Math.PI/180)
      drawText(displayedctx, dragbox.content, {x:0, y:0 , width: dragbox.width/this._ratioCanvasX, height: dragbox.height/this._ratioCanvasY, fontSize:this._fontSize, lineHeight: this._fontHeight})
      displayedctx.setTransform(1,0,0,1,0,0);

      // let textBuffer = dragbox.content
      // for(let i=1 ; i < dragbox.height/this._fontHeight +1; i++){ // de la première ligne a la dernière ligne possible
      //   let shard = textBuffer;
      //   textBuffer = "";
      //   while(shard && displayedctx.measureText(shard).width*this._ratioCanvasX > dragbox.width){
      //     textBuffer = shard.charAt(shard.length - 1) + textBuffer
      //     shard = shard.slice(0, -1)
      //   }
      //   if(!shard) break;
      //   displayedctx.translate(dragbox.left / this._ratioCanvasX, (dragbox.top / this._ratioCanvasY) + this._fontHeight * i)
      //   displayedctx.rotate(dragbox.rot * Math.PI/180)
      //   //console.log("id: "+ dragbox.id + " shard: "+ shard + " " + displayedctx.measureText(shard).width)
      //   displayedctx.fillText(shard, 0, 0);
      //   displayedctx.setTransform(1,0,0,1,0,0)
      // }
      
    });

  }

  updateDragboxData(updatedDragboxDatas: DragboxData): void {
    //update the dragbox in the list and keep the content value which is not updated in the dragbox component
    //console.log(this.dragboxesDatas)
    this._dragboxesDatas = this._dragboxesDatas.map(dragboxDatas => dragboxDatas.id == updatedDragboxDatas.id ? {...updatedDragboxDatas, content:dragboxDatas.content} : dragboxDatas);
    
    this.updateCanvas();
  }

  change(event: any, i: number): void{
    this._dragboxesDatas[i].content = event.target.value;
    this.updateCanvas()
  }

  cancel(): void{
    this._cancel$.emit();
  }

  submit(formDatas: any): void{
    let resizedDragboxesDatas: DragboxData[] = [];
    this._dragboxesDatas.forEach((dragbox) => {
      resizedDragboxesDatas.push({left: dragbox.left/this._ratioCanvasX, top: dragbox.top/this._ratioCanvasY, rot:dragbox.rot, width: dragbox.width/this._ratioCanvasX, height: dragbox.height/this._ratioCanvasY, content: dragbox.content})
    })
    if(this.isUpdateMode){
      this._submit$.emit({meme:{id: this._memeSelected.meme.id, title: formDatas.title, description: formDatas.description, dragboxesDatas:resizedDragboxesDatas}, canvas: this.canvas.nativeElement})
    }
    else{
      this._submit$.emit({meme:{id_blank: this._memeSelected.meme.id,title: formDatas.title, description: formDatas.description, dragboxesDatas:resizedDragboxesDatas}, canvas: this.canvas.nativeElement});
    }
  }

  /**
   * Function to build our form
   */
  private _buildForm(): FormGroup {
    return new FormGroup({
      title: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(64)])
      ),
      description: new FormControl(
        '',
        Validators.compose([Validators.maxLength(255)])
      ),
      dragboxInputs: new FormArray([])
    });
  }

  private _addDragboxFormControl(content: string): void{
    this.dragboxInputs.push(this._fb.group({
      content: [content, Validators.compose([Validators.required])]
    }));
  }

}
