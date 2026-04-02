import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgDiagramBaseNodeTemplateComponent, NgDiagramNodeTemplate, Node } from 'ng-diagram';

@Component({
  selector: 'lib-basic-node',
  imports: [NgDiagramBaseNodeTemplateComponent, CommonModule],
  templateUrl: './basic-node.component.html',
  styleUrl: './basic-node.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicNodeComponent implements NgDiagramNodeTemplate {
  node = input.required<Node<{ label?: string; color?: string }>>();

  get color(): string {
    return this.node().data.color || 'inherit';
  }

  get label(): string {
    return this.node().data.label || 'Nagłówek';
  }
}
