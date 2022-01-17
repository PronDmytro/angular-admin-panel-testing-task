import { Injectable } from '@angular/core';
import { Product } from '../core/models/product';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  public username: string = '';

  public selectedProduct: Product | undefined;

}
