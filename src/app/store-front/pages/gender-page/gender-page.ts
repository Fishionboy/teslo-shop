import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { ProductsService } from '../../../products/services/products.service';
import { ProductCard } from "../../../products/components/product-card/product-card";
import { PaginationService } from '../../../shared/components/pagination/pagination.service';
import { Pagination } from "../../../shared/components/pagination/pagination";

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard, Pagination],
  templateUrl: './gender-page.html',
})
export class GenderPage {
  route = inject(ActivatedRoute);
  productService = inject(ProductsService);
    paginationService = inject(PaginationService);

  gender = toSignal(
    this.route.params.pipe(
      map(({ gender }) => gender)
    )
  )

  productsByGender = rxResource({
     params: () =>( {     
      page: this.paginationService.currentPage() - 1,
      genderParam: this.gender()   
  }),
    stream: ({params}) =>{
      return this.productService.getProducts({gender: params.genderParam, offset: params.page * 9});
     
    }    

  });

}
