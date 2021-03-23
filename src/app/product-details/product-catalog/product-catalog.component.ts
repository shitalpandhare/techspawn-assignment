import { Component, Input, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Params,
  RouterStateSnapshot,
} from '@angular/router';
import { ProductDetails } from 'src/app/shared/product-details.model';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css'],
})
export class ProductCatalogComponent implements OnInit {
  // @Input() productDetails: String[] = [];

  productDetails: ProductDetails;
  id: number;

  constructor(
    private router: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.router.parent.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.productDetails = this.productService.getProductDetailsById(this.id);
      console.log('id' + this.productDetails.productId);
    });
  }
}
