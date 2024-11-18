import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { passwordMatchValidator } from '../../validators/password.match.validator';

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

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.registerForm = formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
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
      .subscribe(() => {
        this.router.navigate(['/login'])
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}