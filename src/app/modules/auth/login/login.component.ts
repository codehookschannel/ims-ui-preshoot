import { Component, OnInit } from '@angular/core';
import { faUserShield, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  handleLoginClick() {
    this.router.navigate(['/hr']);
  }

}
