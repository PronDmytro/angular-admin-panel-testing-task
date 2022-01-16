import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  public form: FormGroup;

  public constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly dataService: DataService,
  ) {
    this.form = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public async login() {
    if (this.form.valid) {
      await this.authService.auth(this.form.get('username')!.value, this.form.get('password')!.value);
      this.dataService.username = this.form.get('username')!.value;
    } else {
      this.form.markAllAsTouched();
    }
  }

}
