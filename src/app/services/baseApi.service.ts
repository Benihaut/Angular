import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

export class BaseApiService {
  constructor(protected http: HttpClient, protected authService: AuthService) {}

  protected getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  protected handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401) {
      return this.authService.refreshToken().pipe(
        switchMap(() => {
          const headers = this.getHeaders();
          return this.http.request(
            error.error.method || 'GET',
            error.url || '',
            {
              headers: headers,
              body: error.error,
            }
          ) as Observable<never>;
        }),
        catchError((refreshError) => {
          console.error(
            'Erreur lors du rafraîchissement du token:',
            refreshError
          );
          this.authService.logout();
          return throwError(
            () => new Error('Session expirée. Veuillez vous reconnecter.')
          );
        })
      );
    }

    console.error('Erreur détaillée:', {
      status: error.status,
      statusText: error.statusText,
      message: error.message,
      url: error.url,
      error: error.error,
    });
    return throwError(() => new Error(error.message || 'Erreur du serveur'));
  }

  protected get<T>(url: string): Observable<T> {
    return this.http
      .get<T>(url, { headers: this.getHeaders() })
      .pipe(
        catchError(
          (error: HttpErrorResponse) =>
            this.handleError(error) as Observable<never>
        )
      );
  }

  protected post<T>(url: string, body: any): Observable<T> {
    return this.http
      .post<T>(url, body, { headers: this.getHeaders() })
      .pipe(
        catchError(
          (error: HttpErrorResponse) =>
            this.handleError(error) as Observable<never>
        )
      );
  }
  protected put<T>(url: string, body: any): Observable<T> {
    return this.http
      .put<T>(url, body, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => this.handleError(error) as Observable<never>)
      );
  }

  protected delete<T>(url: string): Observable<T> {
    return this.http
      .delete<T>(url, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => this.handleError(error) as Observable<never>)
      );
  }
}
