import { afterNextRender, Component, inject } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { inject as injectAnalytics } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { HeaderComponent, MenuComponent } from 'personal-website-components';
import { LangService } from 'utils';

@Component({
  selector: 'psa-root',
  imports: [RouterOutlet, MenuComponent, MatSidenavContainer, MatSidenavContent, MatSidenav, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  date = new Date();
  langService = inject(LangService);

  constructor() {
    afterNextRender(() => {
      this.langService.setLanguage();
      injectAnalytics();
      injectSpeedInsights();
    });
  }
}
