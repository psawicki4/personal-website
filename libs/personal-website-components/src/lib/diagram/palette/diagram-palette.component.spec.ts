import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoService } from '@jsverse/transloco';
import { provideNgDiagram } from 'ng-diagram';
import { LangService, createTranslocoMock } from 'utils';
import { beforeEach, describe, expect, it } from 'vitest';
import { DiagramPaletteComponent } from './diagram-palette.component';

describe('DiagramPaletteComponent', () => {
  let component: DiagramPaletteComponent;
  let fixture: ComponentFixture<DiagramPaletteComponent>;
  let mockLangService: any;

  beforeEach(async () => {
    mockLangService = {
      lang: signal('pl'),
    };

    await TestBed.configureTestingModule({
      imports: [DiagramPaletteComponent],
      providers: [
        { provide: LangService, useValue: mockLangService },
        { provide: TranslocoService, useValue: createTranslocoMock() },
        provideNgDiagram(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DiagramPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have palette model with predefined types', () => {
    const types = component.paletteModel.map((item) => item.type);
    expect(types).toContain('process');
    expect(types).toContain('decision');
    expect(types).toContain('in-out');
    expect(types).toContain('group');
    expect(types).toContain('note');
  });

  it('should have initial labels for palette items', () => {
    // translateSignal in tests with current mock returns the translation function
    const processLabel = component.processLabel() as any;
    expect(processLabel('DIAGRAM_PALETTE.process')).toBe('DIAGRAM_PALETTE.process');

    const decisionLabel = component.decisionLabel() as any;
    expect(decisionLabel('DIAGRAM_PALETTE.decision')).toBe('DIAGRAM_PALETTE.decision');
  });
});
