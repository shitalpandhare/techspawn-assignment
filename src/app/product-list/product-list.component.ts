import { Component, OnInit } from '@angular/core';
import { ProductDetails } from '../shared/product-details.model';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService) {}
  p: Number = 1;
  count: Number = 5;

  productDetails: ProductDetails[] = [];

  searchText: String;
  ngOnInit(): void {
    this.productDetails = this.productService.getAllProducts();
    this.productService.updatedProduct.next(this.productDetails);
    this.productService.updatedProduct.subscribe((res) => {
      this.productDetails = res;
    });
    this.productService.searchProduct.subscribe((res) => {
      this.searchText = res;
      console.log('in list' + this.searchText);
    });
  }
}
