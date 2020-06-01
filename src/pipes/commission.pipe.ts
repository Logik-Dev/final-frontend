import { Pipe, PipeTransform } from '@angular/core';
import {com} from '../utils/price-utils';

@Pipe({
  name: 'commission'
})
export class CommissionPipe implements PipeTransform {

  transform(price: number, duration: number): string {
    return com(price, duration);
  }

}
