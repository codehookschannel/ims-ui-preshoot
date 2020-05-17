import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InterviewRound, skillvalues } from '../../custom-types';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.scss']
})
export class AddFeedbackComponent implements OnInit {

  interviewRound: InterviewRound;
  feedbacks = new FormArray(
    [new FormGroup({
      skill: new FormControl(''),
      rating: new FormControl(''),
      feedback: new FormControl('')
    })
  ]
  );

  filteredSkills: Observable<string[]>;
  feedbackForm = new FormGroup({
    feedback: this.feedbacks
  });

  faTrash = faTrash;
  
  constructor(
    public dialogRef: MatDialogRef<AddFeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InterviewRound
  ) {
    this.interviewRound = data;
  }

  ngOnInit(): void {
    console.log(this.interviewRound);
    this.onChangeText(0);
  }

  onChangeText(index) {
    console.log('called onChange txt');
    const fg = this.feedbacks.controls[index] as FormGroup;
    this.filteredSkills = fg.controls['skill'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value): string[] {
    const filterValue = value.toLowerCase();
    return skillvalues.filter(option => option.toLowerCase().includes(filterValue));
  }

  handleCancelClick() {
    this.dialogRef.close({});
  }
  
  handleFormSubmit() {
    console.log(this.feedbackForm.value);
    this.dialogRef.close(this.interviewRound);
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

  removeSkill(i) {
    this.feedbacks.removeAt(i);
  }

}
