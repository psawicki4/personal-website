import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { TranslocoDirective } from '@jsverse/transloco';
import { CardComponent, HomeThreeComponent } from 'personal-website-components';

@Component({
  selector: 'psa-home',
  imports: [CardComponent, MatAnchor, TranslocoDirective, HomeThreeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
