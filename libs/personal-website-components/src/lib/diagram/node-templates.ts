import { NgDiagramNodeTemplateMap } from 'ng-diagram';

import { BasicNodeComponent } from './nodes/basic-node/basic-node.component';
import { GroupComponent } from './nodes/group/group.component';
import { NoteNodeComponent } from './nodes/note-node/note-node.component';

export const DIAGRAM_NODE_TEMPLATES: NgDiagramNodeTemplateMap = new Map<
  string,
  typeof NoteNodeComponent | typeof BasicNodeComponent | typeof GroupComponent
>([
  ['note', NoteNodeComponent],
  ['basic', BasicNodeComponent],
  ['group', GroupComponent],
]);
