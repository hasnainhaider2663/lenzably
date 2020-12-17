import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AuthService} from 'src/app/shared/auth.service';
import {NotificationsService, NotificationType} from 'angular2-notifications';
import {Router} from '@angular/router';
import {FormBuilder, NgForm, Validators} from '@angular/forms';
import {environment} from 'src/environments/environment';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FirebaseAssetService} from '../../../firebase-asset.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  buttonDisabled = false;
  buttonState = '';
  registerForm;
  error;
  showSuccess;
  inputText = '';
  @ViewChild('template', {static: true}) template: TemplateRef<any>;

  constructor(private authService: AuthService,
              private notifications: NotificationsService,
              private router: Router,
              private modalService: BsModalService, private assetService: FirebaseAssetService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: [this.inputText, [Validators.required, Validators.minLength(6), Validators.pattern('[a-zA-Z ]*')]],
      email: [this.inputText, [Validators.required, Validators.email]],
      password: [this.inputText, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [this.inputText, [Validators.required, Validators.minLength(6)]]
    });
  }


  onSubmit(): void {
    console.log(this.registerForm);
    if (this.registerForm.controls.fullName.status === 'INVALID') {
      this.error = 'Full name is not valid';
      return;
    }
    if (this.registerForm.controls.email.status === 'INVALID') {
      this.error = 'Email not valid';
      return;
    }
    if (this.registerForm.controls.password.status === 'INVALID') {
      this.error = 'Password is not valid';
      return;
    }
    if (this.registerForm.controls.confirmPassword.status === 'INVALID') {
      this.error = 'Confirm password does not match';
      return;
    }
    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.error = 'Password and Confirm password do not match';
      return;
    }
    if (this.registerForm.invalid) {
      return;
    }
    this.error = undefined;

    if (this.registerForm.valid && !this.buttonDisabled) {
      this.buttonDisabled = true;
      this.buttonState = 'show-spinner';

      this.authService.register(this.registerForm.value).then((user) => {
        this.router.navigate([environment.adminRoot]);
      }).catch((error) => {
        this.notifications.create('Error', error.message, NotificationType.Bare,
          {theClass: 'outline primary', timeOut: 6000, showProgressBar: false});
        this.buttonDisabled = false;
        this.buttonState = '';
      });
    }
    this.showSuccess = true;
  }

  onChange(event) {
    this.showSuccess = false;
    this.error = undefined;
  }
}
