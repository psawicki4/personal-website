import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, linkedSignal, WritableSignal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField, FormRoot, min, pattern, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
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
    MatSelectModule,
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
  selectedEdge: WritableSignal<Edge<{ [key: string]: any }>> = linkedSignal(
    () => this.selectionService.selection().edges[0] ?? null
  );

  lines = [
    { value: '', viewValue: 'solid' },
    { value: '5 5', viewValue: 'dashed' },
    { value: '2 5', viewValue: 'dotted' },
  ];

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

  edgeForm = form(
    this.selectedEdge,
    (schemaPath) => {
      required(schemaPath.data['width'], { message: 'required-field' });
      min(schemaPath.data['width'], 1, { message: 'min-1' });
    },
    {
      submission: {
        action: async () => this.onEdgeSubmit(),
      },
    }
  );

  onNodeSubmit() {
    this.modelService.updateNode(this.selectedNode().id, this.selectedNode());
  }

  onEdgeSubmit() {
    this.modelService.updateEdge(this.selectedEdge().id, this.selectedEdge());
  }

  onColorPickerNodeChange(color: string) {
    this.nodeForm.data['color']().value.set(color);
  }

  onColorPickerEdgeChange(color: string) {
    this.edgeForm.data['color']().value.set(color);
  }
}
