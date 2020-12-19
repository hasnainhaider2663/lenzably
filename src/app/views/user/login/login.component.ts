import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, NgForm, Validators} from '@angular/forms';
import {NotificationsService, NotificationType} from 'angular2-notifications';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/shared/auth.service';
import {environment} from 'src/environments/environment';
import {BsModalService} from 'ngx-bootstrap/modal';
import {FirebaseService} from '../../../firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm;
  buttonDisabled = false;
  buttonState = '';
  error;
  showSuccess;
  inputText = '';

  constructor(private authService: AuthService, private notifications: NotificationsService, private router: Router,
              private modalService: BsModalService, private firebaseService: FirebaseService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [this.inputText, [Validators.required, Validators.email]],
      password: [this.inputText, [Validators.required, Validators.minLength(6)]],
    });
  }


  onSubmit(): void {
    console.log(this.loginForm);
    if (this.loginForm.controls.email.status === 'INVALID') {
      this.error = 'Email is not valid';
      return;
    }
    if (this.loginForm.controls.password.status === 'INVALID') {
      this.error = 'Password is not valid';
      return;
    }
    if (this.loginForm.valid) {
      if (this.buttonDisabled) {

        this.buttonDisabled = true;
        this.buttonState = 'show-spinner';
        this.authService.signIn(this.loginForm.value).then(() => {
          this.router.navigate([environment.adminRoot]);
        }).catch((error) => {
          this.buttonDisabled = false;
          this.buttonState = '';
          this.notifications.create('Error', error.message, NotificationType.Bare, {
            theClass: 'outline primary',
            timeOut: 6000,
            showProgressBar: false
          });
        });
      }
    }
  }
  onChange(event) {
  this.showSuccess = false;
  this.error = undefined;
}
}
