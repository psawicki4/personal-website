import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Node, provideNgDiagram } from 'ng-diagram';
import { beforeEach, describe, expect, it } from 'vitest';
import { ProcessNodeComponent } from './process-node.component';

describe('ProcessNodeComponent', () => {
  let component: ProcessNodeComponent;
  let fixture: ComponentFixture<ProcessNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessNodeComponent],
      providers: [provideNgDiagram()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProcessNodeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    const mockNode: Node<{ label?: string; color?: string }> = {
      id: '1',
      position: { x: 0, y: 0 },
      data: { label: 'Test Label', color: '#ff0000' },
    };
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should return color from node data', () => {
    const mockNode: Node<{ label?: string; color?: string }> = {
      id: '1',
      position: { x: 0, y: 0 },
      data: { label: 'Test Label', color: '#ff0000' },
    };
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
    expect(component.color).toBe('#ff0000');
  });

  it('should return label from node data', () => {
    const mockNode: Node<{ label?: string; color?: string }> = {
      id: '1',
      position: { x: 0, y: 0 },
      data: { label: 'Test Label', color: '#ff0000' },
    };
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
    expect(component.label).toBe('Test Label');
  });

  it('should return inherit if color is not provided', () => {
    const mockNode: Node<{ label?: string; color?: string }> = {
      id: '1',
      position: { x: 0, y: 0 },
      data: { label: 'Test Label' },
    };
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
    expect(component.color).toBe('inherit');
  });
});
