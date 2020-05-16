import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InterviewRound } from '../../custom-types';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.scss']
})
export class AddFeedbackComponent implements OnInit {

  interviewRound: InterviewRound;
  feedbacks = new FormArray(
    [new FormGroup({
      skill: new FormControl(),
      rating: new FormControl(),
      feedback: new FormControl()
    })
  ]
  );

  feedbackForm = new FormGroup({
    feedback: this.feedbacks
  });

  constructor(
    public dialogRef: MatDialogRef<AddFeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InterviewRound
  ) { 
    this.interviewRound = data;
  }

  ngOnInit(): void {
    console.log(this.interviewRound);
    this.interviewRound.feedback = [
      {
        skill: 'Logical',
        feedback: 'Average',
        rating: '2.5'
      }
    ];
  }

  handleCancelClick() {
    this.dialogRef.close({});
  }

  handleOkClick() {
    this.dialogRef.close(this.interviewRound);
  }

  handleFormSubmit() {
    console.log(this.feedbackForm.value);
  }

  handleAddClick() {
    const arr = this.feedbackForm.get('feedback') as FormArray;
    arr.push(
      new FormGroup({
        skill: new FormControl(''),
        feedback: new FormControl(''),
        rating: new FormControl('')
      })
    )
  }

}
