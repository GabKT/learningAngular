import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", Validators.required]
    })
  }
  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate(["/home"]);
    }
    if (this.router.url.includes('?')) {
      this.router.navigate([this.router.url.split('?')[0]]);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.authService.login(formData).subscribe({
        next: (response) => {
          if (response) {
            alert("Login feito com sucesso!");
            if (this.authService.isUserLoggedIn() && this.authService.getUserRoles() == "admin") {
              this.router.navigate(["/home"]);
            } else if (this.authService.isUserLoggedIn() && this.authService.getUserRoles() == "user") {
              this.router.navigate(["/main"]);
            }
          }
        },
        error: (error: HttpErrorResponse) => {
          if (error.status == 403) {
            alert("Credenciais Invalidas");
            this.loginForm.reset()
          } else {
            console.error("Erro enquanto realizava login ", error);
          }
        }
      });
    }

  }

  goToRegister(): void {
    this.router.navigate(["/register"]);
  }

}
