import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  NgDiagramNodeResizeAdornmentComponent,
  NgDiagramNodeRotateAdornmentComponent,
  NgDiagramNodeSelectedDirective,
  NgDiagramNodeTemplate,
  NgDiagramPortComponent,
  Node,
} from 'ng-diagram';

@Component({
  selector: 'lib-process-node',
  imports: [
    CommonModule,
    NgDiagramPortComponent,
    NgDiagramNodeResizeAdornmentComponent,
    NgDiagramNodeRotateAdornmentComponent,
  ],
  hostDirectives: [{ directive: NgDiagramNodeSelectedDirective, inputs: ['node'] }],
  templateUrl: './process-node.component.html',
  styleUrl: './process-node.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessNodeComponent implements NgDiagramNodeTemplate {
  node = input.required<Node<{ label?: string; color?: string }>>();

  get color(): string {
    return this.node().data.color || 'inherit';
  }

  get label(): string {
    return this.node().data.label || '';
  }
}
