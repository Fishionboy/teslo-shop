import { Component, signal } from '@angular/core';
import { ProductCard } from "../../components/product-card/product-card";

@Component({
  selector: 'app-home-page',
  imports: [ProductCard],
  templateUrl: './home-page.html',
})
export class HomePage {
  title = signal('Card Title');
  imageInput = signal('https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp');
  description = signal('A card component has a figure, a body part, and inside body there are title and actions parts')
}
