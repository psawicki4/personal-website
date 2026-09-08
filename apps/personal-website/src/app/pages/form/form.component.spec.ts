import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@jsverse/transloco';
import dayjs from 'dayjs';
import { Subject } from 'rxjs';
import { LangService, createTranslocoMock } from 'utils';
import { Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import { DogDialog, FormComponent } from './form.component';

describe('FormComponent (Signal Forms)', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let dialogSpy: { open: Mock; afterAllClosed: Subject<void> };
  let snackBarSpy: { open: Mock };

  const translocoMock = createTranslocoMock();

  const langServiceMock = {
    lang: signal('pl'),
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
        { provide: LangService, useValue: langServiceMock },
      ],
    });

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initially have cat form hidden', () => {
    expect(component.petForm.cat().hidden()).toBe(true);
  });

  it('should open dog dialog when dog is selected and return to cat after dialog closes', () => {
    component.petForm.petType().value.set('dog');
    fixture.detectChanges();

    expect(dialogSpy.open).toHaveBeenCalledWith(DogDialog);

    dialogSpy.afterAllClosed.next();
    fixture.detectChanges();

    expect(component.petForm.petType().value()).toBe('cat');
  });

  it('should show cat form when cat is selected', () => {
    component.selectCat();
    fixture.detectChanges();

    expect(component.petForm.cat().hidden()).toBe(false);
  });

  it('should hide cat form when switched away from cat', () => {
    component.selectCat();
    fixture.detectChanges();
    expect(component.petForm.cat().hidden()).toBe(false);

    component.petForm.petType().value.set('');
    fixture.detectChanges();
    expect(component.petForm.cat().hidden()).toBe(true);
  });

  it('should toggle bred visibility when purebred checkbox changes', () => {
    component.selectCat();
    fixture.detectChanges();

    // By default purebred is false, bred should be hidden
    expect(component.petForm.cat.bred().hidden()).toBe(true);

    // Set purebred to true
    component.petForm.cat.purebred().value.set(true);
    fixture.detectChanges();
    expect(component.petForm.cat.bred().hidden()).toBe(false);

    // Set purebred to false
    component.petForm.cat.purebred().value.set(false);
    fixture.detectChanges();
    expect(component.petForm.cat.bred().hidden()).toBe(true);
  });

  it('should add and remove toys directly in model', () => {
    component.selectCat();

    // Add first toy
    component.addToy({ value: 'Mouse', chipInput: { clear: vi.fn() } } as unknown as MatChipInputEvent);
    expect(component.toys()).toContain('Mouse');
    expect(component.petForm.cat.toys().value()).toContain('Mouse');

    // Add second toy
    component.addToy({ value: 'Ball', chipInput: { clear: vi.fn() } } as unknown as MatChipInputEvent);
    expect(component.toys()).toEqual(['Mouse', 'Ball']);

    // Remove first toy
    component.removeToy('Mouse');
    expect(component.toys()).toEqual(['Ball']);
    expect(component.toys()).not.toContain('Mouse');
  });

  it('should auto-calculate age when birthday is updated', () => {
    component.selectCat();
    const threeYearsAgo = dayjs().subtract(3, 'year').toDate();

    component.petForm.cat.birthday().value.set(threeYearsAgo);
    fixture.detectChanges();

    expect(component.petForm.cat.age().value()).toBe(3);
  });

  it('should validate age and birthday match via ageBirthdayValidator', () => {
    component.selectCat();
    const fourYearsAgo = dayjs().subtract(4, 'year').toDate();

    // Correct matching age
    component.petForm.cat.birthday().value.set(fourYearsAgo);
    component.petForm.cat.age().value.set(4);
    fixture.detectChanges();
    expect(component.petForm.cat().getError('invalidAge')).toBeUndefined();

    // Mismatched age
    component.petForm.cat.age().value.set(10);
    fixture.detectChanges();
    expect(component.petForm.cat().getError('invalidAge')).toBeTruthy();
  });

  it('should validate min and max limits for age and beauty', () => {
    component.selectCat();

    // Age invalid (> 99)
    component.petForm.cat.age().value.set(150);
    fixture.detectChanges();
    expect(component.petForm.cat.age().getError('max')).toBeTruthy();

    // Age valid
    component.petForm.cat.age().value.set(5);
    fixture.detectChanges();
    expect(component.petForm.cat.age().getError('max')).toBeUndefined();

    // Beauty invalid (< 5)
    component.petForm.cat.beauty().value.set(2);
    fixture.detectChanges();
    expect(component.petForm.cat.beauty().getError('min')).toBeTruthy();

    // Beauty valid (>= 5)
    component.petForm.cat.beauty().value.set(7);
    fixture.detectChanges();
    expect(component.petForm.cat.beauty().getError('min')).toBeUndefined();
  });

  it('should reset form and model to initial values', () => {
    component.selectCat();
    component.petForm.cat.name().value.set('Filemon');
    component.addToy({ value: 'Feather', chipInput: { clear: vi.fn() } } as unknown as MatChipInputEvent);
    fixture.detectChanges();

    component.reset();
    fixture.detectChanges();

    expect(component.petForm.petType().value()).toBe('');
    expect(component.petForm.cat().hidden()).toBe(true);
    expect(component.petForm.cat.name().value()).toBe('');
    expect(component.toys()).toEqual([]);
  });

  it('should show error snackbar when checking an invalid form', () => {
    component.selectCat();
    fixture.detectChanges();

    component.check();
    expect(snackBarSpy.open).toHaveBeenCalledWith(
      translocoMock.translate('FORM.invalid-form'),
      translocoMock.translate('FORM.ok'),
      expect.objectContaining({ panelClass: 'error-snackbar' })
    );
  });

  it('should show success snackbar when checking a fully valid form', () => {
    component.selectCat();
    component.petForm.cat.name().value.set('Mruczek');
    component.petForm.cat.age().value.set(3);
    component.petForm.cat.beauty().value.set(8);
    component.petForm.cat.purebred().value.set(false);
    fixture.detectChanges();

    component.check();
    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'FORM.valid-form',
      'FORM.ok',
      expect.objectContaining({ panelClass: 'success-snackbar' })
    );
  });
});
