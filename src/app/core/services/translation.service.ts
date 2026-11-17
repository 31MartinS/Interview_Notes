import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Language, TranslationDictionary } from '../models/translation.model';
import esData from '../../../assets/i18n/es.json';
import enData from '../../../assets/i18n/en.json';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly document = inject(DOCUMENT);

  private readonly dictionaries: Record<Language, TranslationDictionary> = {
    es: esData,
    en: enData,
  };

  /** Idioma predeterminado: Español ('es') */
  readonly currentLang = signal<Language>('es');

  /** Diccionario reactivo actual (cambio instantáneo sin recarga) */
  readonly t = computed<TranslationDictionary>(() => this.dictionaries[this.currentLang()]);

  constructor() {
    effect(() => {
      const lang = this.currentLang();
      if (this.document?.documentElement) {
        this.document.documentElement.lang = lang;
      }
      if (this.document) {
        this.document.title =
          lang === 'es'
            ? 'IGNITE | Lo que aprendí'
            : 'IGNITE | What I Learned';
      }
    });
  }

  /** Cambia el idioma manteniendo exactamente la posición de scroll y estado actual */
  setLanguage(lang: Language): void {
    if (this.currentLang() === lang) return;
    const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    this.currentLang.set(lang);
    if (typeof window !== 'undefined') {
      requestAnimationFrame(() => {
        window.scrollTo({ top: currentScrollY, behavior: 'instant' as ScrollBehavior });
      });
    }
  }

  toggleLanguage(): void {
    const next: Language = this.currentLang() === 'es' ? 'en' : 'es';
    this.setLanguage(next);
  }
}
