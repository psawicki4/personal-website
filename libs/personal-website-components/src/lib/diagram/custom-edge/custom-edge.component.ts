import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Edge, NgDiagramBaseEdgeComponent, NgDiagramBaseEdgeLabelComponent, NgDiagramEdgeTemplate } from 'ng-diagram';

@Component({
  selector: 'lib-custom-edge',
  imports: [NgDiagramBaseEdgeComponent, NgDiagramBaseEdgeLabelComponent],
  templateUrl: './custom-edge.component.html',
  styleUrl: './custom-edge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomEdgeComponent implements NgDiagramEdgeTemplate {
  edge = input.required<Edge<{ label?: string; color?: string; width?: number; dashArray?: string }>>();

  get color(): string {
    return this.edge().data.color || '#6f7480';
  }

  get label(): string {
    return this.edge().data.label || '';
  }

  get width(): number {
    return this.edge().data.width || 2;
  }

  get dashArray(): string {
    return this.edge().data.dashArray || '';
  }
}
