import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, Signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
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
  selectedNode: Signal<Node<{ [key: string]: any }>> = computed(
    () => this.selectionService.selection().nodes[0] ?? null
  );

  nodeModel = linkedSignal(() => {
    return this.selectedNode();
  });

  nodeForm = form(
    this.nodeModel,
    (schemaPath) => {
      required(schemaPath.data['label']);
    },
    {
      submission: {
        action: async () => this.onSubmit(),
      },
    }
  );

  onSubmit() {
    this.modelService.updateNode(this.nodeModel().id, this.nodeModel());
  }
}
