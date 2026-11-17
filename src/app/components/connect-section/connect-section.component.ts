import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-connect-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './connect-section.component.html',
  styleUrl: './connect-section.component.css',
})
export class ConnectSectionComponent {
  readonly i18n = inject(TranslationService);

  readonly selectedNodeIndex = signal<number>(0);

  selectNode(index: number): void {
    this.selectedNodeIndex.set(index);
  }
}
