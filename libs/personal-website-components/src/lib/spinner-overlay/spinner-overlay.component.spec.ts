import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerOverlayComponent } from './spinner-overlay.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('SpinnerOverlayComponent', () => {
  let component: SpinnerOverlayComponent;
  let fixture: ComponentFixture<SpinnerOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerOverlayComponent, MatProgressSpinnerModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerOverlayComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
