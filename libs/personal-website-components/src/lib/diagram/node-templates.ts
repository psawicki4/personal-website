import { NgDiagramNodeTemplateMap } from 'ng-diagram';
import { BasicNodeComponent, NoteNodeComponent } from './node-templates';

export const DIAGRAM_NODE_TEMPLATES: NgDiagramNodeTemplateMap = new Map<
  string,
  typeof NoteNodeComponent | typeof BasicNodeComponent
>([
  ['note', NoteNodeComponent],
  ['basic', BasicNodeComponent],
]);
