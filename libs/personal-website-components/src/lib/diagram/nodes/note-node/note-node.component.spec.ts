import { ComponentFixture } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { createMockNode, setupNodeTemplateTest } from '../node-test.helpers';
import { NoteNodeComponent } from './note-node.component';

describe('NoteNodeComponent (Documentation)', () => {
  let noteComp: NoteNodeComponent;
  let noteFixture: ComponentFixture<NoteNodeComponent>;

  beforeEach(async () => {
    const setup = await setupNodeTemplateTest<NoteNodeComponent>(NoteNodeComponent);
    noteComp = setup.component;
    noteFixture = setup.fixture;
  });

  it('should verify documentation note creation', () => {
    const noteData = createMockNode({ label: 'Header', note: 'Technical detail' });
    noteFixture.componentRef.setInput('node', noteData);
    noteFixture.detectChanges();
    expect(noteComp).toBeDefined();
  });

  it('should display the correct annotation and title from the data object', () => {
    const fullNote = createMockNode({ label: 'Important!', note: 'Check logs' });
    noteFixture.componentRef.setInput('node', fullNote);
    noteFixture.detectChanges();
    expect(noteComp.label).toBe('Important!');
    expect(noteComp.note).toBe('Check logs');
  });

  it('should handle custom dimensions for the sticky note component', () => {
    const largeNote = createMockNode({ label: 'L' }, { width: 500, height: 400 });
    noteFixture.componentRef.setInput('node', largeNote);
    noteFixture.detectChanges();
    expect(noteComp.size.width).toBe(500);
    expect(noteComp.size.height).toBe(400);
  });

  it('should provide default sizing if no specific dimensions are assigned', () => {
    const defaultNote = createMockNode({ label: 'S' });
    noteFixture.componentRef.setInput('node', defaultNote);
    noteFixture.detectChanges();
    expect(noteComp.size.width).toBe(250);
    expect(noteComp.size.height).toBe(200);
  });
});
