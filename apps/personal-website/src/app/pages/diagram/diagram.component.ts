import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TranslocoDirective } from '@jsverse/transloco';
import {
  initializeModel,
  NgDiagramBackgroundComponent,
  NgDiagramComponent,
  NgDiagramConfig,
  provideNgDiagram,
} from 'ng-diagram';
import {
  CardComponent,
  DIAGRAM_NODE_TEMPLATES,
  DiagramPaletteComponent,
  DiagramSidebarComponent,
} from 'personal-website-components';
import { PortraitService } from 'utils';

@Component({
  selector: 'psa-diagram',
  imports: [
    NgDiagramComponent,
    MatIcon,
    CardComponent,
    TranslocoDirective,
    DiagramPaletteComponent,
    DiagramSidebarComponent,
    NgDiagramBackgroundComponent,
  ],
  providers: [provideNgDiagram()],
  templateUrl: './diagram.component.html',
  styleUrl: './diagram.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiagramComponent {
  portraitService = inject(PortraitService);

  config: NgDiagramConfig = {
    hideWatermark: true,
    snapping: {
      shouldSnapDragForNode: () => true,
      computeSnapForNodeDrag: () => ({ width: 1, height: 1 }),
      defaultDragSnap: { width: 1, height: 1 },
      shouldSnapResizeForNode: () => true,
      computeSnapForNodeSize: () => ({ width: 1, height: 1 }),
      defaultResizeSnap: { width: 1, height: 1 },
    },
  };

  nodeTemplates = DIAGRAM_NODE_TEMPLATES;

  model = initializeModel({
    nodes: [
      {
        id: 'node-1',
        position: { x: 300, y: 200 },
        data: { label: 'Initial Action' },
      },
      {
        id: 'node-2',
        position: { x: 550, y: 185 },
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
