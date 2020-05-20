import { Directive } from '@angular/core';

@Directive({
  selector: '[matHeaderRowDef]',
  inputs: ['columns: matHeaderRowDef']
})
export class MatHeaderRowDefDirective {

  constructor() { }

}
