import { PathKind, SchemaPath, SchemaPathRules, validate, ValidationError } from '@angular/forms/signals';
import dayjs from 'dayjs';
import { CatFormModel } from './form.type';

export function ageBirthdayValidator(catPath: SchemaPath<CatFormModel, SchemaPathRules.Supported, PathKind.Child>) {
  validate(catPath, (ctx): ValidationError | null => {
    const cat = ctx.value();
    if (cat && cat.age != null && cat.birthday) {
      const isAgeValid = dayjs().diff(cat.birthday, 'year') === cat.age;
      return isAgeValid ? null : { kind: 'invalidAge' };
    }
    return null;
  });
}
