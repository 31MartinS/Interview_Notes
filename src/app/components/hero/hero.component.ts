import { Component, EventEmitter, HostListener, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../core/services/translation.service';
import { SectionId } from '../navbar/navbar.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  readonly i18n = inject(TranslationService);

  @Output() startJourney = new EventEmitter<SectionId>();

  readonly parallaxX = signal(0);
  readonly parallaxY = signal(0);

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (typeof window === 'undefined' || window.innerWidth < 768) return;
    const x = (event.clientX / window.innerWidth - 0.5) * 18;
    const y = (event.clientY / window.innerHeight - 0.5) * 18;
    this.parallaxX.set(x);
    this.parallaxY.set(y);
  }

  onStartClick(): void {
    this.startJourney.emit('connect');
  }

  onSelectPillar(section: SectionId): void {
    this.startJourney.emit(section);
  }
}
