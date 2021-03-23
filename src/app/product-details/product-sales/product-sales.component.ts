import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductDetails } from 'src/app/shared/product-details.model';
import { ProductService } from 'src/app/shared/product.service';

import { map, pluck } from 'rxjs/operators';

@Component({
  selector: 'app-product-sales',
  templateUrl: './product-sales.component.html',
  styleUrls: ['./product-sales.component.css'],
})
export class ProductSalesComponent implements OnInit {
  sale = [];
  opprotunity = [];
  labels = [];

  constructor(
    private productService: ProductService,
    private router: ActivatedRoute
  ) {}

  public id: number;
  public productDetails: ProductDetails;
  ngOnInit(): void {
    this.router.parent.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.productDetails = this.productService.getProductDetailsById(this.id);

      //fetching coloumn from data
      if (this.productDetails.productSalesAndOpps != null) {
        this.productDetails.productSalesAndOpps.map((d) => {
          this.labels.push(d['Year']);
          this.sale.push(d['Sale']);
          this.opprotunity.push(d['Opportunity']);
        });
      }
    });
  }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };

  public mbarChartLabels: string[] = this.labels;
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105,159,177,0.2)',
      borderColor: 'rgba(105,159,177,1)',
      pointBackgroundColor: 'rgba(105,159,177,1)',
      pointBorderColor: '#fafafa',
      pointHoverBackgroundColor: '#fafafa',
      pointHoverBorderColor: 'rgba(105,159,177)',
    },
    {
      backgroundColor: 'rgba(77,20,96,0.3)',
      borderColor: 'rgba(77,20,96,1)',
      pointBackgroundColor: 'rgba(77,20,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,20,96,1)',
    },
  ];
  public barChartData: any[] = [
    { data: this.sale, label: 'Sales' },
    { data: this.opprotunity, label: 'Opportunity' },
  ];
}
