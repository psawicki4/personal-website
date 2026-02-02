import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { of } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  const translocoMock = {
    translate: (key: string) => key,
    selectTranslate: () => of((k: string) => k),
    getActiveLang: () => 'pl',
    setActiveLang: vi.fn(),
    config: { defaultLang: 'pl', reRenderOnLangChange: true },
    langChanges$: of('pl'),
    _loadDependencies: () => of(null),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: TranslocoService, useValue: translocoMock },
      ],
    });

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit navigate event when clicked', () => {
    const emitSpy = vi.spyOn(component.navigate, 'emit');
    component.onClick();
    expect(emitSpy).toHaveBeenCalled();
  });
});
