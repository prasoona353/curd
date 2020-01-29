import { Injectable, QueryList, ContentChildren, ContentChild, ViewChildren } from '@angular/core';
// import { NgSelectComponent } from '@ng-select/ng-select';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
//   @ViewChildren(NgSelectComponent) selects: QueryList<NgSelectComponent>;

  constructor() { }

  /**
  * Validates form
  * @param profileForm
  */
  validateForm(form): boolean {
    (<any>Object).values(form.controls).forEach(element => {
      element.markAsTouched();
      if (element.controls) {
        this.validateForm(element);
      }
    });
    return form.status !== 'VALID' ? true : false;
  }
 
}
