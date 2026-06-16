import { Component, computed, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Product } from '../../interfaces/product.interfaces';
import { SlicePipe } from '@angular/common';
import { ProductImagePipe } from '../../pipes/product-image.pipe';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, SlicePipe, ProductImagePipe],
  templateUrl: './product-card.html',
  standalone: true
})
export class ProductCard {
  product = input.required<Product>();

  imageSignal = computed(() => {
    return `http://localhost:3000/api/files/product/${this.product().images[0]}`
  });


}
