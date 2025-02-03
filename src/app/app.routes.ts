import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'moderation',
    loadComponent: () =>
      import('./moderation-commentaire/moderation-commentaire.component').then(
        (m) => m.ModerationCommentaireComponent
      ),
  },
  {
    path: 'articles',
    loadComponent: () =>
      import('./articlelist/articlelist.component').then(
        (m) => m.ArticlelistComponent
      ),
  },
  {
    path: 'article/:id',
    loadComponent: () =>
      import('./articledetail/articledetail.component').then(
        (m) => m.ArticledetailComponent
      ),
  },
  {
    path: 'article/new',
    loadComponent: () =>
      import('./articleform/articleform.component').then(
        (m) => m.ArticleformComponent
      ),
  },
  {
    path: 'article/:id/edit',
    loadComponent: () =>
      import('./articleform/articleform.component').then(
        (m) => m.ArticleformComponent
      ),
  },
  { path: '**', redirectTo: '/login' },
];
