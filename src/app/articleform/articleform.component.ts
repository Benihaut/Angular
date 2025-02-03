import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-articleform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './articleform.component.html',
  styleUrls: ['./articleform.component.scss'],
})
export class ArticleformComponent {
  articleForm: FormGroup;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private router: Router
  ) {
    this.articleForm = this.formBuilder.group({
      titre: ['', Validators.required],
      contenue: ['', Validators.required],
      auteur: ['', Validators.required],
    });
  }

  createArticle() {
    if (this.articleForm.valid) {
      this.articleService.createArticle(this.articleForm.value).subscribe({
        next: (newArticle) => {
          console.log('Nouvel article créé avec succès', newArticle);
          this.router.navigate(['/articles']);
        },
        error: (error) => {
          console.error("Erreur lors de la création de l'article:", error);
          this.errorMessage = "Erreur lors de la création de l'article.";
        },
      });
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs requis.';
    }
  }
}
