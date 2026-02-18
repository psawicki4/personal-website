import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { TranslocoService } from '@jsverse/transloco';
import { LangCode, LangService } from 'utils';

@Component({
  selector: 'lib-lang-switch',
  imports: [MatButton],
  templateUrl: './lang-switch.component.html',
  styleUrl: './lang-switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LangSwitchComponent {
  transloco = inject(TranslocoService);
  langService = inject(LangService);
  LangCode = LangCode;

  changeLanguage(langCode: LangCode) {
    this.langService.setLanguage(langCode);
  }
}
