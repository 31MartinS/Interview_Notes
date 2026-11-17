import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../core/services/translation.service';
import { Language } from '../../core/models/translation.model';

export type SectionId = 'hero' | 'connect' | 'open' | 'empower' | 'closing';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  readonly i18n = inject(TranslationService);

  @Input() activeSection: SectionId = 'hero';
  @Input() scrollProgress = 0;
  @Output() navigateSection = new EventEmitter<SectionId>();

  readonly mobileMenuOpen = signal(false);

  readonly sections: { id: SectionId; index: string }[] = [
    { id: 'hero', index: '00' },
    { id: 'connect', index: '01' },
    { id: 'open', index: '02' },
    { id: 'empower', index: '03' },
    { id: 'closing', index: '04' },
  ];

  onSelectSection(id: SectionId): void {
    this.navigateSection.emit(id);
    this.mobileMenuOpen.set(false);
  }

  onSwitchLanguage(lang: Language): void {
    this.i18n.setLanguage(lang);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((v) => !v);
  }

  getSectionLabel(id: SectionId): string {
    const nav = this.i18n.t().nav;
    switch (id) {
      case 'hero':
        return nav.hero;
      case 'connect':
        return nav.learning1;
      case 'open':
        return nav.learning2;
      case 'empower':
        return nav.learning3;
      case 'closing':
        return nav.closing;
    }
  }
}
