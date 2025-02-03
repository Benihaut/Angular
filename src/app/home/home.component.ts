import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  username: string = '';
  articles: any[] = [];

  constructor() {}

  ngOnInit() {
    this.username = 'Utilisateur'; // Remplacez par des données dynamiques si nécessaire

    // Exemple de données fictives pour les articles
    this.articles = [
      {
        id: 1,
        title: 'Get The Album',
        content:
          'Retrouve la discographie sur toute les plate-forme de streaming et bientot disponible ici ',
        imageUrl: 'assets/images/coverSingle.jpg',
      },
      {
        id: 2,
        title: 'News',
        content:
          "A l'affut de toute les actualité musicale et cuturel dans la région ile de france et plus précisement dans le mon entier haha",
        imageUrl: 'assets/images/ciel.jpeg',
      },
      {
        id: 3,
        title: 'Next Date',
        content:
          'rendez-vous est pris pour ensemble foutre le feu sur la piste ',
        imageUrl: 'assets/images/DSC_8529.jpg',
      },
    ];
    console.log('HomeComponent initialized');
  }

  viewArticle(articleId: number) {
    console.log(`Afficher l'article avec l'ID : ${articleId}`);
    // Ajoutez ici la logique pour naviguer vers une page spécifique ou afficher plus de détails.
  }
}
