/* eslint-disable @angular-eslint/directive-class-suffix */
/* eslint-disable @angular-eslint/no-lifecycle-call */

import { Directive, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';

@Directive()
export abstract class SelfDestruct implements OnDestroy {
    private readonly destroyed = new Subject<void>();
    protected readonly destroyed$ = this.destroyed.asObservable();

    constructor() {
      const thisOnDestroy = this.ngOnDestroy.bind(this);

      this.ngOnDestroy = () => {
        thisOnDestroy();
        this.destroyed.next();
        this.destroyed.complete();
      };
    }

    ngOnDestroy() {
      // ignore
    }
  }
