import { Edge, Node } from 'ng-diagram';

export const DEFAULT_DIAGRAM_NODES: Node[] = [
  {
    id: 'start',
    type: 'in-out',
    position: { x: 200, y: 430 },
    data: { label: 'Zgłoszenie Reklamacji', color: '#1a3d8a' },
  },
  {
    id: 'verification',
    type: 'process',
    position: { x: 300, y: 530 },
    data: { label: 'Weryfikacja Formalna', color: '#27282b' },
  },
  {
    id: 'is-valid',
    type: 'decision',
    position: { x: 600, y: 375 },
    data: { label: 'Czy zasadna?', color: '#a65100' },
  },
  {
    id: 'rejection',
    type: 'process',
    position: { x: 870, y: 550 },
    data: { label: 'Odrzucenie zgłoszenia', color: '#852323' },
  },
  {
    id: 'processing-group',
    type: 'group',
    isGroup: true,
    position: { x: 850, y: 300 },
    size: { width: 250, height: 180 },
    data: { label: 'Analiza Merytoryczna', color: '#27282b' },
  },
  {
    id: 'expert-opinion',
    type: 'process',
    position: { x: 870, y: 360 },
    groupId: 'processing-group',
    data: { label: 'Opinia Rzeczoznawcy', color: '#691e6b' },
  },
  {
    id: 'quality-note',
    type: 'note',
    position: { x: 450, y: 220 },
    size: { width: 275, height: 115 },
    data: { label: 'Ważne:', note: 'Wymagane zdjęcia uszkodzenia w wysokiej jakości.' },
  },
  {
    id: 'final-decision',
    type: 'in-out',
    position: { x: 1300, y: 450 },
    data: { label: 'Decyzja Końcowa', color: '#0f6135' },
  },
];

function createDiagramEdge(
  id: string,
  source: string,
  target: string,
  label: string,
  options: {
    color?: string;
    width?: number;
    dashArray?: string;
    sourcePort?: string;
    targetPort?: string;
  } = {}
): Edge {
  return {
    id,
    source,
    target,
    type: 'custom',
    sourcePort: options.sourcePort || 'port-right',
    targetPort: options.targetPort || 'port-left',
    targetArrowhead: 'ng-diagram-arrow',
    data: {
      label,
      color: options.color || '#3498db',
      width: options.width || 2,
      dashArray: options.dashArray || '',
    },
  };
}

export const DEFAULT_DIAGRAM_EDGES: Edge[] = [
  createDiagramEdge('e1', 'start', 'verification', 'Złożono'),
  createDiagramEdge('e2', 'verification', 'is-valid', 'Sprawdzono'),
  createDiagramEdge('e3', 'is-valid', 'expert-opinion', 'TAK', { color: '#2ecc71' }),
  createDiagramEdge('e4', 'is-valid', 'rejection', 'NIE', {
    color: '#e74c3c',
    dashArray: '5 5',
    sourcePort: 'port-bottom',
  }),
  createDiagramEdge('e5', 'expert-opinion', 'final-decision', 'Zakończono', {
    color: '#2ecc71',
    width: 3,
  }),
  createDiagramEdge('e6', 'rejection', 'final-decision', 'Zamknięto'),
];
