import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@jsverse/transloco';
import { createTranslocoMock } from 'utils';
import { Mock, describe, expect, it, vi } from 'vitest';
import { ContactDialogComponent } from '../contact-dialog/contact-dialog.component';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let dialogSpy: { open: Mock };

  const translocoMock = createTranslocoMock();

  beforeEach(() => {
    dialogSpy = { open: vi.fn() };

    TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: MatDialog, useValue: dialogSpy },
        { provide: TranslocoService, useValue: translocoMock },
      ],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit open event when clicked', () => {
    const emitSpy = vi.spyOn(component.open, 'emit');
    component.onClick();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should open contact dialog', () => {
    component.openContactDialog();
    expect(dialogSpy.open).toHaveBeenCalledWith(ContactDialogComponent, { autoFocus: false });
  });
});
