import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/utilities/_services/authentication.service';
import { NotificationService } from 'src/app/utilities/_services/notification.service';

@Component({
  selector: 'app-authentication-code',
  templateUrl: './authentication-code.component.html',
  styleUrls: [
    './authentication-code.component.scss',
    '../sign-in/sign-in.component.scss',
  ],
})
export class AuthenticationCodeComponent implements OnInit {
  AuthenticationForm: FormGroup;
  OTPObj: { OTP: any; otpVia: string; };

  constructor(private router: Router,
    private authService: AuthenticationService,
    private notificationService : NotificationService) { }

  ngOnInit(): void {
    this.init();
  }

  onSubmit() {
    debugger;
    if (this.AuthenticationForm.invalid) {
      return;
    }

    this.OTPObj = {
      OTP: this.AuthenticationForm.value.OTP.trimLeft().trimRight(),
      otpVia: 'email'
    }

    this.authService.LoginOTPVerification(this.OTPObj).subscribe(res => {
      if (res.code == "200") {
        this.notificationService.success("Sucessfully Login");
        this.router.navigate(['user/dashboard'])
      }
      else{
        this.notificationService.error("Invalid OTP");
      }
    })
  }

  init() {
    this.AuthenticationForm = new FormGroup({
      OTP: new FormControl('', [
        Validators.required,
        Validators.maxLength(6)
      ]),
    });
  }
}
