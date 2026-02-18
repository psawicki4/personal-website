import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoService } from '@jsverse/transloco';
import { of } from 'rxjs';
import { LangCode, LangService } from 'utils';
import { describe, expect, it, vi } from 'vitest';
import { LangSwitchComponent } from './lang-switch.component';

describe('LangSwitchComponent', () => {
  let component: LangSwitchComponent;
  let fixture: ComponentFixture<LangSwitchComponent>;
  let langService: LangService;

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
      imports: [LangSwitchComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: TranslocoService, useValue: translocoMock },
        LangService, // Use real service as it is stateful signal based
      ],
    });

    fixture = TestBed.createComponent(LangSwitchComponent);
    component = fixture.componentInstance;
    langService = TestBed.inject(LangService);
    fixture.detectChanges();
  });

  it('should change language', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    component.changeLanguage(LangCode.EN);

    expect(translocoMock.setActiveLang).toHaveBeenCalledWith('en');
    expect(setItemSpy).toHaveBeenCalledWith('langCode', 'en');
    expect(langService.lang()).toBe('en');
  });
});
