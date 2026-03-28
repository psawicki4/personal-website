import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  NgDiagramNodeSelectedDirective,
  NgDiagramPortComponent,
  type NgDiagramNodeTemplate,
  type Node,
} from 'ng-diagram';

@Component({
  selector: 'lib-action-node',
  standalone: true,
  imports: [NgDiagramPortComponent],
  hostDirectives: [
    {
      directive: NgDiagramNodeSelectedDirective,
      inputs: ['node'],
    },
  ],
  templateUrl: './action-node.component.html',
  styleUrl: './action-node.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionNodeComponent implements NgDiagramNodeTemplate {
  node = input.required<Node>();

  get label(): string {
    return (this.node().data as any)?.label || 'Action';
  }
}
