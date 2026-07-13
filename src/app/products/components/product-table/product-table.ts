import { Component, input } from '@angular/core';
import { Product } from '../../interfaces/product.interfaces';

@Component({
  selector: 'product-table',
  imports: [],
  templateUrl: './product-table.html',
})
export class ProductTable {
  products = input.required<Product[]>()

}
