import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNgDiagram, type Node } from 'ng-diagram';
import { ActionNodeComponent } from './action-node.component';

describe('ActionNodeComponent', () => {
  let component: ActionNodeComponent;
  let fixture: ComponentFixture<ActionNodeComponent>;

  const mockNode: Node = {
    id: 'node-1',
    type: 'action',
    position: { x: 0, y: 0 },
    data: { label: 'Test Action' },
  };

  beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionNodeComponent],
      providers: [provideNgDiagram()],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionNodeComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct label from node data', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.header')?.textContent).toContain('Test Action');
  });

  it('should use default label if data is missing', () => {
    const emptyNode: Node = { ...mockNode, data: {} };
    fixture.componentRef.setInput('node', emptyNode);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.header')?.textContent).toContain('Action');
  });
});
