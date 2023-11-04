import { Component, ElementRef, Input, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { DragboxData } from '../types/dragboxData.type';
import { NgxMoveableComponent } from 'ngx-moveable'

@Component({
  selector: 'app-dragbox',
  templateUrl: './dragbox.component.html',
  styleUrls: ['./dragbox.component.css']
})
export class DragboxComponent{
  @ViewChild("targetRef")
  targetRef!: ElementRef;
  @ViewChild("moveableRef")
  moveable!: NgxMoveableComponent;

  private _dragboxData: DragboxData;
  
  private readonly _update$: EventEmitter<DragboxData>;
  
  draggable: any = true;
  throttleDrag: any = 1;
  edgeDraggable: any = false;
  startDragRotate: any = 0;
  throttleDragRotate: any = 0;
  scalable: any = true
  keepRatio: any = false;
  throttleScale: any = 0;
  renderDirections: any = ["nw", "n", "ne", "w", "e", "sw", "s", "se"];
  rotatable: any = true;
  throttleRotate: any = 0;
  rotationPosition: any = "top"
  snappable: any = true; 
  bounds: any = {left:0, top:0, right: 0, bottom: 0, position:"css"};
  origin: any = true;

  constructor(){
    this._dragboxData = {} as DragboxData;
    this._update$ = new EventEmitter<DragboxData>();
  }

  @Input()
  set dragboxData(dragboxData: DragboxData){
    this._dragboxData = dragboxData;
  }

  get dragboxData(){
    return this._dragboxData
  }

  @Output("updateDragboxData") get update$(): EventEmitter<DragboxData>{
    return this._update$;
  }
  
  onRender(e: any){
    e.target.style.transform = e.transform
    const rect = e.moveable.getRect();

    //const style = window.getComputedStyle(this.targetRef.nativeElement)
    //const matrix = new DOMMatrixReadOnly(style.transform)

    let width = Math.sqrt(Math.pow(rect.pos1[0] - rect.pos2[0], 2) + Math.pow(rect.pos1[1] - rect.pos2[1], 2))
    let height = Math.sqrt(Math.pow(rect.pos1[0] - rect.pos3[0], 2) + Math.pow(rect.pos1[1] - rect.pos3[1], 2))
    this.update$.emit({...this._dragboxData, left: rect.pos1[0], top: rect.pos1[1], rot: rect.rotation, width: width, height: height });
  }
}
