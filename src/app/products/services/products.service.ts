import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Gender, Product, ProductsResponse } from './../interfaces/product.interfaces';
import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { User } from '../../auth/interfaces/user.interface';

interface Options {
    limit?: number;
    offset?: number;
    gender?: string;
}

const emptyProduct:Product = {
    id: 'new',
    title: '',
    price: 0,
    description: '',
    slug: '',
    stock: 0,
    sizes: [],
    gender: Gender.Men,
    tags: [],
    images: [],
    user: {} as User
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
    private http = inject(HttpClient);

    private productsCache = new Map<string, ProductsResponse>();
    private productCache = new Map<string, Product>();

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
            tap((resp) => this.productCache.set(`${idSlug}`,resp))
        )


    } 
    
    getProductsById(id: string): Observable<Product> {

        if(id === 'new'){
            return of(emptyProduct);
        }

        if(this.productBySlug.has(`${id}`)){
            return of(this.productCache.get(`${id}`)!);
        }

        return this.http.get<Product>(
            `http://localhost:3000/api/products/${id}`
        ).pipe(tap((resp) => this.productCache.set(`${id}`,resp))
        )


    }

    updateProduct(id:string, productLike : Partial<Product>): Observable<Product>{
      return  this.http.patch<Product>(`http://localhost:3000/api/products/${id}`,productLike)
        .pipe(
            tap((product)=>this.updateProductCache(product))
        )
    }

    updateProductCache(product: Product){
        const productId = product.id;
        
        this.productCache.set(productId, product);

        this.productsCache.forEach((productResponse) =>{
            productResponse.products = productResponse.products.map((currentProduct) =>{
              return  currentProduct.id === productId ? product : currentProduct;
            })
        })

        console.log('Caché actualizado')

    }

    createProduct(productLike: Partial<Product>):Observable<Product>{
        return this.http.post<Product>(`http://localhost:3000/api/products`,productLike)
        .pipe(
            tap((product) => this.updateProductCache(product))
        );



    }
}