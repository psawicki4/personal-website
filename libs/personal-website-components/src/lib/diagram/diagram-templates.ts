import { NgDiagramEdgeTemplateMap, NgDiagramNodeTemplateMap } from 'ng-diagram';
import { DecisionNodeComponent } from './nodes/decision-node/decision-node.component';
import { GroupComponent } from './nodes/group/group.component';
import { NoteNodeComponent } from './nodes/note-node/note-node.component';
import { ProcessNodeComponent } from './nodes/process-node/process-node.component';
import { InOutNodeComponent } from './nodes/in-out-node/in-out-node.component';
import { CustomEdgeComponent } from './custom-edge/custom-edge.component';

export const DIAGRAM_NODE_TEMPLATES: NgDiagramNodeTemplateMap = new NgDiagramNodeTemplateMap([
  ['note', NoteNodeComponent],
  ['process', ProcessNodeComponent],
  ['group', GroupComponent],
  ['decision', DecisionNodeComponent],
  ['in-out', InOutNodeComponent],
]);

export const DIAGRAM_EDGE_TEMPLATES = new NgDiagramEdgeTemplateMap([['custom', CustomEdgeComponent]]);
