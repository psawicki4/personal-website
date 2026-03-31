import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NgDiagramPaletteItem,
  NgDiagramPaletteItemComponent,
  NgDiagramPaletteItemPreviewComponent,
  type Node,
} from 'ng-diagram';
import { CardComponent } from '../../card/card.component';
import { NoteNodeComponent } from '../nodes/note-node/note-node.component';

@Component({
  selector: 'lib-diagram-palette',
  standalone: true,
  imports: [NgDiagramPaletteItemComponent, CardComponent, NgDiagramPaletteItemPreviewComponent, NoteNodeComponent],
  templateUrl: './diagram-palette.component.html',
  styleUrl: './diagram-palette.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiagramPaletteComponent {
  paletteModel: NgDiagramPaletteItem[] = [
    { data: { label: 'Default Node' }, resizable: true, rotatable: true },
    { data: { label: 'Default Group' }, resizable: true, isGroup: true },
  ];

  dummyNode: Node = {
    id: 'node-1',
    type: 'action',
    position: { x: 100, y: 100 },
    data: { label: 'Mój node' },
  };
}
