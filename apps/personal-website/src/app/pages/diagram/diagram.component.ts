import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TranslocoDirective } from '@jsverse/transloco';
import { initializeModel, NgDiagramComponent, NgDiagramConfig, provideNgDiagram } from 'ng-diagram';
import { CardComponent } from 'personal-website-components';
import { PortraitService } from 'utils';

@Component({
  selector: 'psa-diagram',
  imports: [NgDiagramComponent, MatIcon, CardComponent, TranslocoDirective],
  providers: [provideNgDiagram()],
  templateUrl: './diagram.component.html',
  styleUrl: './diagram.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiagramComponent {
  portraitService = inject(PortraitService);

  config: NgDiagramConfig = {
    hideWatermark: true,
  };

  model = initializeModel({
    nodes: [],
    edges: [],
  });

  get portrait() {
    return this.portraitService.portrait;
  }
}
