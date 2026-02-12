import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@jsverse/transloco';
import { Subject, of } from 'rxjs';
import { LangService } from 'utils';
import { Mock, describe, expect, it, vi } from 'vitest';
import { DogDialog, FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let dialogSpy: { open: Mock; afterAllClosed: Subject<void> };
  let snackBarSpy: { open: Mock };

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
    dialogSpy = {
      open: vi.fn(),
      afterAllClosed: new Subject<void>(),
    };
    snackBarSpy = { open: vi.fn() };

    TestBed.configureTestingModule({
      imports: [FormComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: MatDialog, useValue: dialogSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: TranslocoService, useValue: translocoMock },
        LangService,
      ],
    });

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should open dog dialog when dog is selected', () => {
    component.form.controls.petType.setValue('dog');
    expect(dialogSpy.open).toHaveBeenCalledWith(DogDialog);
  });

  it('should add cat form when cat is selected', () => {
    component.form.controls.petType.setValue('cat');
    expect(component.form.contains('cat')).toBe(true);
  });

  it('should remove cat form when switched away from cat', () => {
    component.form.controls.petType.setValue('cat');
    expect(component.form.contains('cat')).toBe(true);

    component.form.controls.petType.setValue('dog');
    fixture.detectChanges();
    expect(component.form.contains('cat')).toBe(false);
  });

  it('should add bred control when purebred is checked', () => {
    component.selectCat();
    // purebred is inside the 'cat' group
    const catGroup = component.form.get('cat');
    catGroup?.get('purebred')?.setValue(true);

    expect(catGroup?.get('bred')).toBeTruthy();
  });

  it('should remove bred control when purebred is unchecked', () => {
    component.selectCat();
    const catGroup = component.form.get('cat');
    catGroup?.get('purebred')?.setValue(true);
    catGroup?.get('purebred')?.setValue(false);

    expect(catGroup?.get('bred')).toBeFalsy();
  });

  it('should add and remove toys', () => {
    component.selectCat();

    // Add toy
    component.addToy({ value: 'Mouse', chipInput: { clear: vi.fn() } } as unknown as MatChipInputEvent);
    expect(component.toys()).toContain('Mouse');

    // Remove toy
    component.removeToy('Mouse');
    expect(component.toys()).not.toContain('Mouse');
  });
});
