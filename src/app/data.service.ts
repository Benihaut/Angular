import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getUsername(): Observable<string> {
    // Remplacez ceci par un appel API réel
    return of('Utilisateur');
  }

  getArticles(): Observable<any[]> {
    // Remplacez ceci par un appel API réel
    return of([
      {
        id: 1,
        title: 'Get The Album',
        content:
          'Retrouve la discographie sur toute les plate-forme de streaming et bientot disponible ici',
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
          'rendez-vous est pris pour ensemble foutre le feu sur la piste',
        imageUrl: 'assets/images/DSC_8529.jpg',
      },
    ]);
  }
}
