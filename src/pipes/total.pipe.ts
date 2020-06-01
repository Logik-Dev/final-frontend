import { Pipe, PipeTransform } from '@angular/core';
import {totalPrice} from '../utils/price-utils';

@Pipe({
  name: 'total'
})
export class TotalPipe implements PipeTransform {

  transform(price: number, duration: number): string {
    return totalPrice(price, duration);
  }

}
