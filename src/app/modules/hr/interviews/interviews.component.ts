import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { faSearch, faUserPlus, faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';
import { Interview, InterviewStatus } from '../../custom-types';
import { InterviewService } from '../../shared/services/interview.service';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleInterviewComponent } from './schedule-interview/schedule-interview.component';
import { Moment } from 'moment';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.scss'],
})
export class InterviewsComponent implements OnInit {
  searchIcon = faSearch;
  addIcon = faUserPlus;
  faExpandArrowsAlt = faExpandArrowsAlt;
  displayedColumns: string[] = [
    'candidateId',
    'scheduledBy',
    'scheduledTime',
    'interviewRounds',
    'status',
    'actions'
  ];
  dataSource: MatTableDataSource<Interview>;
  scheduledData: {date: any, value: number}[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private interviewService: InterviewService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadInterviews();
  }

  applyFilter(event: Event) {
    try {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    } catch (error) {}
  }

  handleAddInterview() {
    const dialogRef = this.dialog.open(ScheduleInterviewComponent, {
      width: '70%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadInterviews();
      }
    });
  }

  loadInterviews() {
    this.interviewService.loadAllInterviews().subscribe((response) => {
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      response.data.forEach(interview => {
        const date = new Date(interview.interviewRounds[0].scheduledTime.split('T')[0]);

        this.scheduledData = response.data.reduce((acc, value) => {
          const d = acc.find(s => s.date === date);
          if (d) {
            ++d.value;
          } else {
            acc.push({
              date: date,
              value: 1
            });
          }
          return acc;
        }, []);

        // this.scheduledData.push({
        //   date: new Date(interview.interviewRounds[0].scheduledTime.split('T')[0]),
        //   value: Math.random() * 1000
        // });
      });

      this.interviewService.$scheduledInterviews.next(this.scheduledData);
    });
  }

  checkContains(values: any[], filter): boolean {
    return values.some((value) => {
      if (value) {
        if (Array.isArray(value)) {
          return this.checkContains(value, filter);
        }
        if (typeof value === 'object') {
          return this.checkContains(Object.values(value), filter);
        }
        return value.includes(filter);
      } else {
        return false;
      }
    });
  }

  getInterviewStatusStyle(status: string) {
    if (status === 'SCHEDULED') {
        return 'int-status scheduled';
    }

    if (status === 'REJECTED') {
      return 'int-status rejected';
    }

    if (status === 'SELECTED') {
      return 'int-status selected';
    }

    if (status === 'UNDER_PROCESS') {
      return 'int-status under-process';
    }

    return 'int-status';
  }
}
