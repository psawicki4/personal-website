import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoService } from '@jsverse/transloco';
import { provideNgDiagram } from 'ng-diagram';
import { PortraitService, createTranslocoMock } from 'utils';
import { beforeEach, describe, expect, it } from 'vitest';
import { DiagramComponent } from './diagram.component';

describe('DiagramComponent', () => {
  let component: DiagramComponent;
  let fixture: ComponentFixture<DiagramComponent>;
  let mockPortraitService: { portrait: any };

  beforeEach(async () => {
    mockPortraitService = {
      portrait: signal(false),
    };

    await TestBed.configureTestingModule({
      imports: [DiagramComponent],
      providers: [
        { provide: PortraitService, useValue: mockPortraitService },
        { provide: TranslocoService, useValue: createTranslocoMock() },
        provideNgDiagram(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial model with nodes and edges', () => {
    const model = component.model as any;
    expect(model.nodes().length).toBeGreaterThan(0);
    expect(model.edges().length).toBeGreaterThan(0);
  });

  it('should have configuration for snapping', () => {
    expect(component.config.snapping).toBeDefined();
    if (component.config.snapping) {
      const snapConfig = component.config.snapping as any;
      expect(snapConfig.shouldSnapDragForNode({} as any)).toBe(true);
    }
  });

  it('should return portrait value from service', () => {
    mockPortraitService.portrait.set(true);
    expect(component.portrait()).toBe(true);

    mockPortraitService.portrait.set(false);
    expect(component.portrait()).toBe(false);
  });
});
