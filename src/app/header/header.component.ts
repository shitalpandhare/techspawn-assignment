import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductDetails } from '../shared/product-details.model';
import { ProductService } from '../shared/product.service';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { faColumns } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ExcelService } from '../shared/excel.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  fileexport = faFileExport;
  filter = faFilter;
  columns = faColumns;
  search = faSearch;

  public productId: number;
  public productName: String;
  public productCost: number;
  public productSalePrice: number;
  public productRetailsPrice: number;
  public productInventory: number;
  public productManufacturing: number;
  public productBackordered: Boolean;
  public productPrimaryImage: String = 'data:image/jpeg;base64,';
  public productCatalogImage: String[] = [];
  public productCatImg: String[] = [];
  public productSalesAndOpps: String[] = [];
  myFiles: string[] = [];

  public productDetails: ProductDetails[] = [];

  constructor(
    private productService: ProductService,
    private router: ActivatedRoute,
    private route: Router,
    private excelService: ExcelService
  ) {}

  @ViewChild('f') form: NgForm;
  @ViewChild('closebutton') closebutton;

  public id: number;
  searchProduct: String = '';

  isSelectProduct: Boolean = false;

  ngOnInit(): void {
    this.productService.isSelectProduct.subscribe((res) => {
      this.isSelectProduct = res;
    });
  }

  onSubmit() {
    console.log('sub' + this.productService.getPid());
    this.productId = this.productService.productDetails.length + 1;

    let obj: ProductDetails = {
      productId: this.productId,
      productName: this.form.value.productName,
      productCost: this.form.value.productCost,
      productSalePrice: this.form.value.productSalePrice,
      productRetailsPrice: this.form.value.productRetailsPrice,
      productInventory: this.form.value.productInventory,
      productManufacturing: this.form.value.productManufacturing,
      productBackordered: this.form.value.productBackordered,
      productPrimaryImage: this.productPrimaryImage,
      productCatalogImage: this.productCatImg,
      productSalesAndOpps: null,
    };

    this.productService.setProduct(obj);
    this.productService.setPid(this.productId);
    this.closebutton.nativeElement.click();
    this.form.reset();
  }

  onDelete() {
    this.id = this.productService.getPid();
    console.log(this.id);
    this.productService.deleteProduct(this.id);
    this.productService.isSelectProduct.next(false);
    this.route.navigate(['../']);
    this.searchProduct = '';
  }

  //for conversion image to base64

  onProductPrimaryImage(evt) {
    this.productPrimaryImage = 'data:image/jpeg;base64,';
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.productPrimaryImage += btoa(binaryString);
  }

  onProductCatalogImage(event) {
    this.productCatImg = [];
    var files = event.target.files;
    for (let i = 0; i < event.target.files.length; i++) {
      var file = files[i];
      if (files && file) {
        var reader = new FileReader();
        reader.onload = this._handleReaderLoadedd.bind(this);
        reader.readAsBinaryString(file);
      }
    }
  }
  _handleReaderLoadedd(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.productCatImg.push('data:image/jpeg;base64,' + btoa(binaryString));
  }

  //exporting file

  exportAsXLSX(): void {
    this.productDetails = this.productService.getAllProducts();
    console.log(this.productDetails);
    this.excelService.exportAsExcelFile(this.productDetails, 'product_data');
  }

  //searching a product

  searchProducts() {
    this.productService.searchProduct.next(this.searchProduct);
    console.log(this.searchProduct);
    console.log('here');
    this.route.navigate(['../']);
  }
}
