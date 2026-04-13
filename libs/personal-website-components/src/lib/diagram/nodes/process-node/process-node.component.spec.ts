import { ComponentFixture } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { createMockNode, setupNodeTemplateTest } from '../node-test.helpers';
import { ProcessNodeComponent } from './process-node.component';

describe('ProcessNodeComponent', () => {
  let component: ProcessNodeComponent;
  let fixture: ComponentFixture<ProcessNodeComponent>;

  beforeEach(async () => {
    ({ fixture, component } = await setupNodeTemplateTest<ProcessNodeComponent>(ProcessNodeComponent));
  });

  it('should create', () => {
    const mockNode = createMockNode({ label: 'Test Label', color: '#ff0000' });
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should return color from node data', () => {
    const mockNode = createMockNode({ label: 'Test Label', color: '#ff0000' });
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
    expect(component.color).toBe('#ff0000');
  });

  it('should return label from node data', () => {
    const mockNode = createMockNode({ label: 'Test Label', color: '#ff0000' });
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
    expect(component.label).toBe('Test Label');
  });

  it('should return inherit if color is not provided', () => {
    const mockNode = createMockNode({ label: 'Test Label' });
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
    expect(component.color).toBe('inherit');
  });
});
