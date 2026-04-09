import { NgDiagramNodeTemplateMap } from 'ng-diagram';
import { GroupComponent } from './nodes/group/group.component';
import { NoteNodeComponent } from './nodes/note-node/note-node.component';
import { ProcessNodeComponent } from './nodes/process-node/process-node.component';
import { DecisionNodeComponent } from './nodes/decision-node/decision-node.component';

export const DIAGRAM_NODE_TEMPLATES: NgDiagramNodeTemplateMap = new Map<
  string,
  typeof NoteNodeComponent | typeof ProcessNodeComponent | typeof GroupComponent | typeof DecisionNodeComponent
>([
  ['note', NoteNodeComponent],
  ['process', ProcessNodeComponent],
  ['group', GroupComponent],
  ['decision', DecisionNodeComponent],
]);
