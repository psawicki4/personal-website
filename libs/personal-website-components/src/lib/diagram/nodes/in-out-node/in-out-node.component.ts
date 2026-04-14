import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgDiagramNodeTemplate, NgDiagramPortComponent, Node } from 'ng-diagram';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-in-out-node',
  imports: [NgDiagramPortComponent, CommonModule],
  templateUrl: './in-out-node.component.html',
  styleUrl: './in-out-node.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InOutNodeComponent implements NgDiagramNodeTemplate {
  node = input.required<Node<{ label?: string; color?: string }>>();

  get color(): string {
    return this.node().data.color || 'inherit';
  }

  get label(): string {
    return this.node().data.label || '';
  }
}
