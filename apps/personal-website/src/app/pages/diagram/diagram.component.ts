import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TranslocoDirective } from '@jsverse/transloco';
import {
  Edge,
  initializeModel,
  NgDiagramBackgroundComponent,
  NgDiagramComponent,
  NgDiagramConfig,
  provideNgDiagram,
} from 'ng-diagram';
import {
  CardComponent,
  DIAGRAM_EDGE_TEMPLATES,
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
    linking: {
      finalEdgeDataBuilder: (edge: Edge<{ [key: string]: any }>) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: 'custom',
        data: { label: '', color: '#3498db', width: 2 },
      }),
    },
  };

  nodeTemplates = DIAGRAM_NODE_TEMPLATES;
  edgeTemplates = DIAGRAM_EDGE_TEMPLATES;

  model = initializeModel({
    nodes: [
      {
        id: 'node-1',
        type: 'process',
        position: { x: 300, y: 200 },
        data: { label: 'Initial Action', color: '#1a3d8a' },
      },
      {
        id: 'node-2',
        type: 'process',
        position: { x: 550, y: 185 },
        data: { label: 'Proceed?', color: '#a65100' },
      },
    ],
    edges: [
      {
        id: 'edge-1',
        type: 'custom',
        source: 'node-1',
        target: 'node-2',
        sourcePort: 'port-right',
        targetPort: 'port-left',
        data: {
          label: 'Tak',
          color: '#3498db',
          width: 2,
          dashArray: '5 5',
        },
        targetArrowhead: 'ng-diagram-arrow',
      },
    ],
  });

  get portrait() {
    return this.portraitService.portrait;
  }
}
