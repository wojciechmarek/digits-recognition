import {Component, ViewChild} from '@angular/core';
import {DrawableDirective} from './directive/drawable.directive';
import {MatDialog, MatDialogContent} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(DrawableDirective) public canvas;
  @ViewChild(MatDialogContent) public modal;

  constructor(public dialog: MatDialog) {}

  public async predict(image: ImageData): Promise<void> {
    const asd = image;
    console.log(asd);
  }

  public openDialog(): void {
    this.dialog.open(DialogContentExampleDialog, {
      data: {
        animal: 'panda'
      }
    });
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
