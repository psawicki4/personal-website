import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  NgDiagramNodeTemplate,
  Node,
  NgDiagramNodeRotateAdornmentComponent,
  NgDiagramNodeResizeAdornmentComponent,
  NgDiagramPortComponent,
} from 'ng-diagram';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-decision-node',
  imports: [
    NgDiagramNodeRotateAdornmentComponent,
    NgDiagramNodeResizeAdornmentComponent,
    NgDiagramPortComponent,
    CommonModule,
  ],
  templateUrl: './decision-node.component.html',
  styleUrl: './decision-node.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DecisionNodeComponent implements NgDiagramNodeTemplate {
  node = input.required<Node<{ label?: string; color?: string }>>();

  get color(): string {
    return this.node().data.color || 'inherit';
  }

  get label(): string {
    return this.node().data.label || '';
  }
}
