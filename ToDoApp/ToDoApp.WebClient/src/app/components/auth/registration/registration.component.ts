import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { passwordMatchValidator } from '../../../validators/password.match.validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnDestroy {
  registerForm: FormGroup;
  private destroy$ = new Subject<void>();

  passwordVisible: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('(?=.*[A-Z])(?=.*[0-9]).*'),
      ]],
      confirmPassword: ['', Validators.required]
    },
      {
        validators: passwordMatchValidator('password', 'confirmPassword'),
      });
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const { confirmPassword, ...registrationData } = this.registerForm.value;

    this.authService.register(registrationData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.router.navigate(['/login'])
        },
        error: (error) => {
          if (error.status === 401) {
            this.registerForm.controls['email'].setErrors({ alreadyExists: true });
          } else {
            this.toastr.error('An error has occurred. Please try again later.', 'Error');
          }
        }
      });
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}