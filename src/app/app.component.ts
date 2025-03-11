import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavComponent } from './components/template/nav/nav.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './views/auth/service/auth.service';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'GABKT App';

  constructor(private authService: AuthService) { }

  isAdminSection(): boolean {
    const role = this.authService.getUserRoles();
    return role == "admin" && this.authService.isUserLoggedIn() ? true : false;
  }

}
