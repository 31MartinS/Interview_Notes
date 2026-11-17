import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-empower-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empower-section.component.html',
  styleUrl: './empower-section.component.css',
})
export class EmpowerSectionComponent {
  readonly i18n = inject(TranslationService);

  readonly selectedDiscipline = signal<number>(0);

  selectDiscipline(index: number): void {
    this.selectedDiscipline.set(index);
  }
}
