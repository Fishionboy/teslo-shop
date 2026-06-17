import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Product, ProductsResponse } from './../interfaces/product.interfaces';
import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

interface Options {
    limit?: number;
    offset?: number;
    gender?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
    private http = inject(HttpClient);

    private productsCache = new Map<string, ProductsResponse>();

    private productBySlug = new Map<string, Product>();

    getProducts(options: Options): Observable<ProductsResponse> {

        const { limit = 9, offset = 10, gender = '' } = options;

        const key = `${limit}-${offset}-${gender}`;
        if (this.productsCache.has(key)) {
            return of(this.productsCache.get(key)!)
        }

        return this.http.get<ProductsResponse>(
            'http://localhost:3000/api/products', {
            params: {
                limit: limit,
                offset: offset,
                gender: gender
            }
        }
        ).pipe(
            tap((resp) => console.log(resp)),
            tap((resp) => this.productsCache.set(key,resp))
        );
    }

    getProductsByIdSlug(idSlug: string): Observable<Product> {

        if(this.productBySlug.has(`${idSlug}`)){
            return of(this.productBySlug.get(`${idSlug}`)!);
        }

        return this.http.get<Product>(
            `http://localhost:3000/api/products/${idSlug}`
        ).pipe(
            tap(console.log),
            tap((resp) => this.productBySlug.set(`${idSlug}`,resp))
        )


    }

}