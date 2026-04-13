import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteNodeComponent } from './note-node.component';
import { Node, provideNgDiagram } from 'ng-diagram';
import { describe, it, expect, beforeEach } from 'vitest';

describe('NoteNodeComponent', () => {
  let component: NoteNodeComponent;
  let fixture: ComponentFixture<NoteNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteNodeComponent],
      providers: [provideNgDiagram()],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteNodeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    const mockNode: Node<{ note?: string; label?: string }> = {
      id: '1',
      position: { x: 0, y: 0 },
      data: { label: 'Test Label', note: 'Test Note' },
    };
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should return note and label from node data', () => {
    const mockNode: Node<{ note?: string; label?: string }> = {
      id: '1',
      position: { x: 0, y: 0 },
      data: { label: 'Test Label', note: 'Test Note' },
    };
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
    expect(component.note).toBe('Test Note');
    expect(component.label).toBe('Test Label');
  });

  it('should return node size if provided', () => {
    const mockNode: Node<{ note?: string; label?: string }> = {
      id: '1',
      position: { x: 0, y: 0 },
      size: { width: 300, height: 150 },
      data: { label: 'Test Label', note: 'Test Note' },
    };
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
    expect(component.size).toEqual({ width: 300, height: 150 });
  });

  it('should return default size if not provided', () => {
    const mockNode: Node<{ note?: string; label?: string }> = {
      id: '1',
      position: { x: 0, y: 0 },
      data: { label: 'Test Label', note: 'Test Note' },
    };
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
    expect(component.size).toEqual({ width: 250, height: 200 });
  });
});
