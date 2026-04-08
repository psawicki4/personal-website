import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  linkedSignal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField, FormRoot, pattern, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslocoDirective } from '@jsverse/transloco';
import { Edge, NgDiagramModelService, NgDiagramSelectionService, type Node } from 'ng-diagram';
import { ColorPickerDirective } from 'ngx-color-picker';
import { CardComponent } from '../../card/card.component';

@Component({
  selector: 'lib-diagram-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TranslocoDirective,
    CardComponent,
    FormField,
    FormRoot,
    ColorPickerDirective,
  ],
  templateUrl: './diagram-sidebar.component.html',
  styleUrl: './diagram-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiagramSidebarComponent {
  private readonly selectionService = inject(NgDiagramSelectionService);
  private readonly modelService = inject(NgDiagramModelService);
  selectedNode: WritableSignal<Node<{ [key: string]: any }>> = linkedSignal(
    () => this.selectionService.selection().nodes[0] ?? null
  );
  selectedEdge: Signal<Edge<{ [key: string]: any }>> = computed(
    () => this.selectionService.selection().edges[0] ?? null
  );

  nodeForm = form(
    this.selectedNode,
    (schemaPath) => {
      required(schemaPath.data['label'], { message: 'required-field' });
      required(schemaPath.data['color'], { message: 'required-field' });
      required(schemaPath.position.x, { message: 'required-field' });
      required(schemaPath.position.y, { message: 'required-field' });
      pattern(schemaPath.data['color'], /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, { message: 'invalid-color-format' });
    },
    {
      submission: {
        action: async () => this.onNodeSubmit(),
      },
    }
  );

  edgeModel = linkedSignal(() => ({ label: this.selectedEdge()?.data['label'] || '' }));

  edgeForm = form(this.edgeModel, {
    submission: {
      action: async () => this.onEdgeSubmit(),
    },
  });

  onNodeSubmit() {
    this.modelService.updateNode(this.selectedNode().id, this.selectedNode());
  }

  onEdgeSubmit() {
    this.modelService.updateEdge(this.selectedEdge().id, { data: { label: this.edgeModel().label } });
  }

  onColorPickerChange(color: string) {
    this.nodeForm.data['color']().value.set(color);
  }

  get color(): string {
    return this.selectedNode()?.data['color'] || 'inherit';
  }
}
