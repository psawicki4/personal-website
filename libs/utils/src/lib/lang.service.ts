import { inject, Injectable, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  private readonly _lang = signal(LangCode.PL);
  readonly lang = this._lang.asReadonly();

  transloco = inject(TranslocoService);

  initLanguage() {
    this.transloco.setDefaultLang(LangCode.PL);
    const lang = localStorage.getItem('langCode') ?? globalThis.navigator?.language?.slice(0, 2);
    if (lang === LangCode.PL || lang === LangCode.EN) {
      this.transloco.setActiveLang(lang);
      this._lang.set(lang);
    } else {
      this._lang.set(LangCode.PL);
    }
  }

  setLanguage(langCode: LangCode) {
    this.transloco.setActiveLang(langCode);
    localStorage.setItem('langCode', langCode);
    this._lang.set(langCode);
  }
}

export enum LangCode {
  PL = 'pl',
  EN = 'en',
}
