import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Product, ProductsResponse } from './../interfaces/product.interfaces';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

interface Options{
    limit?: number;
    offset?: number;
    gender?: string;
}

@Injectable({providedIn: 'root'})
export class ProductsService {
    private http = inject(HttpClient);

    getProducts(options : Options ):Observable<ProductsResponse>{

        const { limit = 9, offset = 10, gender = ''}= options
        return this.http.get<ProductsResponse>(
            'http://localhost:3000/api/products',{
                params:{
                    limit: limit,
                    offset: offset,
                    gender : gender
                }
            }
        ).pipe(
            tap((resp)=> console.log(resp))
        );
    }

    getProductsByIdSlug(idSlug : string):Observable<Product>{
        return this.http.get<Product>(
            `http://localhost:3000/api/products/${idSlug}`
        );
    }
    
}