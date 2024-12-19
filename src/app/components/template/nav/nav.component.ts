import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [
    MatTabsModule
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  selectedTabIndex = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('home')) {
          this.selectedTabIndex = 0;
        } else if (event.url.includes('produto')) {
          this.selectedTabIndex = 1;
        } else if (event.url.includes('produto/criar')) {
          this.selectedTabIndex = 1;
        }
      }
    });
  }

  onTabChange(index: number): void {
    if (index == 0) {
      this.router.navigate(['/home']);
    } else if (index == 1) {
      this.router.navigate(['/produto']);
    }
  }
}
