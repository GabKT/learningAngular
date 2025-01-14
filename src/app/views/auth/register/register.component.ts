import { Component } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  imports: [
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.email, Validators.required]],
      password: ["", Validators.required],
      role: ["", Validators.required]
    })
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value

    }
  }

  goToLogin(): void {
    this.router.navigate(["/login"]);
  }
}
