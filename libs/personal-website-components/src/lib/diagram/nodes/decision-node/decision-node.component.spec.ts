import { ComponentFixture } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { createMockNode, setupNodeTemplateTest } from '../node-test.helpers';
import { DecisionNodeComponent } from './decision-node.component';

describe('DecisionNodeComponent', () => {
  let component: DecisionNodeComponent;
  let fixture: ComponentFixture<DecisionNodeComponent>;

  beforeEach(async () => {
    ({ fixture, component } = await setupNodeTemplateTest<DecisionNodeComponent>(DecisionNodeComponent));
  });

  it('should create', () => {
    const mockNode = createMockNode({ label: 'Decision?', color: '#ff0000' });
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should return color and label from node data', () => {
    const mockNode = createMockNode({ label: 'Decision?', color: '#ff0000' });
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
    expect(component.color).toBe('#ff0000');
    expect(component.label).toBe('Decision?');
  });
});
