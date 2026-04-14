import { ComponentFixture } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { createMockNode, setupNodeTemplateTest } from '../node-test.helpers';
import { InOutNodeComponent } from './in-out-node.component';

describe('InOutNodeComponent (Entry/Exit)', () => {
  let instance: InOutNodeComponent;
  let fixture: ComponentFixture<InOutNodeComponent>;

  beforeEach(async () => {
    const result = await setupNodeTemplateTest<InOutNodeComponent>(InOutNodeComponent);
    instance = result.component;
    fixture = result.fixture;
  });

  it('should confirm entry/exit point initialization', () => {
    const ioNode = createMockNode({ label: 'Terminal Start', color: '#27ae60' });
    fixture.componentRef.setInput('node', ioNode);
    fixture.detectChanges();
    expect(instance).not.toBeNull();
  });

  it('should map terminal node properties correctly from data source', () => {
    const greenNode = createMockNode({ label: 'Data Sink', color: '#2ecc71' });
    fixture.componentRef.setInput('node', greenNode);
    fixture.detectChanges();
    expect(instance.label).toBe('Data Sink');
    expect(instance.color).toBe('#2ecc71');
  });
});
