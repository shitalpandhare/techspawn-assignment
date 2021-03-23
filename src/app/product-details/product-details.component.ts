import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductDetails } from '../shared/product-details.model';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  id: number;

  productDetails: ProductDetails;

  constructor(
    private router: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.productService.setPid(this.id);
      this.productDetails = this.productService.getProductDetailsById(this.id);
      this.productService.isSelectProduct.next(true);
    });
  }
}
