import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductsService } from './products.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html'
})

export class ProductsComponent implements OnInit, OnDestroy {
    productName = 'A book';
    isDisabled = true;
    products = [];
    private productsSubscription: Subscription;

    constructor(private productService: ProductsService) {
        setTimeout(() => {
            // this.productName = 'A Tree';
            this.isDisabled = false;
        }, 3000)
    }

    ngOnInit() {
        this.products = this.productService.getProducts();
        this.productsSubscription = this.productService.productsUpdated.subscribe(() => {
            this.products = this.productService.getProducts();
        });
    }

    onAddProduct(form) {
        console.log(form);
        if(form.valid) {
            // this.products.push(form.value.productName);
            this.productService.addProduct(form.value.productName);
        }
    }

    onRemoveProduct(productName: string) {
        this.products = this.products.filter(p => p !== productName);
    }

    ngOnDestroy() {
        this.productsSubscription.unsubscribe();
    }

}