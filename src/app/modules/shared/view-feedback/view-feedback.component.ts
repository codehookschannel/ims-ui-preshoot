import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InterviewRound } from '../../custom-types';

@Component({
  selector: 'app-view-feedback',
  templateUrl: './view-feedback.component.html',
  styleUrls: ['./view-feedback.component.scss']
})
export class ViewFeedbackComponent implements OnInit {

  interviewRound: InterviewRound;

  constructor(
    public dialogRef: MatDialogRef<ViewFeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InterviewRound
  ) {
    this.interviewRound = data;
  }

  ngOnInit(): void {
    console.log(this.interviewRound);
  }

}
