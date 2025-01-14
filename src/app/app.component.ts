import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavComponent } from './components/template/nav/nav.component';
import { CommonModule } from '@angular/common';


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

  constructor(private router: Router) { }

  isLoginRoute(): boolean {
    return ["/login", "/register"].includes(this.router.url);
  }

}
