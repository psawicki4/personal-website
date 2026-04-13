import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupComponent } from './group.component';
import { GroupNode, provideNgDiagram } from 'ng-diagram';
import { describe, it, expect, beforeEach } from 'vitest';

describe('GroupComponent', () => {
  let component: GroupComponent;
  let fixture: ComponentFixture<GroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupComponent],
      providers: [provideNgDiagram()],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    const mockNode: GroupNode<{ label?: string; color?: string }> = {
      id: '1',
      position: { x: 0, y: 0 },
      isGroup: true,
      highlighted: false,
      data: { label: 'Test Group', color: '#ff0000' },
    };
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should return label and color from node data', () => {
    const mockNode: GroupNode<{ label?: string; color?: string }> = {
      id: '1',
      position: { x: 0, y: 0 },
      isGroup: true,
      highlighted: false,
      data: { label: 'Test Group', color: '#ff0000' },
    };
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
    expect(component.label).toBe('Test Group');
    expect(component.color).toBe('#ff0000');
  });

  it('should return node size if provided', () => {
    const mockNode: GroupNode<{ label?: string; color?: string }> = {
      id: '1',
      position: { x: 0, y: 0 },
      isGroup: true,
      highlighted: false,
      size: { width: 500, height: 300 },
      data: { label: 'Test Group', color: '#ff0000' },
    };
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
    expect(component.size).toEqual({ width: 500, height: 300 });
  });

  it('should return default size if not provided', () => {
    const mockNode: GroupNode<{ label?: string; color?: string }> = {
      id: '1',
      position: { x: 0, y: 0 },
      isGroup: true,
      highlighted: false,
      data: { label: 'Test Group', color: '#ff0000' },
    };
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
    expect(component.size).toEqual({ width: 250, height: 200 });
  });
});
