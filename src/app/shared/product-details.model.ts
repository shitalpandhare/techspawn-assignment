export class ProductDetails {
  public productId: number;
  public productName: String;
  public productCost: number;
  public productSalePrice: number;
  public productRetailsPrice: number;
  public productInventory: number;
  public productManufacturing: number;
  public productBackordered: Boolean;
  public productPrimaryImage: String;
  public productCatalogImage: String[];
  public productSalesAndOpps?: String[];

  constructor(
    productId: number,
    productName: String,
    productCost: number,
    productSalePrice: number,
    productRetailsPrice: number,
    productInventory: number,
    productManufacturing: number,
    productBackordered: Boolean,
    productPrimaryImage: String,
    productCatalogImage: String[],
    productSalesAndOpps?: String[]
  ) {
    this.productId = productId;
    this.productName = productName;
    this.productCost = productCost;
    this.productSalePrice = productSalePrice;
    this.productRetailsPrice = productRetailsPrice;
    this.productInventory = productInventory;
    this.productManufacturing = productManufacturing;
    this.productBackordered = productBackordered;
    this.productPrimaryImage = productPrimaryImage;
    this.productCatalogImage = productCatalogImage;
    this.productSalesAndOpps = productSalesAndOpps;
  }
}
