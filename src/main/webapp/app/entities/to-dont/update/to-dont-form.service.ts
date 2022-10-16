import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IToDont, NewToDont } from '../to-dont.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IToDont for edit and NewToDontFormGroupInput for create.
 */
type ToDontFormGroupInput = IToDont | PartialWithRequiredKeyOf<NewToDont>;

type ToDontFormDefaults = Pick<NewToDont, 'id'>;

type ToDontFormGroupContent = {
  id: FormControl<IToDont['id'] | NewToDont['id']>;
  title: FormControl<IToDont['title']>;
  description: FormControl<IToDont['description']>;
  group: FormControl<IToDont['group']>;
};

export type ToDontFormGroup = FormGroup<ToDontFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ToDontFormService {
  createToDontFormGroup(toDont: ToDontFormGroupInput = { id: null }): ToDontFormGroup {
    const toDontRawValue = {
      ...this.getFormDefaults(),
      ...toDont,
    };
    return new FormGroup<ToDontFormGroupContent>({
      id: new FormControl(
        { value: toDontRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      title: new FormControl(toDontRawValue.title),
      description: new FormControl(toDontRawValue.description),
      group: new FormControl(toDontRawValue.group),
    });
  }

  getToDont(form: ToDontFormGroup): IToDont | NewToDont {
    return form.getRawValue() as IToDont | NewToDont;
  }

  resetForm(form: ToDontFormGroup, toDont: ToDontFormGroupInput): void {
    const toDontRawValue = { ...this.getFormDefaults(), ...toDont };
    form.reset(
      {
        ...toDontRawValue,
        id: { value: toDontRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ToDontFormDefaults {
    return {
      id: null,
    };
  }
}
