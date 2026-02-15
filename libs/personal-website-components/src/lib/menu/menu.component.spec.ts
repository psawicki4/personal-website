import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { createTranslocoMock } from 'utils';
import { describe, expect, it, vi } from 'vitest';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  const translocoMock = createTranslocoMock();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: TranslocoService, useValue: translocoMock },
      ],
    });

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit navigate event when clicked', () => {
    const emitSpy = vi.spyOn(component.navigate, 'emit');
    component.onClick();
    expect(emitSpy).toHaveBeenCalled();
  });
});
