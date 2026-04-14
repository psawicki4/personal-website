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
import { DEFAULT_DIAGRAM_EDGES, DEFAULT_DIAGRAM_NODES } from './diagram.model';

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
        data: { label: '', color: '#3498db', width: 2, dashArray: '' },
        targetArrowhead: 'ng-diagram-arrow',
      }),
    },
    zoom: { step: 0.1 },
  };

  nodeTemplates = DIAGRAM_NODE_TEMPLATES;
  edgeTemplates = DIAGRAM_EDGE_TEMPLATES;

  model = initializeModel({
    nodes: DEFAULT_DIAGRAM_NODES,
    edges: DEFAULT_DIAGRAM_EDGES,
  });

  get portrait() {
    return this.portraitService.portrait;
  }
}
