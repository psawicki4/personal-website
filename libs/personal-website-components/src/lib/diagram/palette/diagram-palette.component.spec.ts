import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoService } from '@jsverse/transloco';
import { provideNgDiagram } from 'ng-diagram';
import { createTranslocoMock } from 'utils';
import { DiagramPaletteComponent } from './diagram-palette.component';

describe('DiagramPaletteComponent', () => {
  let component: DiagramPaletteComponent;
  let fixture: ComponentFixture<DiagramPaletteComponent>;

  const translocoMock = createTranslocoMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagramPaletteComponent],
      providers: [provideNgDiagram(), { provide: TranslocoService, useValue: translocoMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(DiagramPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all palette items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('ng-diagram-palette-item');
    expect(items.length).toBe(3);
  });
});
