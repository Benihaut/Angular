import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleService } from '../services/article.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-articlelist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './articlelist.component.html',
  styleUrl: './articlelist.component.scss',
})
export class ArticlelistComponent implements OnInit {
  articles$: Observable<any[]> = new Observable<any[]>();
  loading = false;
  errorMessage = '';

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    this.loading = true;
    this.articles$ = this.articleService.getArticles();
    this.loading = false;
  }

  viewArticle(id: number | undefined) {
    if (id !== undefined && id !== null) {
      this.router.navigate(['/article', id]);
    } else {
      console.error("ID d'article non défini");
      this.errorMessage = "Impossible d'afficher l'article. ID non valide.";
    }
  }

  editArticle(id: number | undefined) {
    if (id !== undefined) {
      // Redirige vers ArticleDetailComponent pour la modification
      this.router.navigate(['/article', id]);
    } else {
      console.error("ID d'article non défini pour l'édition");
      this.errorMessage = "Impossible d'éditer l'article. ID non valide.";
    }
  }

  deleteArticle(id: number | undefined) {
    if (id !== undefined) {
      this.loading = true;
      this.articleService.deleteArticle(id).subscribe({
        next: () => {
          console.log('Article supprimé avec succès');
          this.loadArticles();
        },
        error: (error) => {
          console.error("Erreur lors de la suppression de l'article:", error);
          this.errorMessage = "Erreur lors de la suppression de l'article.";
          this.loading = false;
        },
      });
    } else {
      console.error("ID d'article non défini pour la suppression");
      this.errorMessage = "Impossible de supprimer l'article. ID non valide.";
    }
  }

  createArticle() {
    // Redirige vers ArticleFormComponent pour la création
    this.router.navigate(['/article/new']);
  }
}
