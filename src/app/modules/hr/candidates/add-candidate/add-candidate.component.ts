import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { CandidateService } from 'src/app/modules/shared/services/candidate.service';
import { ToastrService } from 'ngx-toastr';
import { startWith, map } from 'rxjs/operators';
import { companyStacks, Candidate } from 'src/app/modules/custom-types';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.scss']
})
export class AddCandidateComponent implements OnInit {

  candidateForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    middleName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    identityType: new FormControl(''),
    identityNumber: new FormControl(''),
    birthDate: new FormControl(''),
    experience: new FormControl(''),
    domain: new FormControl(''),
    appliedFor: new FormControl('')
  });

  filteredCompanyStacks: Observable<string[]>;

  constructor(
    public dialogRef: MatDialogRef<AddCandidateComponent>,
    private candidateService: CandidateService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.filteredCompanyStacks = this.candidateForm.controls['appliedFor'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value): string[] {
    const filterValue = value.toLowerCase();
    return companyStacks.filter(option => option.toLowerCase().includes(filterValue));
  }

  handleSaveCandidate() {
    const candidate = this.candidateForm.value as Candidate;
    this.candidateService.saveCandidate(candidate).subscribe(response => {
      if ( response.success) {
        this.toastr.success('Candidate Added Successfully.', 'Success!!!');
        this.dialogRef.close(true);
      } else {
        this.handleCancelClick();
      }
    }, error => this.handleCancelClick());
  }

  handleCancelClick() {
    this.dialogRef.close(false);
  }


}
