import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../core/services/translation.service';
import { SectionId } from '../navbar/navbar.component';

@Component({
  selector: 'app-closing-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './closing-section.component.html',
  styleUrl: './closing-section.component.css',
})
export class ClosingSectionComponent {
  readonly i18n = inject(TranslationService);

  @Output() navigateTo = new EventEmitter<SectionId>();

  onBackToTop(): void {
    this.navigateTo.emit('hero');
  }

  onJumpToPillar(target: SectionId): void {
    this.navigateTo.emit(target);
  }
}
