import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNgDiagram, type Node } from 'ng-diagram';
import { DecisionNodeComponent } from './decision-node.component';

describe('DecisionNodeComponent', () => {
  let component: DecisionNodeComponent;
  let fixture: ComponentFixture<DecisionNodeComponent>;

  const mockNode: Node = {
    id: 'node-2',
    type: 'decision',
    position: { x: 0, y: 0 },
    data: { label: 'Is it working?' },
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
      imports: [DecisionNodeComponent],
      providers: [provideNgDiagram()],
    }).compileComponents();

    fixture = TestBed.createComponent(DecisionNodeComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('node', mockNode);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct label from node data', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content')?.textContent).toContain('Is it working?');
  });

  it('should use default label if data is missing', () => {
    const emptyNode: Node = { ...mockNode, data: {} };
    fixture.componentRef.setInput('node', emptyNode);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content')?.textContent).toContain('?');
  });
});
