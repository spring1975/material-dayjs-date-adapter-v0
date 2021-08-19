import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Strongly type a form group. If the interface changes, the form should change with it.
 */
export type FormConfig<T extends Record<symbol, unknown> = Record<symbol, unknown>> = {
    [K in keyof T]:
        | [
              T[K] | '',
              (ValidatorFn | ValidatorFn[] | ValidationErrors)?,
              (AsyncValidatorFn | AsyncValidatorFn[] | ValidationErrors)?,
              AbstractControlOptions?
          ]
        | AbstractControl;
};
