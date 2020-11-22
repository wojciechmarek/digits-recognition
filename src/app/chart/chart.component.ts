import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() private data: number[];

  public chartData;
  public type = 'ColumnChart';
  public options = {
    legend: 'none'
  };

  ngOnInit(): void {
    this.chartData = [
      ['0', 0],
      ['1', 0],
      ['2', 0],
      ['3', 0],
      ['4', 0],
      ['5', 0],
      ['6', 0],
      ['7', 0],
      ['8', 0],
      ['9', 0],
    ];
  }

  ngOnChanges(): void {
    console.log(this.data);
    this.chartData = this.data.map((value, index) => ([index.toString(), value]));
  }
}
