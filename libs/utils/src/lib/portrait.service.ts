import { afterNextRender, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PortraitService {
  private readonly _portrait = signal(false);
  readonly portrait = this._portrait.asReadonly();

  constructor() {
    afterNextRender(() => {
      const mql = globalThis.matchMedia('(orientation: portrait)');
      this._portrait.set(mql.matches);
      mql.addEventListener('change', (e) => {
        this._portrait.set(e.matches);
      });
    });
  }
}
