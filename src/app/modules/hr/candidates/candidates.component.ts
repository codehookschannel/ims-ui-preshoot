import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { Candidate } from '../../custom-types';
import { CandidateService } from '../../shared/services/candidate.service';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

  searchIcon = faSearch;
  addIcon = faUserPlus;
  displayedColumns: string[] = ['firstName', 'experience', 'appliedFor', 'phoneNumber'];
  dataSource: MatTableDataSource<Candidate>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private candidateService: CandidateService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCandidates();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  handleAddCandidate() {
    const dialogRef = this.dialog.open(AddCandidateComponent, {
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCandidates();
      }
    });
  }

  loadCandidates() {
    this.candidateService.loadAllCandidates().subscribe(response => {
      this.dataSource = new MatTableDataSource(response.data);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


}
