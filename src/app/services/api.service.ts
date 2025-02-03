import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { BaseApiService } from './baseApi.service';

@Injectable({
  providedIn: 'root',
})
export class ModerationService extends BaseApiService {
  private apiUrl = 'http://localhost:8000/api/moderation';

  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  getCommentairesEnAttente(): Observable<any[]> {
    return this.get<any[]>(`${this.apiUrl}/commentaires/en-attente`);
  }

  approuverCommentaire(id: number): Observable<any> {
    return this.post<any>(`${this.apiUrl}/commentaires/approuver/${id}`, {});
  }

  rejeterCommentaire(id: number): Observable<any> {
    return this.post<any>(`${this.apiUrl}/commentaires/rejeter/${id}`, {});
  }

  getCommentairesApprouves(): Observable<any[]> {
    return this.get<any[]>(`${this.apiUrl}/commentaires/approuves`);
  }
}
