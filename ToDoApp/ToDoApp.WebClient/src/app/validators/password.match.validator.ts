import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);
  
      if (!control || !matchingControl) {
        return null;
      }
  
      const error = control.value !== matchingControl.value ? { passwordMismatch: true } : null;
  
      matchingControl.setErrors(error);
  
      return error;
    };
  }