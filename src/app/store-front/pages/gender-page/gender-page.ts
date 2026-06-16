import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { ProductsService } from '../../../products/services/products.service';
import { ProductCard } from "../../../products/components/product-card/product-card";

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard],
  templateUrl: './gender-page.html',
})
export class GenderPage {
  route = inject(ActivatedRoute);
  productService = inject(ProductsService);

  gender = toSignal(
    this.route.params.pipe(
      map(({ gender }) => gender)
    )
  )

  productsByGender = rxResource({
     params: () => {
          console.log('PARAMS');
    console.log('gender:', this.gender());

    return {
      genderParam: this.gender()
    };
  },
    stream: ({params}) =>{
          console.log('STREAM');

      return this.productService.getProducts({gender: params.genderParam});
     
    }    

  });

}
