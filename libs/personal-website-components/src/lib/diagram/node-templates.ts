import { NgDiagramNodeTemplateMap } from 'ng-diagram';
import { BasicNodeComponent, NoteNodeComponent } from './node-templates';
import { GroupComponent } from './nodes/group/group.component';

export const DIAGRAM_NODE_TEMPLATES: NgDiagramNodeTemplateMap = new Map<
  string,
  typeof NoteNodeComponent | typeof BasicNodeComponent | typeof GroupComponent
>([
  ['note', NoteNodeComponent],
  ['basic', BasicNodeComponent],
  ['group', GroupComponent],
]);
