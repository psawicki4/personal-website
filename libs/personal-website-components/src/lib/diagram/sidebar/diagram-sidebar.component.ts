import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, Signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField, FormRoot, required, submit } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslocoDirective } from '@jsverse/transloco';
import { NgDiagramModelService, NgDiagramSelectionService, type Node } from 'ng-diagram';
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
  ],
  templateUrl: './diagram-sidebar.component.html',
  styleUrl: './diagram-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiagramSidebarComponent {
  private readonly selectionService = inject(NgDiagramSelectionService);
  private readonly modelService = inject(NgDiagramModelService);

  nodeModel = linkedSignal(() => {
    return {
      id: this.selectedNode().id,
      position: { x: this.selectedNode().position.x, y: this.selectedNode().position.y },
      data: { label: this.selectedNode().data.label || '' },
    };
  });

  nodeForm = form(
    this.nodeModel,
    (schemaPath) => {
      required(schemaPath.data.label);
    },
    {
      submission: {
        action: async () => this.onSubmit(),
      },
    }
  );

  selectedNode: Signal<Node<{ label?: string }>> = computed(() => this.selectionService.selection().nodes[0] ?? null);

  onSubmit() {
    this.modelService.updateNode(this.nodeModel().id, this.nodeModel());
  }
}
