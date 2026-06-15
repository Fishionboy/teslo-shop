import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Product, ProductsResponse } from './../interfaces/product.interfaces';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProductsService {
    private http = inject(HttpClient);

    getProducts():Observable<ProductsResponse>{
        return this.http.get<ProductsResponse>(
            'http://localhost:3000/api/products'
        ).pipe(
            tap((resp)=> console.log(resp))
        );
    }
    
}