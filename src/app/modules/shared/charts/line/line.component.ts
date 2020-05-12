import { Component, OnInit, ElementRef, ViewChild, OnChanges, AfterViewInit, Input, AfterContentInit } from '@angular/core';
import * as d3 from 'd3';
import { InterviewService } from '../../services/interview.service';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit, OnChanges, AfterViewInit, AfterContentInit {

  @ViewChild('barChart')
  private chartContainer: ElementRef;

  margin = { top: 5, right: 30, bottom: 30, left: 30 };
 
  @Input() fillColor = 'red';
  private x: any;
  private y: any;
  private svg: any;
  private line: d3.Line<[number, number]>; // this is line defination

  @Input() data: any[] = [];

  constructor(
    private elRef: ElementRef,
    private interviewService: InterviewService
    ) { }

  ngOnInit(): void {}

  ngAfterViewInit() {}

  ngOnChanges() {
    if(this.data) {
      this.createLineChart();
    }
  }

  ngAfterContentInit() {
    // this.createLineChart();
  }

  createLineChart() {
    const element = this.chartContainer.nativeElement;

    const svg = d3.select(element).append('svg')
        .attr('width', element.offsetWidth - 90)
        .attr('height', element.offsetHeight - 25);

    const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

    const x = d3
      .scaleTime()
      .rangeRound([0, contentWidth])
      .domain(d3.extent(this.data, (d) => d.date ));

    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, d3.max(this.data, d => d.value)]);

    const g = svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    // g.append('g')
    //   .attr('class', 'axis axis--x')
    //   .attr('transform', 'translate(0,' + contentHeight + ')')
    //   .call(d3.axisBottom(x)
    //   .tickFormat(d3.timeFormat('%d/%m')).ticks(2));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(d3.max(this.data, d => d.value)))
      .append('text')
      .attr('transform', 'rotate(45)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Frequency');

    g.selectAll('.bar')
      .data(this.data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.date))
      .attr('y', d => y(d.value))
      .attr('width', 10)
      .attr('fill', 'red')
      .attr('height', d => contentHeight - y(d.value));
  }

 createChart() {
  }


}
