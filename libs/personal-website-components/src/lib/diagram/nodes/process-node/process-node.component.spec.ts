import { ComponentFixture } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { createMockNode, setupNodeTemplateTest } from '../node-test.helpers';
import { ProcessNodeComponent } from './process-node.component';

describe('ProcessNodeComponent (Diagram Node)', () => {
  let nodeComponent: ProcessNodeComponent;
  let testFixture: ComponentFixture<ProcessNodeComponent>;

  beforeEach(async () => {
    ({ fixture: testFixture, component: nodeComponent } =
      await setupNodeTemplateTest<ProcessNodeComponent>(ProcessNodeComponent));
  });

  it('should be properly initialized as a process step', () => {
    const processData = createMockNode({ label: 'Background Job', color: '#3498db' });
    testFixture.componentRef.setInput('node', processData);
    testFixture.detectChanges();
    expect(nodeComponent).toBeDefined();
    expect(nodeComponent.label).toEqual('Background Job');
  });

  it('should verify the background color of the processing unit', () => {
    const dataWithColor = createMockNode({ color: '#2c3e50' });
    testFixture.componentRef.setInput('node', dataWithColor);
    testFixture.detectChanges();
    const resolvedColor = nodeComponent.color;
    expect(resolvedColor).not.toBe('inherit');
    expect(resolvedColor).toBe('#2c3e50');
  });

  it('should fallback to inherit when no specific color is defined for process', () => {
    const colorlessNode = createMockNode({ label: 'Generic Task' });
    testFixture.componentRef.setInput('node', colorlessNode);
    testFixture.detectChanges();
    expect(nodeComponent.color).toBe('inherit');
  });
});
