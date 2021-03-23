import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCatalogComponent } from './product-details/product-catalog/product-catalog.component';
import { ProductSalesComponent } from './product-details/product-sales/product-sales.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
    children: [
      {
        path: '',
        redirectTo: 'catalog',
        pathMatch: 'full',
      },
      { path: 'catalog', component: ProductCatalogComponent },
      { path: 'sales', component: ProductSalesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
