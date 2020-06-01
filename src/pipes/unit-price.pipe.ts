import { Pipe, PipeTransform } from '@angular/core';
import {unitPrice} from '../utils/price-utils';

@Pipe({
  name: 'unitPrice'
})
export class UnitPricePipe implements PipeTransform {

  transform(price: number, ...args: unknown[]): string {
    return unitPrice(price);
  }

}
