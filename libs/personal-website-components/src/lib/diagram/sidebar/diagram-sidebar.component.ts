import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
  ],
  templateUrl: './diagram-sidebar.component.html',
  styleUrl: './diagram-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiagramSidebarComponent {
  private fb = inject(FormBuilder);
  private readonly selectionService = inject(NgDiagramSelectionService);
  private readonly modelService = inject(NgDiagramModelService);

  form = this.fb.group({
    label: ['', Validators.required],
    x: [0, [Validators.required, Validators.min(0)]],
    y: [0, [Validators.required, Validators.min(0)]],
  });

  selectedNode = computed(() => this.selectionService.selection().nodes[0] ?? null);

  constructor() {
    effect(() => {
      const node: Node<{ label?: string }> = this.selectedNode();
      if (node) {
        this.form.setValue({
          label: node?.data?.label || '',
          x: node.position.x,
          y: node.position.y,
        });
      }
    });
  }

  updateNode() {
    const node = this.selectedNode();
    if (node && this.form.valid) {
      const formValue = this.form.getRawValue();
      const updatedNode: Node = {
        ...node,
        position: {
          x: Number(formValue.x),
          y: Number(formValue.y),
        },
        data: {
          ...node.data,
          label: formValue.label,
        },
      };
      this.modelService.updateNode(updatedNode.id, updatedNode);
    }
  }
}
