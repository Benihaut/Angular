import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-articledetail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './articledetail.component.html',
  styleUrls: ['./articledetail.component.scss'],
})
export class ArticledetailComponent implements OnInit {
  article: any;
  articleForm: FormGroup;
  isEditing = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private formBuilder: FormBuilder
  ) {
    this.articleForm = this.formBuilder.group({
      titre: ['', Validators.required],
      contenue: ['', Validators.required],
      auteur: ['', Validators.required],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadArticle(+id);
    }
  }

  loadArticle(id: number) {
    this.articleService.getArticle(id).subscribe({
      next: (article) => {
        this.article = article;
        this.articleForm.patchValue(article);
      },
      error: (error) => {
        console.error("Erreur lors du chargement de l'article:", error);
        this.errorMessage = "Impossible de charger l'article.";
      },
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.articleForm.patchValue(this.article);
    }
  }

  updateArticle() {
    if (this.articleForm.valid) {
      const updatedArticle = { ...this.article, ...this.articleForm.value };
      this.articleService
        .updateArticle(this.article.id, updatedArticle)
        .subscribe({
          next: (response) => {
            console.log('Article mis à jour avec succès', response);
            this.article = response;
            this.isEditing = false;
          },
          error: (error) => {
            console.error("Erreur lors de la mise à jour de l'article:", error);
            this.errorMessage = "Erreur lors de la mise à jour de l'article.";
          },
        });
    }
  }
}
