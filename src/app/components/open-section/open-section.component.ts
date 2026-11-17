import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-open-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './open-section.component.html',
  styleUrl: './open-section.component.css',
})
export class OpenSectionComponent {
  readonly i18n = inject(TranslationService);

  readonly activeLayerIndex = signal<number>(0);

  selectLayer(index: number): void {
    this.activeLayerIndex.set(index);
  }
}
