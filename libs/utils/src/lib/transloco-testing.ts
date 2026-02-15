import { of } from 'rxjs';
import { vi } from 'vitest';

export const createTranslocoMock = () => ({
  translate: (key: string) => key,
  selectTranslate: () => of((k: string) => k),
  getActiveLang: () => 'pl',
  setActiveLang: vi.fn(),
  config: { defaultLang: 'pl', reRenderOnLangChange: true },
  langChanges$: of('pl'),
  _loadDependencies: () => of(null),
});
