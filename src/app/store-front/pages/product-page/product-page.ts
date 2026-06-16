import { rxResource } from '@angular/core/rxjs-interop';
import { Product } from './../../../products/interfaces/product.interfaces';
import { Component, inject, input } from '@angular/core';
import { ProductsService } from '../../../products/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { ProductCarousel } from "../../../products/components/product-card/product-carousel/product-carousel";

@Component({
  selector: 'app-product-page',
  imports: [ProductCarousel],
  templateUrl: './product-page.html',
})
export class ProductPage {

  productsService= inject(ProductsService);
  route = inject(ActivatedRoute);

  productSlug = this.route.snapshot.params['idSlug']; 
  

  productsResourceBySlug = rxResource({
    params:()=>({
      idSlug: this.productSlug
    }),
    stream: ({params})=>{
      return this.productsService.getProductsByIdSlug(params.idSlug);
    }
  });
 
}
