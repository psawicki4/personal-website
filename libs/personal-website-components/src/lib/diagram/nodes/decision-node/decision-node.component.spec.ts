import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DecisionNodeComponent } from './decision-node.component';
import { Node, provideNgDiagram } from 'ng-diagram';
import { describe, it, expect, beforeEach } from 'vitest';

describe('DecisionNodeComponent', () => {
  let component: DecisionNodeComponent;
  let fixture: ComponentFixture<DecisionNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecisionNodeComponent],
      providers: [provideNgDiagram()],
    }).compileComponents();

    fixture = TestBed.createComponent(DecisionNodeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    const mockNode: Node<{ label?: string; color?: string }> = {
      id: '1',
      position: { x: 0, y: 0 },
      data: { label: 'Decision?', color: '#ff0000' },
    };
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should return color and label from node data', () => {
    const mockNode: Node<{ label?: string; color?: string }> = {
      id: '1',
      position: { x: 0, y: 0 },
      data: { label: 'Decision?', color: '#ff0000' },
    };
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
    expect(component.color).toBe('#ff0000');
    expect(component.label).toBe('Decision?');
  });
});
