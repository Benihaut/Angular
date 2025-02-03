import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerationCommentaireComponent } from './moderation-commentaire.component';

describe('ModerationCommentaireComponent', () => {
  let component: ModerationCommentaireComponent;
  let fixture: ComponentFixture<ModerationCommentaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModerationCommentaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModerationCommentaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
