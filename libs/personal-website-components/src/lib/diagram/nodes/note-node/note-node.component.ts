import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  NgDiagramNodeResizeAdornmentComponent,
  NgDiagramNodeSelectedDirective,
  Node,
  type NgDiagramNodeTemplate,
} from 'ng-diagram';

@Component({
  selector: 'lib-note-node',
  standalone: true,
  imports: [NgDiagramNodeResizeAdornmentComponent, NgStyle],
  hostDirectives: [
    {
      directive: NgDiagramNodeSelectedDirective,
      inputs: ['node'],
    },
  ],
  templateUrl: './note-node.component.html',
  styleUrl: './note-node.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteNodeComponent implements NgDiagramNodeTemplate {
  node = input.required<Node<{ note?: string; label?: string }>>();

  get note(): string {
    return this.node().data.note || '';
  }

  get label(): string {
    return this.node().data.label || '';
  }

  get size(): { width: number; height: number } {
    return this.node().size || { width: 250, height: 200 };
  }
}
