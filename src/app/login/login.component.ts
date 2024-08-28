import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth, RecaptchaVerifier, signInWithPhoneNumber } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent implements OnInit {
  otpForm: FormGroup;
  recaptchaVerifier!: RecaptchaVerifier;
  confirmationResult: any;

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {  // Inject Auth directly
    console.log('LoginComponent constructor called');
    this.otpForm = this.fb.group({
      phoneNumber: ['+917893979899', [Validators.required, Validators.pattern(/^\+?\d{10,}$/)]],
      otp: ['', [Validators.required]]
    });
    console.log('Form group initialized:', this.otpForm);
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
    console.log('Auth instance obtained:', this.auth);
    this.initializeRecaptcha(this.auth);
  }

  initializeRecaptcha(auth: Auth): void {
    console.log('Initializing reCAPTCHA');
    this.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
      {
        size: 'invisible',
        callback: (response: any) => {
          console.log('reCAPTCHA resolved:', response);
        }
      }
    );
    this.recaptchaVerifier.render()
      .then(() => {
        console.log('reCAPTCHA rendered successfully');
      })
      .catch((error) => {
        console.error('Error rendering reCAPTCHA:', error);
      });
  }

  sendOtp(): void {
    console.log('sendOtp called');
    const phoneNumber = this.otpForm.get('phoneNumber')?.value;
    console.log('Phone number entered:', phoneNumber);

    signInWithPhoneNumber(this.auth, phoneNumber, this.recaptchaVerifier)
      .then((confirmationResult) => {
        this.confirmationResult = confirmationResult;
        console.log('OTP Sent successfully, confirmationResult:', confirmationResult);
      }).catch((error) => {
        console.error('Error during OTP send:', error);
      });
  }

  verifyOtp(): void {
    const otp = this.otpForm.get('otp')?.value;
    this.confirmationResult.confirm(otp)
      .then((result: any) => {
        console.log('User signed in successfully:', result.user);
        const token = result.user.getIdToken(); // Get the token (assumes Firebase auth)
        token.then((tokenValue: string) => {
          localStorage.setItem('authToken', tokenValue); // Store token in localStorage
          this.router.navigate(['/dashboard']); // Navigate to the dashboard
        });
        
      }).catch((error: any) => {
        console.error('Error verifying OTP:', error);
      });
  }

  
  
}
