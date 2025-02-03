import { CommonModule } from '@angular/common'; // Pour ngFor, etc.
import { Component, OnInit } from '@angular/core';
import { ModerationService } from '../services/api.service';

@Component({
  selector: 'app-moderation-commentaire',
  templateUrl: './moderation-commentaire.component.html',
  styleUrls: ['./moderation-commentaire.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ModerationCommentaireComponent implements OnInit {
  commentairesEnAttente: any[] = [];
  commentairesApprouves: any[] = [];

  constructor(private moderationService: ModerationService) {}

  ngOnInit() {
    this.chargerCommentaires();
  }

  chargerCommentaires() {
    this.moderationService
      .getCommentairesEnAttente()
      .subscribe((commentaires) => (this.commentairesEnAttente = commentaires));
    this.moderationService
      .getCommentairesApprouves()
      .subscribe((commentaires) => (this.commentairesApprouves = commentaires));
  }

  approuver(id: number) {
    this.moderationService.approuverCommentaire(id).subscribe(() => {
      this.chargerCommentaires();
    });
  }

  rejeter(id: number) {
    this.moderationService.rejeterCommentaire(id).subscribe(() => {
      this.chargerCommentaires();
    });
  }
}
