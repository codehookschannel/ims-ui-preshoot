import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/modules/shared/services/employee.service';
import { FormGroup, FormControl } from '@angular/forms';
import { empProfiles, Employee } from '../../../custom-types';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  employeeForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    employeeNumber: new FormControl(''),
    profile: new FormControl('')
  });

  filteredEmpProfiles: Observable<string[]>;

  constructor(
    public dialogRef: MatDialogRef<AddEmployeeComponent>,
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.filteredEmpProfiles = this.employeeForm.controls['profile'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value): string[] {
    const filterValue = value.toLowerCase();
    return empProfiles.filter(option => option.toLowerCase().includes(filterValue));
  }

  handleSaveEmployee() {
    const employee = this.employeeForm.value as Employee;
    this.employeeService.saveEmployee(employee).subscribe(response => {
      if ( response.success) {
        this.toastr.success('Employee Added Successfully.', 'Success!!!');
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
