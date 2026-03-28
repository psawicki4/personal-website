import { NgDiagramNodeTemplateMap } from 'ng-diagram';
import { ActionNodeComponent } from './nodes/action-node/action-node.component';
import { DecisionNodeComponent } from './nodes/decision-node/decision-node.component';

export const DIAGRAM_NODE_TEMPLATES: NgDiagramNodeTemplateMap = new Map([
  ['action', ActionNodeComponent],
  ['decision', DecisionNodeComponent],
]);
