import { Component, OnInit } from '@angular/core';
import { faUserShield, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { GeneralService } from '../../shared/services/general.service';
import messages from '../../info.messages';
import { EmployeeProfiles } from '../../custom-types';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userIcon = faUserShield;
  passwordIcon = faUnlockAlt;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  errorFlag = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {
    
  }

  handleLoginClick() {
    const loginObj = this.loginForm.value;
    this.authService.login(loginObj).subscribe(response => {
      if (response.success) {
        this.generalService.getHateosData(response.data.links[0].href).subscribe(empResponse => {
          const emp = empResponse.data;
          switch (emp.profile) {
            case EmployeeProfiles.HR: this.router.navigate(['/hr']); break;
            default: this.router.navigate(['/employee']);
          }
        }, error => {
          this.errorFlag = true;
          this.errorMessage = messages.USER_PROFILE_NOT_FOUND;
        });
      }
    }, error => {
      this.errorFlag = true;
      this.errorMessage = messages.USER_PROFILE_NOT_FOUND;
    }); // TODO : Handle Errors
  }

}
