import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  decryption,
  encryption,
} from 'src/app/shared/genericFunctions/encryptionFun';
import { ValidationService } from 'src/app/shared/validators/validation.service';
import { AppService } from 'src/app/utilities/_services/app.service';
import { AuthenticationService } from 'src/app/utilities/_services/authentication.service';
import { ChathubService } from 'src/app/utilities/_services/chathub.service';
import { NotificationService } from 'src/app/utilities/_services/notification.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;

  email = 'Email';
  Password: string = 'Password';
  userId: any;
  submitted: boolean = false;

  constructor(
    private appService: AppService,
    private notificationService: NotificationService,
    private signalrService: ChathubService,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    //this.signalrService.startConnection();
    this.init();
  }

  init() {
    this.signInForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        ValidationService.EmailorMobileNumberValidator,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        ValidationService.passwordValidator,
      ]),
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.signInForm.invalid) {    
      return;
    }

    let loginObj = {
      email: encryption(this.signInForm.value.username.trimLeft().trimRight().toString().toLowerCase()),
      password: encryption(this.signInForm.value.password.trimLeft().trimRight()),
      otpVia: 'email'
    }

  
    this.authService.login(loginObj).subscribe(res => {
      if (res) {
        console.log(res);
        this.appService.setUserLoggedIn(true);
        this.router.navigate(['auth/authentication']);        
         this.notificationService.success("OTP Sucesfully Sent");    
      }
    })

  }

  logout() {
    this.notificationService.error('Logout');
    localStorage.clear();
  }
}



// if (
//   this.signInForm.value.username == 'admin@gmail.com' &&
//   this.signInForm.value.password == 'Password@1'
// ) {
//   this.notificationService.success('Welcome Admin');
//   // this.userId = 3;
//   // localStorage.setItem('adminId', this.userId);
//   // this.signalrService.Connect(this.userId);
//   this.router.navigate(['/user/investigator-dashboard']);
// } else if (
//   this.signInForm.value.username == 'user1@gmail.com' &&
//   this.signInForm.value.password == 'Password@1'
// ) {
//   this.notificationService.success('Welcome User1');
//   this.userId = 4;
//   localStorage.setItem('user1Id', this.userId);
//   this.signalrService.Connect(this.userId);
//   this.router.navigate(['/user/participant-dashboard']);
// } else if (
//   this.signInForm.value.username == 'user2@gmail.com' &&
//   this.signInForm.value.password == 'Password@1'
// ) {
//   this.notificationService.success('Welcome User2');
//   this.userId = 5;
//   localStorage.setItem('user2Id', this.userId);
//   this.signalrService.Connect(this.userId);
//   this.router.navigate(['/user/clinical-dashboard']);
// } else {
//   //this.notificationService.error('Invalid User');
//   this.notificationService.success('Welcome User');
//   this.router.navigate(['/user/investigator-dashboard']);
// }