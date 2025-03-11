import { HttpInterceptorFn } from "@angular/common/http";
import { AuthService } from "../service/auth.service";
import { inject } from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const authToken = authService.getAuthenticationToken();

    const authReq = authToken ? req.clone({
        setHeaders: {
            Authorization: `Bearer ${authToken}`
        }
    })
        : req;

    return next(authReq);
}