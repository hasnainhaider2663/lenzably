import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, NgForm, Validators} from '@angular/forms';
import {NotificationsService, NotificationType} from 'angular2-notifications';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/shared/auth.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {FirebaseAssetService} from '../../../firebase-asset.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {
  buttonDisabled = false;
  buttonState = '';
  passwordForm;
  error;
  showSuccess;
  inputText = '';

  constructor(private authService: AuthService,
              private notifications: NotificationsService, private router: Router,
              private modalService: BsModalService, private assetService: FirebaseAssetService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      email: [this.inputText, [Validators.required, Validators.email]]
    });
  }


  onSubmit(): void {
    // if (!this.passwordForm.valid || this.buttonDisabled) {
    //   return;
    // }
    console.log(this.passwordForm);
    if (this.passwordForm.controls.email.status === 'INVALID') {
      this.error = 'Email is not valid';
      return;
    }
    if (this.passwordForm.valid) {
      this.buttonDisabled = true;
      this.buttonState = 'show-spinner';

      this.authService.sendPasswordEmail(this.passwordForm.value.email).then(() => {
        this.notifications.create('Done', 'Password reset email is sent, you will be redirected to Reset Password page!',
          NotificationType.Bare, {theClass: 'outline primary', timeOut: 6000, showProgressBar: true});
        this.buttonDisabled = false;
        this.buttonState = '';
        setTimeout(() => {
          this.router.navigate(['user/reset-password']);
        }, 6000);

      }).catch((error) => {
        this.notifications.create('Error', error.message, NotificationType.Bare,
          {theClass: 'outline primary', timeOut: 6000, showProgressBar: false});
        this.buttonDisabled = false;
        this.buttonState = '';
      });
    }
  }
    onChange(event) {
      this.showSuccess = false;
      this.error = undefined;
    }
}
