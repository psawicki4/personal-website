import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TranslocoDirective } from '@jsverse/transloco';
import { initializeModel, NgDiagramComponent, NgDiagramConfig, provideNgDiagram } from 'ng-diagram';
import { CardComponent, DIAGRAM_NODE_TEMPLATES, DiagramPaletteComponent } from 'personal-website-components';
import { PortraitService } from 'utils';

@Component({
  selector: 'psa-diagram',
  imports: [NgDiagramComponent, MatIcon, CardComponent, TranslocoDirective, DiagramPaletteComponent],
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

  nodeTemplates = DIAGRAM_NODE_TEMPLATES;

  model = initializeModel({
    nodes: [
      {
        id: 'node-1',
        type: 'action',
        position: { x: 100, y: 100 },
        data: { label: 'Initial Action' },
      },
      {
        id: 'node-2',
        type: 'decision',
        position: { x: 350, y: 85 },
        data: { label: 'Proceed?' },
      },
    ],
    edges: [
      {
        id: 'edge-1',
        source: 'node-1',
        target: 'node-2',
        sourcePort: 'out',
        targetPort: 'in',
        data: {},
      },
    ],
  });

  get portrait() {
    return this.portraitService.portrait;
  }
}
