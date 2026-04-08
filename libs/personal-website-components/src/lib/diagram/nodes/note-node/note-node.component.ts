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
  imports: [NgDiagramNodeResizeAdornmentComponent],
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
}
