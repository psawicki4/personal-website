import { of } from 'rxjs';

export const createTranslocoMock = () => ({
  translate: (key: string) => key,
  selectTranslate: () => of((k: string) => k),
  getActiveLang: () => 'pl',
  config: { defaultLang: 'pl', reRenderOnLangChange: true },
  langChanges$: of('pl'),
  _loadDependencies: () => of(null),
});
