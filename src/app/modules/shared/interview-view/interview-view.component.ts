import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Interview, ResponseDto, Employee } from '../../custom-types';
import {  faFileContract,
          faComments,
          faRetweet,
          faVideo,
          faVideoSlash,
          faClipboardList
        } from '@fortawesome/free-solid-svg-icons';
import { EmployeeService } from '../services/employee.service';
import { concat } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ViewFeedbackComponent } from '../view-feedback/view-feedback.component';
import { AddFeedbackComponent } from '../add-feedback/add-feedback.component';


@Component({
  selector: 'app-interview-view',
  templateUrl: './interview-view.component.html',
  styleUrls: ['./interview-view.component.scss']
})
export class InterviewViewComponent implements OnInit, OnChanges {

  @Input() interview: Interview;
  @Input() options: any;

  fileIcon = faFileContract;
  commentIcon = faComments;
  reTweetIcon = faRetweet;
  videoIcon = faVideo;
  videoDisableIcon = faVideoSlash;
  viewFeedbackIcon = faClipboardList;

  constructor(
    private empService: EmployeeService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    console.log(this.interview);
    if (this.interview) {
      this.interview.interviewRounds.forEach(interviewRound => {
        if ( !interviewRound.interviewerDetails ) {
          // Call the employee Service
          const employeeObs = [];
          interviewRound.interviewerDetails = [];
          interviewRound.interviewers.forEach(interviewerId => {
            employeeObs.push(this.empService.loadEmployeeById(interviewerId));
          });
          // push data into interviwer details
          concat(...employeeObs).subscribe((response: ResponseDto<Employee>) => {
            interviewRound.interviewerDetails.push(response.data);
          });
        }
      });
    }
  }

  handleFeedbackViewClick(interviewRound) {
    const dialogRef = this.dialog.open(ViewFeedbackComponent, {
      width: '40%',
      data: interviewRound
    });
  }

  handleAddFeedbackComponent() {
    const rounds = this.interview.interviewRounds;
    const interviewRound = rounds[rounds.length - 1];
    const addFeedbackDialogRef = this.dialog.open(AddFeedbackComponent, {
      width: '50%',
      data: interviewRound
    });

    addFeedbackDialogRef.afterClosed().subscribe(data => {
      console.log(interviewRound);
      console.log(data);
      console.log(interviewRound == data);
    })
  }

}
