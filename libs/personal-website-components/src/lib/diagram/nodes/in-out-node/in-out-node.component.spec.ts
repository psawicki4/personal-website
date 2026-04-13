import { ComponentFixture } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { createMockNode, setupNodeTemplateTest } from '../node-test.helpers';
import { InOutNodeComponent } from './in-out-node.component';

describe('InOutNodeComponent', () => {
  let component: InOutNodeComponent;
  let fixture: ComponentFixture<InOutNodeComponent>;

  beforeEach(async () => {
    ({ fixture, component } = await setupNodeTemplateTest<InOutNodeComponent>(InOutNodeComponent));
  });

  it('should create', () => {
    const mockNode = createMockNode({ label: 'Test Label', color: '#ff0000' });
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should return color and label from node data', () => {
    const mockNode = createMockNode({ label: 'Test Label', color: '#ff0000' });
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
    expect(component.color).toBe('#ff0000');
    expect(component.label).toBe('Test Label');
  });
});
