import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  GroupNode,
  NgDiagramGroupHighlightedDirective,
  NgDiagramGroupNodeTemplate,
  NgDiagramNodeResizeAdornmentComponent,
  NgDiagramNodeSelectedDirective,
} from 'ng-diagram';

@Component({
  selector: 'lib-group-node',
  imports: [
    NgDiagramNodeResizeAdornmentComponent,
    NgDiagramGroupHighlightedDirective,
    NgDiagramNodeSelectedDirective,
    CommonModule,
  ],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupComponent implements NgDiagramGroupNodeTemplate {
  node = input.required<GroupNode<{ label?: string; color?: string }>>();

  get label(): string {
    return this.node().data.label || '';
  }

  get color(): string {
    return this.node().data.color || '';
  }

  get size(): { width: number; height: number } {
    return this.node().size || { width: 250, height: 200 };
  }
}
