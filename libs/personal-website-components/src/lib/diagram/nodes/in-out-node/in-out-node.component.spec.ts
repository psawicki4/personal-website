import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Node, provideNgDiagram } from 'ng-diagram';
import { beforeEach, describe, expect, it } from 'vitest';
import { InOutNodeComponent } from './in-out-node.component';

describe('InOutNodeComponent', () => {
  let component: InOutNodeComponent;
  let fixture: ComponentFixture<InOutNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InOutNodeComponent],
      providers: [provideNgDiagram()],
    }).compileComponents();

    fixture = TestBed.createComponent(InOutNodeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    const mockNode: Node<{ label?: string; color?: string }> = {
      id: '1',
      position: { x: 0, y: 0 },
      data: { label: 'Test Label', color: '#ff0000' },
    };
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should return color and label from node data', () => {
    const mockNode: Node<{ label?: string; color?: string }> = {
      id: '1',
      position: { x: 0, y: 0 },
      data: { label: 'Test Label', color: '#ff0000' },
    };
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
    expect(component.color).toBe('#ff0000');
    expect(component.label).toBe('Test Label');
  });
});
