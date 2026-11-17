import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent, SectionId } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { ConnectSectionComponent } from './components/connect-section/connect-section.component';
import { OpenSectionComponent } from './components/open-section/open-section.component';
import { EmpowerSectionComponent } from './components/empower-section/empower-section.component';
import { ClosingSectionComponent } from './components/closing-section/closing-section.component';
import { TranslationService } from './core/services/translation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    ConnectSectionComponent,
    OpenSectionComponent,
    EmpowerSectionComponent,
    ClosingSectionComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly i18n = inject(TranslationService);

  readonly activeSection = signal<SectionId>('hero');
  readonly scrollProgress = signal<number>(0);

  readonly sectionOrder: { id: SectionId; num: string }[] = [
    { id: 'hero', num: '00' },
    { id: 'connect', num: '01' },
    { id: 'open', num: '02' },
    { id: 'empower', num: '03' },
    { id: 'closing', num: '04' },
  ];

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
    this.scrollProgress.set(pct);

    const viewportMiddle = scrollTop + window.innerHeight * 0.36;
    let current: SectionId = 'hero';

    for (const item of this.sectionOrder) {
      const el = document.getElementById(item.id);
      if (el && el.offsetTop <= viewportMiddle) {
        current = item.id;
      }
    }

    if (this.activeSection() !== current) {
      this.activeSection.set(current);
    }
  }

  scrollToSection(sectionId: SectionId): void {
    if (typeof document === 'undefined' || typeof window === 'undefined') return;
    const target = document.getElementById(sectionId);
    if (!target) return;

    const headerOffset = 84;
    const elementPosition = target.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = Math.max(0, elementPosition - headerOffset);

    this.activeSection.set(sectionId);
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }

  getActiveSpreadIndex(): string {
    const found = this.sectionOrder.find((s) => s.id === this.activeSection());
    return found ? found.num : '00';
  }
}
