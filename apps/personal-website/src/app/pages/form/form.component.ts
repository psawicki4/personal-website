import { ENTER } from '@angular/cdk/keycodes';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { FormField, form, hidden, max, maxLength, min, required } from '@angular/forms/signals';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow } from '@angular/material/chips';
import { DateAdapter } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatError, MatFormField, MatHint, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import dayjs from 'dayjs';
import { CardComponent } from 'personal-website-components';
import { take } from 'rxjs';
import { LangService } from 'utils';
import { ageBirthdayValidator } from './age-birthday-validator';
import { CatFormModel, CatOption, PetFormModel } from './form.type';
import { OnlyDigitsDirective } from './only-digits.directive';

const createInitialCat = (): CatFormModel => ({
  name: '',
  age: null,
  birthday: null,
  description: '',
  purebred: false,
  bred: '',
  toys: [],
  beauty: 5,
  malice: 0,
});

const createInitialPetModel = (): PetFormModel => ({
  petType: '',
  cat: createInitialCat(),
});

@Component({
  selector: 'psa-form',
  imports: [
    CardComponent,
    FormField,
    MatRadioGroup,
    MatRadioButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatHint,
    MatError,
    JsonPipe,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatSuffix,
    MatCheckbox,
    MatButton,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger,
    CdkTextareaAutosize,
    OnlyDigitsDirective,
    MatSlider,
    MatSliderThumb,
    MatChipGrid,
    MatChipRow,
    MatIcon,
    MatChipInput,
    MatChipRemove,
    TranslocoDirective,
  ],
  providers: [
    provideLuxonDateAdapter({
      parse: {
        dateInput: 'yyyy-MM-dd',
      },
      display: {
        dateInput: 'yyyy-MM-dd',
        monthYearLabel: 'MMM yyyy',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM-yyyy',
      },
    }),
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  snackBar = inject(MatSnackBar);
  transloco = inject(TranslocoService);
  langService = inject(LangService);
  dateAdapter = inject(DateAdapter);
  dialog = inject(MatDialog);
  maxDate = new Date();
  options: CatOption[] = [
    { namePl: 'Kot Sfinks', nameEN: 'Sphynx Cat', id: 'kot_sfinks' },
    { namePl: 'Kot Syberyjski', nameEN: 'Siberian Cat', id: 'kot_syberyjski' },
    { namePl: 'Kot Norweski Leśny', nameEN: 'Norwegian Forest Cat', id: 'kot_norweski_lesny' },
    { namePl: 'Kot Bengalski', nameEN: 'Bengal Cat', id: 'kot_bengalski' },
    { namePl: 'Kot Syjamski', nameEN: 'Siamese Cat', id: 'kot_syjamski' },
    { namePl: 'Ragdoll', nameEN: 'Ragdoll Cat', id: 'ragdoll' },
    { namePl: 'Kot Rosyjski Niebieski', nameEN: 'Russian Blue Cat', id: 'kot_rosyjski_niebieski' },
    { namePl: 'Kot Perski', nameEN: 'Persian Cat', id: 'kot_perski' },
    { namePl: 'Maine Coon', nameEN: 'Maine Coon Cat', id: 'maine_coon' },
    { namePl: 'Kot Brytyjski', nameEN: 'British Shorthair Cat', id: 'kot_brytyjski' },
    { namePl: 'Inny', nameEN: 'Other', id: 'inny' },
  ];
  filteredOptions: CatOption[] = [];
  separatorKeysCodes = [ENTER];
  bredInput = viewChild<ElementRef>('bred');

  model = signal<PetFormModel>(createInitialPetModel());

  petForm = form(this.model, (f) => {
    required(f.petType);
    hidden(f.cat, { when: () => this.model().petType !== 'cat' });
    required(f.cat.name);
    required(f.cat.age);
    min(f.cat.age, 0);
    max(f.cat.age, 99);
    maxLength(f.cat.description, 200);
    min(f.cat.beauty, 5);
    hidden(f.cat.bred, { when: () => !this.model().cat.purebred });
    required(f.cat.bred);
    ageBirthdayValidator(f.cat);
  });

  toys = computed(() => this.petForm.cat.toys().value() ?? []);

  constructor() {
    this.filteredOptions = this.options.slice();
    this.dateAdapter.getFirstDayOfWeek = () => 1;

    effect(() => {
      this.setLocale(this.langService.lang());
    });

    effect(() => {
      const petType = this.petForm.petType().value();
      if (petType === 'dog') {
        untracked(() => {
          this.dialog.open(DogDialog);
          this.dialog.afterAllClosed.pipe(take(1)).subscribe(() => {
            this.selectCat();
          });
        });
      }
    });

    effect(() => {
      const birthday = this.petForm.cat.birthday().value();
      if (birthday) {
        const calculatedAge = dayjs().diff(birthday, 'year');
        untracked(() => {
          if (this.petForm.cat.age().value() !== calculatedAge) {
            this.petForm.cat.age().value.set(calculatedAge);
          }
        });
      }
      const purebred = this.petForm.cat.purebred().value();
      if (!purebred) {
        untracked(() => {
          this.petForm.cat.bred().value.set('');
        });
      }
    });
  }

  selectCat() {
    this.petForm.petType().value.set('cat');
  }

  filterBred() {
    const filterValue = (this.bredInput()?.nativeElement.value ?? '').toLowerCase();
    this.filteredOptions = this.options.filter(
      (o) => o.namePl.toLocaleLowerCase().includes(filterValue) || o.nameEN.toLocaleLowerCase().includes(filterValue)
    );
  }

  displayFn(id: string): string {
    const catOption = this.options.find((o) => o.id === id);
    if (!catOption) {
      return '';
    }
    return this.langService.lang() === 'pl' ? catOption.namePl : catOption.nameEN;
  }

  removeToy(toy: string) {
    const currentToys = this.petForm.cat.toys().value() ?? [];
    const index = currentToys.indexOf(toy);
    if (index >= 0) {
      const updated = [...currentToys];
      updated.splice(index, 1);
      this.petForm.cat.toys().value.set(updated);
    }
  }

  addToy(event: MatChipInputEvent): void {
    const value = (event.value ?? '').trim();
    if (value) {
      const currentToys = this.petForm.cat.toys().value() ?? [];
      this.petForm.cat.toys().value.set([...currentToys, value]);
    }
    if (event.chipInput) {
      event.chipInput.clear();
    }
  }

  formatSliderLabel(value: number): string {
    switch (value) {
      case 0:
        return '😇';
      case 10:
        return '😈';
      default:
        return `${value}`;
    }
  }

  reset() {
    this.model.set(createInitialPetModel());
    this.petForm().reset();
  }

  check() {
    this.petForm().markAsTouched();
    if (this.petForm().valid()) {
      this.snackBar.open(
        this.transloco.translate('FORM.valid-form', { value: this.petForm.cat.name().value() }),
        this.transloco.translate('FORM.ok'),
        {
          duration: 5000,
          panelClass: 'success-snackbar',
        }
      );
    } else {
      this.snackBar.open(this.transloco.translate('FORM.invalid-form'), this.transloco.translate('FORM.ok'), {
        duration: 5000,
        panelClass: 'error-snackbar',
      });
    }
  }

  private setLocale(lang: string) {
    this.dateAdapter.setLocale(lang);
  }

  get form() {
    return this.petForm;
  }

  get cat() {
    return this.petForm.cat;
  }

  get name() {
    return this.petForm.cat.name;
  }

  get age() {
    return this.petForm.cat.age;
  }

  get beauty() {
    return this.petForm.cat.beauty;
  }

  get descriptionVal() {
    return this.petForm.cat.description().value();
  }
}

@Component({
  selector: 'dog-dialog',
  templateUrl: 'dog-dialog.html',
  imports: [MatDialogModule, MatButton, TranslocoDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DogDialog {}
