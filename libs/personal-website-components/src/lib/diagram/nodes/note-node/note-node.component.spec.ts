import { ComponentFixture } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { createMockNode, setupNodeTemplateTest } from '../node-test.helpers';
import { NoteNodeComponent } from './note-node.component';

describe('NoteNodeComponent', () => {
  let component: NoteNodeComponent;
  let fixture: ComponentFixture<NoteNodeComponent>;

  beforeEach(async () => {
    ({ fixture, component } = await setupNodeTemplateTest<NoteNodeComponent>(NoteNodeComponent));
  });

  it('should create', () => {
    const mockNode = createMockNode({ label: 'Test Label', note: 'Test Note' });
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should return note and label from node data', () => {
    const mockNode = createMockNode({ label: 'Test Label', note: 'Test Note' });
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
    expect(component.note).toBe('Test Note');
    expect(component.label).toBe('Test Label');
  });

  it('should return node size if provided', () => {
    const mockNode = createMockNode({ label: 'Test Label', note: 'Test Note' }, { width: 300, height: 150 });
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
    expect(component.size).toEqual({ width: 300, height: 150 });
  });

  it('should return default size if not provided', () => {
    const mockNode = createMockNode({ label: 'Test Label', note: 'Test Note' });
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
    expect(component.size).toEqual({ width: 250, height: 200 });
  });
});
