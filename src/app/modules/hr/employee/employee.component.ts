import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../shared/services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../../custom-types';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  searchIcon = faSearch;
  addIcon = faUserPlus;
  displayedColumns: string[] = ['employeeNumber', 'firstName', 'profile'];
  dataSource: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  handleAddEmployee() {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEmployees();
      }
    });
  }

  loadEmployees() {
    this.employeeService.loadAllEmployees().subscribe(response => {
      this.dataSource = new MatTableDataSource(response.data);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}
