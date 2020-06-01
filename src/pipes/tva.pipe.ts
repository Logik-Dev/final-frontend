import { Pipe, PipeTransform } from '@angular/core';
import {tva} from '../utils/price-utils';

@Pipe({
  name: 'tva'
})
export class TvaPipe implements PipeTransform {

  transform(price: number, duration: number): string {
    return tva(price, duration);
  }

}
