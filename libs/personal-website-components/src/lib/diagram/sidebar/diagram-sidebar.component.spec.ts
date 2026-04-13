import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiagramSidebarComponent } from './diagram-sidebar.component';
import { NgDiagramModelService, NgDiagramSelectionService } from 'ng-diagram';
import { TranslocoService } from '@jsverse/transloco';
import { createTranslocoMock } from 'utils';
import { signal } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('DiagramSidebarComponent', () => {
  let component: DiagramSidebarComponent;
  let fixture: ComponentFixture<DiagramSidebarComponent>;
  let mockSelectionService: any;
  let mockModelService: any;

  beforeEach(async () => {
    mockSelectionService = {
      selection: signal({ nodes: [], edges: [] }),
    };
    mockModelService = {
      updateNode: vi.fn(),
      updateEdge: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [DiagramSidebarComponent],
      providers: [
        { provide: NgDiagramSelectionService, useValue: mockSelectionService },
        { provide: NgDiagramModelService, useValue: mockModelService },
        { provide: TranslocoService, useValue: createTranslocoMock() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DiagramSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update selected node when selection changes', () => {
    const mockNode = { id: 'node1', data: { label: 'Node 1', color: '#ff0000' }, position: { x: 0, y: 0 } };
    mockSelectionService.selection.set({ nodes: [mockNode], edges: [] });

    fixture.detectChanges();
    expect(component.selectedNode()).toEqual(mockNode);
  });

  it('should update selected edge when selection changes', () => {
    const mockEdge = { id: 'edge1', data: { label: 'Edge 1', color: '#ff0000', width: 2 }, source: 'n1', target: 'n2' };
    mockSelectionService.selection.set({ nodes: [], edges: [mockEdge] });

    fixture.detectChanges();
    expect(component.selectedEdge()).toEqual(mockEdge);
  });

  it('should call updateNode on modelService when onNodeSubmit is called', () => {
    const mockNode = { id: 'node1', data: { label: 'Node 1', color: '#ff0000' }, position: { x: 0, y: 0 } };
    mockSelectionService.selection.set({ nodes: [mockNode], edges: [] });
    fixture.detectChanges();

    component.onNodeSubmit();
    expect(mockModelService.updateNode).toHaveBeenCalledWith('node1', mockNode);
  });

  it('should call updateEdge on modelService when onEdgeSubmit is called', () => {
    const mockEdge = { id: 'edge1', data: { label: 'Edge 1', color: '#ff0000', width: 2 }, source: 'n1', target: 'n2' };
    mockSelectionService.selection.set({ nodes: [], edges: [mockEdge] });
    fixture.detectChanges();

    component.onEdgeSubmit();
    expect(mockModelService.updateEdge).toHaveBeenCalledWith('edge1', mockEdge);
  });

  it('should update node color through color picker', () => {
    const mockNode = { id: 'node1', data: { label: 'Node 1', color: '#ff0000' }, position: { x: 0, y: 0 } };
    mockSelectionService.selection.set({ nodes: [mockNode], edges: [] });
    fixture.detectChanges();

    component.onColorPickerNodeChange('#00ff00');
    expect(component.nodeForm.data['color']().value()).toBe('#00ff00');
  });
});
