import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { InterviewService } from 'src/app/modules/shared/services/interview.service';
import { ToastrService } from 'ngx-toastr';
import {
  Interview,
  Candidate,
  Employee,
  ResponseDto,
  TIME_LINE,
  InterviewStatus,
} from 'src/app/modules/custom-types';
import { Observable, concat, forkJoin } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { CandidateService } from 'src/app/modules/shared/services/candidate.service';
import { EmployeeService } from 'src/app/modules/shared/services/employee.service';
import { startWith, map } from 'rxjs/operators';
import { faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Moment } from 'moment';
import { TimzoneService } from 'src/app/modules/shared/services/timzone.service';

@Component({
  selector: 'app-schedule-interview',
  templateUrl: './schedule-interview.component.html',
  styleUrls: ['./schedule-interview.component.scss'],
})
export class ScheduleInterviewComponent implements OnInit {
  interviewRoundForm: FormGroup = new FormGroup({
    round: new FormControl(''),
    interviewer: new FormControl(''),
    date: new FormControl(),
    time: new FormControl(),
  });

  interviewForm: FormGroup = new FormGroup({
    candidate: new FormControl(),
    email: new FormControl(''),
    profile: new FormControl(''),
    phoneNumber: new FormControl(''),
    interviewRounds: new FormArray([this.interviewRoundForm]),
  });

  get interviewRounds() {
    return this.interviewForm.get('interviewRounds') as FormArray;
  }

  filteredCandidates: Observable<Candidate[]>;
  filteredEmployees: Observable<Employee[]>;
  candidates: Candidate[];
  employees: Employee[];
  times = TIME_LINE;
  trashIcon = faTrash;
  faPlusCircle = faPlusCircle;
  selectedEmployees: Employee[] = [];
  lastFilter: string = '';

  constructor(
    public dialogRef: MatDialogRef<ScheduleInterviewComponent>,
    private interviewService: InterviewService,
    private candidateService: CandidateService,
    private empService: EmployeeService,
    private toastr: ToastrService,
    private timezoneService: TimzoneService
  ) {}

  ngOnInit(): void {
    const subscriptions = [];
    subscriptions.push(this.candidateService.loadAllCandidates());
    subscriptions.push(this.empService.loadAllEmployees());

    forkJoin(subscriptions).subscribe((response: ResponseDto<any>[]) => {
      this.candidates = response[0].data;
      this.employees = response[1].data;

      this.filteredCandidates = this.interviewForm.controls[
        'candidate'
      ].valueChanges.pipe(
        startWith<string | Candidate>(''),
        map(value => typeof value === 'string' ? value : this.lastFilter),
        map((value) => this._filterCandidates(value))
      );
      this.filteredEmployees = this.interviewRoundForm.controls[
        'interviewer'
      ].valueChanges.pipe(
        startWith<string | Employee[]>(''),
        map(value => typeof value === 'string' ? value : this.lastFilter),
        map((value) => this._filterEmployees(value))
      );
    });
  }

  private _filterEmployees(value): Employee[] {
    this.lastFilter = value;
    const filterValue = value?.toLowerCase();
    return this.employees.filter((option) =>
      option.lastName.toLowerCase().includes(filterValue)
    );
  }

  private _filterCandidates(value): Candidate[] {
    this.lastFilter = value;
    const filterValue = value.toLowerCase();
    return this.candidates.filter((option) =>
      option.lastName.toLowerCase().includes(filterValue)
    );
  }

  addInterviewRound() {
    const roundForm = new FormGroup({
      round: new FormControl('test'),
      interviewer: new FormControl([]),
      date: new FormControl(),
      time: new FormControl('12:00'),
    });
    this.interviewRounds.push(roundForm);

    this.filteredEmployees = roundForm.controls[
      'interviewer'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filterEmployees(value))
    );
  }

  removeInterviewRound(index) {
    this.interviewRounds.removeAt(index);
  }

  onSelectEmployee(event: Event, emp: Employee, index) {
    event.stopPropagation();
    this.toggleSelection(emp, index);
  }

  toggleSelection(emp: Employee, index) {
    emp.selected = !emp.selected;
    if (emp.selected) {
      this.selectedEmployees.push(emp);
    } else {
      const i = this.selectedEmployees.findIndex(
        (value) =>
          value.firstName === emp.firstName && value.lastName === emp.lastName
      );
      this.selectedEmployees.splice(i, 1);
    }

    this.interviewRounds.controls[index]
      .get('interviewer')
      .setValue(this.selectedEmployees);
  }

  onSelectCandidate(optionEvent: any) {
    const candidate = optionEvent.option.value as Candidate;
    this.interviewForm.get('email').setValue(candidate.email);
    this.interviewForm.get('phoneNumber').setValue(candidate.phoneNumber);
    this.interviewForm.get('profile').setValue(candidate.appliedFor);

  }

  handleSaveInterview() {
    const interview = this.interviewForm.value as Interview;

    interview.scheduledBy = { // TODO: Replace this with actual logged in user
       id: '5eb7b3711752b420a92b7ad0',
       firstName: 'Anshika',
       lastName: 'Gupta',
       employeeNumber: '0003',
       profile: 'HR'
  };

    interview.interviewRounds.forEach(int => {
      // Date Format
      const date = int.date as Moment;
      const times = int.time.split(':');
      date.minutes(+times[1]);
      date.hours(+times[0]);
      int.scheduledTime = this.timezoneService.tenantToUtc(date).toISOString();
      // int.scheduledTime = date.utc().toString();

      // Interviewer
      int.interviewers = int.interviewer.map(emp => emp.id);
    });

    interview.status = InterviewStatus.SCHEDULED;
    interview.scheduledTime = interview.interviewRounds[0].scheduledTime;

    this.interviewService.saveInterview(interview).subscribe(response => {
      if ( response.success) {
        this.toastr.success('Interview Added Successfully.', 'Success!!!');
        this.dialogRef.close(true);
      } else {
        this.handleCancelClick();
      }
    }, error => this.handleCancelClick());
  }

  handleCancelClick() {
    this.dialogRef.close(false);
  }

  displayFn(emps: Employee[]) {
    let displayValue: string;
    if (Array.isArray(emps)) {
      emps.forEach((emp, index) => {
        if (index === 0) {
          displayValue = emp.firstName + ' ' + emp.lastName;
        } else {
          displayValue += ', ' + emp.firstName + ' ' + emp.lastName;
        }
      });
    } else {
      displayValue = emps;
    }
    return displayValue;
  }

  displayCandidateName(candidate: Candidate) {
    if (!candidate) {
      return '';
    }
    return `${candidate?.firstName} ${candidate?.lastName}`;
  }
}
