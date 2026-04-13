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
        data: { label: '', color: '#3498db', width: 2, dashArray: '' },
        targetArrowhead: 'ng-diagram-arrow',
      }),
    },
    zoom: { step: 0.1 },
  };

  nodeTemplates = DIAGRAM_NODE_TEMPLATES;
  edgeTemplates = DIAGRAM_EDGE_TEMPLATES;

  model = initializeModel({
    nodes: [
      {
        id: 'start',
        type: 'in-out',
        position: { x: 200, y: 430 },
        data: { label: 'Zgłoszenie Reklamacji', color: '#1a3d8a' },
      },
      {
        id: 'verification',
        type: 'process',
        position: { x: 300, y: 530 },
        data: { label: 'Weryfikacja Formalna', color: '#27282b' },
      },
      {
        id: 'is-valid',
        type: 'decision',
        position: { x: 600, y: 375 },
        data: { label: 'Czy zasadna?', color: '#a65100' },
      },
      {
        id: 'rejection',
        type: 'process',
        position: { x: 870, y: 550 },
        data: { label: 'Odrzucenie zgłoszenia', color: '#852323' },
      },
      {
        id: 'processing-group',
        type: 'group',
        isGroup: true,
        position: { x: 850, y: 300 },
        size: { width: 250, height: 180 },
        data: { label: 'Analiza Merytoryczna', color: '#27282b' },
      },
      {
        id: 'expert-opinion',
        type: 'process',
        position: { x: 870, y: 360 },
        groupId: 'processing-group',
        data: { label: 'Opinia Rzeczoznawcy', color: '#691e6b' },
      },
      {
        id: 'quality-note',
        type: 'note',
        position: { x: 450, y: 220 },
        size: { width: 275, height: 115 },
        data: { label: 'Ważne:', note: 'Wymagane zdjęcia uszkodzenia w wysokiej jakości.' },
      },
      {
        id: 'final-decision',
        type: 'in-out',
        position: { x: 1300, y: 450 },
        data: { label: 'Decyzja Końcowa', color: '#0f6135' },
      },
    ],
    edges: [
      {
        id: 'e1',
        type: 'custom',
        source: 'start',
        target: 'verification',
        sourcePort: 'port-right',
        targetPort: 'port-left',
        data: { label: 'Złożono', color: '#3498db', width: 2, dashArray: '' },
        targetArrowhead: 'ng-diagram-arrow',
      },
      {
        id: 'e2',
        type: 'custom',
        source: 'verification',
        target: 'is-valid',
        sourcePort: 'port-right',
        targetPort: 'port-left',
        data: { label: 'Sprawdzono', color: '#3498db', width: 2, dashArray: '' },
        targetArrowhead: 'ng-diagram-arrow',
      },
      {
        id: 'e3',
        type: 'custom',
        source: 'is-valid',
        target: 'expert-opinion',
        sourcePort: 'port-right',
        targetPort: 'port-left',
        data: { label: 'TAK', color: '#2ecc71', width: 2, dashArray: '' },
        targetArrowhead: 'ng-diagram-arrow',
      },
      {
        id: 'e4',
        type: 'custom',
        source: 'is-valid',
        target: 'rejection',
        sourcePort: 'port-bottom',
        targetPort: 'port-left',
        data: { label: 'NIE', color: '#e74c3c', width: 2, dashArray: '5 5' },
        targetArrowhead: 'ng-diagram-arrow',
      },
      {
        id: 'e5',
        type: 'custom',
        source: 'expert-opinion',
        target: 'final-decision',
        sourcePort: 'port-right',
        targetPort: 'port-left',
        data: { label: 'Zakończono', color: '#2ecc71', width: 3, dashArray: '' },
        targetArrowhead: 'ng-diagram-arrow',
      },
      {
        id: 'e6',
        type: 'custom',
        source: 'rejection',
        target: 'final-decision',
        sourcePort: 'port-right',
        targetPort: 'port-left',
        data: { label: 'Zamknięto', color: '#3498db', width: 2, dashArray: '' },
        targetArrowhead: 'ng-diagram-arrow',
      },
    ],
  });

  get portrait() {
    return this.portraitService.portrait;
  }
}
