import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoService } from '@jsverse/transloco';
import { createTranslocoMock } from 'utils';
import { DiagramComponent } from './diagram.component';

describe('DiagramComponent', () => {
  let component: DiagramComponent;
  let fixture: ComponentFixture<DiagramComponent>;
  const translocoMock = createTranslocoMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagramComponent],
      providers: [{ provide: TranslocoService, useValue: translocoMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(DiagramComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });
});
