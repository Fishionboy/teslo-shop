import { Component, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-product-card',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './product-card.html',
})
export class ProductCard {
  imageCard= input.required<string>();
  titleCard = input.required<string>();
  descriptionCard = input.required<string>();

}
