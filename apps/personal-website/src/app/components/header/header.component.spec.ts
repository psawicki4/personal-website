import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@jsverse/transloco';
import { of } from 'rxjs';
import { Mock, describe, expect, it, vi } from 'vitest';
import { HeaderComponent } from './header.component';
import { ContactDialogComponent } from '../contact-dialog/contact-dialog.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let dialogSpy: { open: Mock };

  const translocoMock = {
    translate: (key: string) => key,
    selectTranslate: () => of((k: string) => k),
    getActiveLang: () => 'pl',
    setActiveLang: vi.fn(),
    config: { defaultLang: 'pl', reRenderOnLangChange: true },
    langChanges$: of('pl'),
    _loadDependencies: () => of(null),
  };

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
