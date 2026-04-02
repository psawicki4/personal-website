import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
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
  imports: [
    NgDiagramPaletteItemComponent,
    CardComponent,
    NgDiagramPaletteItemPreviewComponent,
    NoteNodeComponent,
    TranslocoDirective,
  ],
  templateUrl: './diagram-palette.component.html',
  styleUrl: './diagram-palette.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiagramPaletteComponent {
  paletteModel: NgDiagramPaletteItem<{ label: string; note?: string; color?: string }>[] = [
    {
      type: 'note',
      data: { label: 'Nagłówek', note: 'Dodaj notatkę' },
      size: { width: 150, height: 93 },
      autoSize: false,
      resizable: true,
      rotatable: true,
    },
    {
      type: 'basic',
      data: { label: 'Nagłówek', color: '#27282b' },
      size: { width: 150, height: 42 },
      autoSize: false,
      resizable: true,
      rotatable: true,
    },
  ];

  dummyNode: Node = {
    id: '',
    position: { x: 1, y: 1 },
    data: {},
  };
}
