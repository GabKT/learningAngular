import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './views/auth/service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRoles = route.data['roles'] as string;
  const userRoles = authService.getUserRoles();


  if (authService.isUserLoggedIn()) {
    if (expectedRoles.includes(userRoles)) {
      return true;
    }
    return false;
  } else {
    router.navigate(["/login"]);
    return false;
  }
};
