import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNgDiagram } from 'ng-diagram';
import { DiagramPaletteComponent } from './diagram-palette.component';

describe('DiagramPaletteComponent', () => {
  let component: DiagramPaletteComponent;
  let fixture: ComponentFixture<DiagramPaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagramPaletteComponent],
      providers: [provideNgDiagram()],
    }).compileComponents();

    fixture = TestBed.createComponent(DiagramPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render both action and decision palette items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('ng-diagram-palette-item');
    expect(items.length).toBe(2);

    expect(compiled.querySelector('.node-preview.action')?.textContent).toContain('Action Node');
    expect(compiled.querySelector('.node-preview.decision')?.textContent).toContain('Decision Node');
  });
});
