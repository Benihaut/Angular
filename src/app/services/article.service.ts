import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { BaseApiService } from './baseApi.service';

interface Article {
  id: number;
  titre: string;
  contenue: Text;
}

@Injectable({
  providedIn: 'root',
})
export class ArticleService extends BaseApiService {
  private apiUrl = 'http://localhost:8000/api/articles';

  constructor(
    protected override http: HttpClient,
    protected override authService: AuthService
  ) {
    super(http, authService);
    console.log("URL de l'API des articles:", this.apiUrl);
  }

  getArticles(): Observable<Article[]> {
    return this.get<Article[]>(this.apiUrl).pipe(
      tap((articles) => {
        console.log('Articles bruts:', articles);
        console.log('Premier article:', articles[0]);
      }),
      tap(this.logArticles),
      tap((response) => console.log("Réponse de l'API:", response)),
      catchError(this.handleError)
    );
  }

  getArticle(id: number): Observable<Article> {
    return this.get<Article>(`${this.apiUrl}/${id}`).pipe(
      tap((article) => console.log('Article récupéré:', article)),
      catchError(this.handleError)
    );
  }

  createArticle(article: Article): Observable<Article> {
    if (!this.validateArticle(article)) {
      return throwError(() => new Error('Article invalide'));
    }
    console.log('Données envoyées au serveur:', article);
    return this.post<Article>(this.apiUrl, article).pipe(
      tap((response) => console.log('Réponse du serveur:', response)),
      catchError(this.handleError)
    );
  }

  updateArticle(id: number, article: Article): Observable<Article> {
    if (!this.validateArticle(article)) {
      return throwError(() => new Error('Article invalide'));
    }
    return this.put<Article>(`${this.apiUrl}/${id}`, article).pipe(
      tap((response) => console.log('Article mis à jour:', response)),
      catchError(this.handleError)
    );
  }

  deleteArticle(id: number): Observable<any> {
    return this.delete<any>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log('Article supprimé')),
      catchError(this.handleError)
    );
  }

  getArticlesPaginated(
    page: number,
    limit: number
  ): Observable<{ articles: Article[]; total: number }> {
    return this.get<{ articles: Article[]; total: number }>(
      `${this.apiUrl}?page=${page}&limit=${limit}`
    ).pipe(
      tap((response) => console.log('Articles paginés récupérés:', response)),
      catchError(this.handleError)
    );
  }

  searchArticles(query: string): Observable<Article[]> {
    return this.get<Article[]>(
      `${this.apiUrl}/search?q=${encodeURIComponent(query)}`
    ).pipe(tap(this.logArticles), catchError(this.handleError));
  }

  private validateArticle(article: Article): boolean {
    return (
      !!article.titre &&
      article.titre.length > 0 &&
      !!article.contenue &&
      article.contenue.length > 0
    );
  }

  private logArticles(articles: Article[]): void {
    console.log("Nombre d'articles récupérés:", articles.length);
    if (articles.length > 0) {
      console.log('Premier article:', articles[0]);
    }
  }
}
