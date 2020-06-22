import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'translate'})
export class TranslatePipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'sick':
        return 'Ziek';
      case 'leave':
        return 'Afwezig';
      case 'available':
        return 'Present';
      default:
        return value;
    }
  }
}
