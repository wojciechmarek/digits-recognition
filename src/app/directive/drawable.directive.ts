import {Directive, ElementRef, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {Position} from './directive.models';

@Directive({
  selector: '[appDrawable]'
})
export class DrawableDirective implements OnInit {
  private position: Position = { x: 0, y: 0 };
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;

  @Output() newImage = new EventEmitter();

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.canvas = this.el.nativeElement as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
  }

  @HostListener('mouseup', ['$event'])
  private onUp(): void {
    this.newImage.emit(this.getImageData());
  }

  @HostListener('mouseenter', ['$event'])
  private onEnter(e: MouseEvent): void {
    this.setPosition(e);
  }

  @HostListener('mousedown', ['$event'])
  private onMove(e: MouseEvent): void {
    this.setPosition(e);
  }

  @HostListener('mousemove', ['$event'])
  private onDown(e: MouseEvent): void {

    if (e.buttons !== 1) {
      return;
    }

    this.ctx.beginPath();

    this.ctx.lineWidth = 10;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#111111';

    this.ctx.moveTo(this.position.x, this.position.y);
    this.setPosition(e);
    this.ctx.lineTo(this.position.x, this.position.y);

    this.ctx.stroke();
  }

  @HostListener('resize', ['$event'])
  private onResize(): void {
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
  }

  private setPosition(e: MouseEvent): void {
    this.position.x = e.offsetX;
    this.position.y = e.offsetY;
  }

  public clear(): void {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  private getImageData(): ImageData {
    const scaled = this.ctx.drawImage(this.canvas, 0, 0, 28, 28);
    return this.ctx.getImageData(0, 0, 28, 28);
  }
}
