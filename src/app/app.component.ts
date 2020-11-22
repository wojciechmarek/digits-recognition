import {Component, OnInit, ViewChild} from '@angular/core';
import {DrawableDirective} from './directive/drawable.directive';
import {MatDialog, MatDialogContent} from '@angular/material/dialog';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(DrawableDirective) public canvas;
  @ViewChild(MatDialogContent) public modal;

  public predictions: number[] = [];
  private model: tf.Model;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
      this.loadModel();
  }

  private async loadModel(): Promise<void> {
    this.model = await tf.loadModel('/assets/model.json');
  }

  public async predict(imageData: ImageData): Promise<void> {
    await tf.tidy(() => {
      let image = tf.fromPixels(imageData, 1);
      image = image.reshape([1, 28, 28, 1]);
      image = tf.cast(image, 'float32');

      const output = this.model.predict(image) as any;

      this.predictions = Array.from(output.dataSync());
    });
  }

  public openDialog(): void {
    this.dialog.open(DialogContentExampleDialog);
  }
}

@Component({
  selector: 'info-dialog',
  template: `
    <h1 mat-dialog-title>About this project</h1>
    <div mat-dialog-content>
      <p>This project was prepared for class at UITM in Rzeszów, Poland</p>
      <p>Author's ID: 57108</p>
    </div>
  `,
})
// tslint:disable-next-line:component-class-suffix
export class DialogContentExampleDialog {}
