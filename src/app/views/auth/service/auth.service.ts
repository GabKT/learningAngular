import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { catchError, map, Observable, of } from 'rxjs';
import { Token } from '../model/token.model';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: string = "authToken";

  baseUrl: string = "http://localhost:8080/auth";

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {

  }

  login(user: User): Observable<boolean> {
    return this.http.post<Token>(this.baseUrl + "/login", user).pipe(
      map((token: Token) => {
        localStorage.setItem("authToken", token.token);
        return true
      })
    )
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/register", user)
  }

  getAuthenticationToken(): string | null {
    return localStorage.getItem(this.authToken);
  }

  getTokenExpirationDate(token: string): Date | null {
    if (!token) {
      return null;
    }
    try {
      const decodedToken: JwtPayload = jwtDecode(token);
      if (!decodedToken.exp) {
        return null;
      }
      const date = new Date(0);
      date.setUTCSeconds(decodedToken.exp);
      return date;
    } catch (error) {
      console.error("Erro ao decodificar token ", error);
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    const expirationDate = this.getTokenExpirationDate(token);
    if (!expirationDate) {
      return true
    }
    return expirationDate.getTime() < Date.now();
  }

  isUserLoggedIn(): boolean {
    const token = this.getAuthenticationToken();
    if (!token) {
      return false;
    }
    try {
      const decodedToken: JwtPayload = jwtDecode(token);
      if (decodedToken.iss == "simple-api" && !this.isTokenExpired(token)) {
        return true
      } else {
        return false;
      }
    } catch (error) {
      console.error("Erro ao decodificar token ", error);
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem(this.authToken);
    this.router.navigate(["/login"]);
  }
}
