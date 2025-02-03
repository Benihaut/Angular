import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface User {
  id: number;
  email: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const storedUser = this.getFromLocalStorage('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private getFromLocalStorage(key: string): any {
    if (isPlatformBrowser(this.platformId)) {
      const item = localStorage.getItem(key);
      if (!item || item === 'undefined') return null;
      return key === 'token' ? item : JSON.parse(item);
    }
    return null;
  }

  private setToLocalStorage(key: string, value: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(
        key,
        typeof value === 'string' ? value : JSON.stringify(value)
      );
    }
  }

  private removeFromLocalStorage(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          if (response && response.token) {
            this.setToLocalStorage('token', response.token);
            if (response.user) {
              this.setToLocalStorage('currentUser', response.user);
              this.currentUserSubject.next(response.user);
            }
          }
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    this.removeFromLocalStorage('token');
    this.removeFromLocalStorage('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string | null {
    return this.getFromLocalStorage('token');
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/token/refresh`, {}).pipe(
      tap((response) => {
        if (response.token) {
          this.setToLocalStorage('token', response.token);
        }
      }),
      catchError(this.handleError)
    );
  }

  hasRole(role: string): boolean {
    const user = this.currentUserValue;
    return user?.roles?.includes(role) || false;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = "Une erreur s'est produite";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = 'Requête invalide';
          break;
        case 401:
          errorMessage = 'Non autorisé. Veuillez vous reconnecter.';
          break;
        case 404:
          errorMessage = 'Ressource non trouvée.';
          break;
        default:
          errorMessage = `Erreur ${error.status}: ${
            error.error.message || error.statusText
          }`;
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
