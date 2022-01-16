import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CustomValidationService } from '../../../core/services/vatidators/custom-validation.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  public form: FormGroup;
  public submitted = false;

  public constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly dataService: DataService,
    private customValidator: CustomValidationService,
  ) {
    this.form = fb.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        acceptTerms: [false, Validators.requiredTrue],
      },
      { validators: this.customValidator.mustMatch('password', 'confirmPassword') });
  }

  public async register() {
    this.submitted = true;
    if (this.form.valid) {
      await this.authService.register({
        username: this.form.get('username')!.value,
        password: this.form.get('password')!.value,
      });

      this.dataService.username = this.form.get('username')!.value;
    } else {
      this.form.markAllAsTouched();
    }
  }

}
