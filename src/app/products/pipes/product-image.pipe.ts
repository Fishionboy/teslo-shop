import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'productImage'
})

export class ProductImagePipe implements PipeTransform {
    transform(value: string | string[] | null): string {

        if (value === null) {
            return 'assets/images/no-image.png';
        }

        if (typeof value == 'string') {
            return `http://localhost:3000/api/files/product/${value}`

        }

        const image = value.at(0);

        if (!image) {
            return 'assets/images/no-image.png';
        }

        return `http://localhost:3000/api/files/product/${image}`;

    }
}