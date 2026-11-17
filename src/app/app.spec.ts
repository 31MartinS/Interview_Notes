import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App (IGNITE | Lo que aprendí)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app and default to Spanish (es)', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    expect(app.i18n.currentLang()).toBe('es');
    expect(app.i18n.t().hero.title).toBe('Lo que aprendí sobre IGNITE');
  });

  it('should switch language dynamically between ES and EN without reload', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    expect(app.i18n.t().connect.title).toBe('ALCANCE REGIONAL');

    app.i18n.setLanguage('en');
    fixture.detectChanges();

    expect(app.i18n.currentLang()).toBe('en');
    expect(app.i18n.t().connect.title).toBe('REGIONAL REACH');
  });
});
