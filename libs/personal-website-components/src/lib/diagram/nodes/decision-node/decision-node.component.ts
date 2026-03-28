import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  NgDiagramNodeSelectedDirective,
  NgDiagramPortComponent,
  type NgDiagramNodeTemplate,
  type Node,
} from 'ng-diagram';

@Component({
  selector: 'lib-decision-node',
  standalone: true,
  imports: [NgDiagramPortComponent],
  hostDirectives: [
    {
      directive: NgDiagramNodeSelectedDirective,
      inputs: ['node'],
    },
  ],
  templateUrl: './decision-node.component.html',
  styleUrl: './decision-node.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DecisionNodeComponent implements NgDiagramNodeTemplate {
  node = input.required<Node>();

  get label(): string {
    return (this.node().data as any)?.label || '?';
  }
}
