import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav>
      <ul>
        <li><a routerLink="/home">Accueil</a></li>
        <li><a routerLink="/login">Connexion</a></li>
        <li><a routerLink="/moderation">moderation</a></li>
        <li><a routerLink="/articles">Articles</a></li>
        <li><button (click)="logout()">Déconnexion</button></li>
      </ul>
    </nav>
  `,
  styles: [
    `
      nav {
        background-color: #f8f9fa;
        padding: 10px;
      }
      ul {
        list-style-type: none;
        padding: 0;
      }
      li {
        display: inline;
        margin-right: 10px;
      }
      a {
        text-decoration: none;
        color: #007bff;
      }
      button {
        background-color: #dc3545;
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
      }
    `,
  ],
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
