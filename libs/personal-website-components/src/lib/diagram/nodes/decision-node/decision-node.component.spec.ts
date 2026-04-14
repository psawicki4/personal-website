import { ComponentFixture } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { createMockNode, setupNodeTemplateTest } from '../node-test.helpers';
import { DecisionNodeComponent } from './decision-node.component';

describe('DecisionNodeComponent (Logic Gate)', () => {
  let comp: DecisionNodeComponent;
  let fix: ComponentFixture<DecisionNodeComponent>;

  beforeEach(async () => {
    const setup = await setupNodeTemplateTest<DecisionNodeComponent>(DecisionNodeComponent);
    comp = setup.component;
    fix = setup.fixture;
  });

  it('should validate the creation of a decision-making component', () => {
    const logicNode = createMockNode({ label: 'Is Valid?', color: '#e67e22' });
    fix.componentRef.setInput('node', logicNode);
    fix.detectChanges();
    expect(comp).toBeTruthy();
    expect(comp.label).toBe('Is Valid?');
  });

  it('should accurately reflect the hex color assigned to the decision node', () => {
    const orangeNode = createMockNode({ color: '#d35400' });
    fix.componentRef.setInput('node', orangeNode);
    fix.detectChanges();
    expect(comp.color).toEqual('#d35400');
    expect(comp.color).toContain('#');
  });
});
