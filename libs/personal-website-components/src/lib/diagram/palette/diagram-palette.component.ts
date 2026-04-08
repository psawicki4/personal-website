import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { translateSignal, TranslocoDirective } from '@jsverse/transloco';
import {
  GroupNode,
  NgDiagramPaletteItem,
  NgDiagramPaletteItemComponent,
  NgDiagramPaletteItemPreviewComponent,
  type Node,
} from 'ng-diagram';
import { LangService } from 'utils';
import { CardComponent } from '../../card/card.component';
import { BasicNodeComponent } from '../nodes/basic-node/basic-node.component';
import { GroupComponent } from '../nodes/group/group.component';
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
    GroupComponent,
    BasicNodeComponent,
  ],
  templateUrl: './diagram-palette.component.html',
  styleUrl: './diagram-palette.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiagramPaletteComponent {
  lang = inject(LangService);
  processLabel = translateSignal('DIAGRAM_PALETTE.process');
  groupNodeLabel = translateSignal('DIAGRAM_PALETTE.group');
  noteNodeLabel = translateSignal('DIAGRAM_PALETTE.note');
  addNoteLabel = translateSignal('DIAGRAM.add-note');

  paletteModel: NgDiagramPaletteItem<{ label: string; note?: string; color?: string }>[] = [
    {
      type: 'basic',
      data: { label: this.processLabel(), color: '#27282b' },
      size: { width: 150, height: 55 },
      autoSize: false,
      resizable: true,
      rotatable: true,
    },
    {
      type: 'group',
      data: { label: this.groupNodeLabel(), color: '#27282b' },
      size: { width: 150, height: 150 },
      autoSize: false,
      resizable: true,
      isGroup: true,
      rotatable: false,
    },
    {
      type: 'note',
      data: { label: this.noteNodeLabel(), note: this.addNoteLabel() },
      size: { width: 150, height: 93 },
      autoSize: false,
      resizable: true,
      rotatable: true,
    },
  ];

  dummyNode: Node = {
    id: '',
    position: { x: 1, y: 1 },
    data: { label: this.processLabel(), note: this.addNoteLabel(), color: '#27282b' },
  };
  dummyGroupNode: GroupNode = {
    id: '',
    position: { x: 1, y: 1 },
    data: { label: this.groupNodeLabel(), color: '#27282b' },
    isGroup: true,
    highlighted: false,
  };
  dummyNoteNode: Node = {
    id: '',
    position: { x: 1, y: 1 },
    data: { label: this.noteNodeLabel(), note: this.addNoteLabel(), color: '#27282b' },
  };
}
