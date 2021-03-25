import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductDetails } from './product-details.model';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService implements OnInit {
  private id: number;
  public productId: number = 0;

  public arr: string[] = [];
  private _productEndodedImages: String[] = [];
  private prefixEncodeStr: String = 'data:image/jpeg;base64,';

  public searchProduct = new BehaviorSubject<String>(null);
  public updatedProduct = new BehaviorSubject<ProductDetails[]>(null);

  //for enable or desible delete button
  isSelectProduct = new BehaviorSubject<Boolean>(false);

  ngOnInit() {
    this.updatedProduct.subscribe((res) => {
      this.productDetails = res;
    });
  }

  constructor(private http: HttpClient) {
    this.getJSON().subscribe((data) => {
      this.setJsonData(data);
    });
  }

  public getJSON() {
    return this.http.get('assets/products.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public setJsonData(res: any) {
    for (let i = 0; i < res.length; i++) {
      let obj: ProductDetails = {
        productId: res[i].product.Product_ID,
        productName: res[i].product.Product_Name,
        productCost: res[i].product.Product_Cost,
        productSalePrice: res[i].product.Product_Sale_Price,
        productRetailsPrice: res[i].Product_Retail_Price,
        productInventory: res[i].product.Product_Current_Inventory,
        productManufacturing: res[i].product.Product_Manufacturing,
        productBackordered: res[i].product.Product_Backorder,
        productPrimaryImage:
          this.prefixEncodeStr + res[i].product.Product_Primary_Image,
        productCatalogImage: [
          this.prefixEncodeStr + res[i].catalog['Product_Image1'],
          this.prefixEncodeStr + res[i].catalog['Product_Image2'],
          this.prefixEncodeStr + res[i].catalog['Product_Image3'],
          this.prefixEncodeStr + res[i].catalog['Product_Image4'],
        ],
        productSalesAndOpps: res[i].salesAndOpportunities,
      };
      this.setProduct(obj);
    }
  }

  get productEndodedImages(): String[] {
    return this._productEndodedImages;
  }

  set productEndodedImages(obj: String[]) {
    this._productEndodedImages = obj;
  }

  image =
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTERUTEhMVFhUXFxcYGBYXFRgXFRUXFxYWFxcXFxcYHSggGBolGxUVITEhJSktLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGzIlICUtLS0tLS0tMC0tLTUvLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKgBLAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAFBgAEAgMHAQj/xABHEAABAwIEAggCBQcLBAMAAAABAAIRAyEEBRIxBkETIlFhcYGR0aGxBxQjMsEVQlJUk9LwFjREU2JjcpKy4fEzc4KiF0Oj/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAMBAgQFBv/EADIRAAICAQMCAwYFBAMAAAAAAAABAhEDBBIhMVETIkEFFDJhofAVQnGR0VKBseEjJEP/2gAMAwEAAhEDEQA/AOQYTAU3UXPdVAdcBsiZEQA3d0yL2AmZMEKpgKLXVGte7S0m7uweQPyVdRAFvMsM2m/S14dYEwQ4Am8ahZ1ov37DZYV6AAkOm+1uxV1EAEMDgGvpPeagaWzYxO1rc5Nu7v2VbB0WvdDnaRfzPJo5AnaTZaFEAWcwoNZUcxrtQBse23cqyiiAIooogCKKKIAiiiiAIooogDoHC/CWGr0WOqv0EtBLnOMXMGwPLuBRg/R7gz92uwkSSC9wiGh1oJ1WJ2taFykVCNifVe9K7tPqgB9z7hPDUWHQQ8gDrNe4tu6Ivzj5qnl3CuHqM1OxNKm6LNe+L6y0g3kWAdtzCTjUPafVY6j2oAccVwrRZSNQV6T409RryXdfYdkjrSO5K2PpBry0bW+Sr6ioSgDxRRRAEUUUQBFFFEARRRRAEUUUQBFFFEAX8nDekGokNtqIu4N1CYHMxKP59RottSsbyJJbp0tgyZ6xOqRNtoFpVsNiHMMtse3svNlbxGcVniHvLhM3k3vf4lAGms8O0AU9Px1fdHZ2g9u6mY0y196Zp2HV/Fa2seW6gHFrYkwYbO1+S8r13PMvcXGIkmUAH2cCZiT/ADV/nHuto+jzMv1Z3q33X0JhAIBW4v5Ba/d13NPgLufOT+AMxH9Gf6t91gOBMxO2Dq+g919INpzurRaGtlVeGK9SfAj3PmR3A2YjfCVR5D3VGpw9immDRcD5e67txLntyymfEpDxVYlxkro4fZalG5tot7su4iM4fxJ2ouPovRw7ipjoX/BdCwjyCO9M+XZISdTkyXsvDFW5P6E+6x7nIGcGY87YWofIe62DgXMT/RKvoPddtLi0wOSNZXidQg7rHl0CirT4CWkrk+eBwNmP6pV9B7qDgfMf1Sr6D3X0cRGpV6TrFZ/ARTwI9z56HAmYn+h1fQe6yHAGZfqdX0HuvomhVRGkolgSB4InzIeAsy/U6voPda6vBWYN+9hao8h7r6RqVuvC8xODDwS4wPiVZaePcn3ePc+Y/wCTuJmOhdPZZbP5MYrnSI8SB+K73X4eol0gEHtBVDMMgcbsIPcbFbo6DTy/M/oOWjj3ZxI8M4r+qPqPdWG8F48iRhn/AA911Kjh3MeA4Rfmmuk2QEZPZuONVJ/QrLSRXqcAPB+N/V3/AA91dZ9HWZkSMK/1b7rtNfDkGQmfA1JY3wWbPo4QScWRPSxStM+bH/R7mYMfU6nlpP4rB3AWZDfB1fQe6+n1rLZKzLEhSwxPmUcA5l+p1fQe69/+P8z/AFOr6D3X041q14isGjvR4SvgPBV8Hy3V4UxjTDsO8Ecre69bwljT/R3/AA913TOacOLyEHdjurI52XSh7NxyjuTZd6aK9TkzODccRIw7z6e6wfwnjBY0HfD3XUPyu5jSGwSefYqWW06lar1nFV/DY+rZXwF3OcfyaxX9UfULY3hPGHag4+Y9098T5lTwbgH6i5wkNbvHaZNhKHYf6QKLR/0qs/8Aj7pU9Lp4OnP7/Yq8cE6bFg8HY79Xf8Pda6fCeMc7S2g4u7LT80+YX6TsMPv0ax8NH7yqn6RaAqh7aNUAHbq+6qsGl58/3+xGzH/UKGJ4Px1O9TDvb4x7qqMhr/ofEJ4zz6R6VeYpVQO/T+BQKhxRSDrseR/4+6I4NNXM/v8AYb4WCvjCWS4jG4fA1sIMG1wq6uuSJGoAGR+dslr+SmL/AKk+o909ZLxfh69RtHS9hdZuqNJPZINim2k1kbJ0NDhmrjJv9i+PTYprhsP4WppZJ2XlLFBxBabK66gAwDey04bDttA5qqLV3LgxAAul7ibOi1hYw7onxGWta28FJOc1IPbZM08FKVsAWxj3E8yVpGXOB6wRbh/7zj3KZo8hwXUjkZNmFLAxUYDzhPVOnA8AkvJmufiGk7BOjqrdmm/NK1DbpDIyKOKZJlXcop9ZYimiOW0ous+XJUKGua2s24hu6oUhIIRTF7FC8ML+awxMiVmVMEEAosw28lRxBu1WXOhhUS5JZQp1Ghxc4gDvWOJzDUC4WYOZ2Ph2rS3LGvOuqYaLgE7qhmGLFV+lo0sZYDtWzFjjJ/5+X+zTgxp9T2vmeiDuDzWdHNGO/OjxsgGYPNge9U5W9YINHQ8OLQ5hrakAwZV3oNItsNknZbjSx7SSYB+CdndZljZw+ayZ4ODSvgy58dAyv2ovlLwWeCDPpFg0uMjkVcybqyJsbpeaKeMySTqg1MrMhBKmbtLzTBc0w4zEzHy5qxlecNqtsQTt3LkvLHdtFyxSSugq0LTWoA3Q4Z9TEh33haO/wWOBzfX96GmfI+yvB2t66AsWTrRrz3DTTcY2BXOMupEvJqHYmGck3cV5i8u0NMDt7UrnDHVrm8jZdzRxfh2+hLTfBtxWTl7pZZEMmwYpkyZcbTyV+qYaAFpbPIJ3VEbaOXfS0IxrJ/qWf66iAhtNuHaSKWtzHnriqXk63tBaW9UQAN+xHfpXcTjWTv0DP9dRB8JkTquFfXbWaRSaS6ncuYNRgdgkybLz+VPxppKzHJedlynlVL63iWFnUY+mGCTA1Ymi3ebyxz/WUKdhWzirf9P7t9vt2M87EhNWWcH4vEYeiTjA2pUY6rh8M57y57aWzgRZpj7o7Oy8Wcp4QxuIoUq5zAtrVadR9Ck6pVL302FpfNQGGSdJi/Lyo9vb7f8ABDXyAmDy2i6hgXOLWvfVqAgscTWiqwBsgRYWv+kiOWZRSe6lTdQaWVPrWuoAQ6n0b36HBwsAIAuvMJwni61GjUOM+3cx+Iw9Bz6heQC1znsfsx5Iae+BexhecMw6Ez9b6BzS8z0vRFrpcXn80gyTPOSr70l8Pp/H3/cYp1+X74KeQ/zqh/3qf+tq7nUpGbLhmQ/zqh/3qf8Arau6OetXs6VKRo0VUxqxdWG+S15WZIWWLjoTIulqtjqgd0dMxIuURg5cIvVss8W12l4621oQqnlpqNlpDlUzQku7Y5o3w8w9ESt8ILHA1wxqMbK+Ey0saRpMlUszyyoHtLhY7FN+FcRPgrz6TatIiLj4FUlm2vlcCMsK5SFTCYDQJi6M4PABonmVXw7y52k8ijLWIyzkuCiVdSibIlhPuhVjTkws6DjMLPkdxCb4ot4nZCcO6HFXMVVuRLbAEiesAbSWzYTzVWjQdcmw7yBPhKyKaXVlEjOrU6wW7H1tNEnuVNzgXWc0+BVTivFaaMdpAV8TjOSSZKj5gezFud94kqOpTcIO9zp1zAHxRzJwarNWw2PcV2pJQVnT3rb+gLzFtxPYqwamLF5eJsA5CMZSDLRB7JUxmmuCY5CqbXTVwvmAezReWx6Jbw2IAJgA+OwRbIsQG1Z9Y2S863QZXL5kNOLw4ewjnuECx1ZrejLqZe2YfezRbrOH50XsmSyHY5wpNe+xBiAe/kuVLJtxuzHGO50KtfB1H1i6k17KfLdpjnp5tFhZEsswzqUHS4wNjcBYV80ryDRPU8AYPMO75RzKq7qrftG6SPQrnTxxm+Ga6eOFtcfUWczqO1HQNJNyY6oP6UdvevMAzE1Wl9MTTB3EAv0iCQ3y2+aba+DY4EEJbY36hUd0bzFZwgHrBsTsDtv8lDhtg4zflKvI5Usa5+ZXx4JY1xue0EG1vcLXgcJfUR7IvUw+rDPgHVTJAnmAYn5HzQ3A4kvphkGe1dX2TL/r7U+jZlzXZaqYf/haw1eFlSbE2W8McBLh8F0rr1FJnJPpcpxjKffh2H/9KqG8NY+lTwePY94D6lOmKbTMuIc+Y9Qnf6T+FauJq0qtGC5tFrXNJDZAc4ggm09Y79gSQeBMdv0I/a0/3lxMuPKsrkot3f1Mrxz3txVjDlfFdJgweI6VofhKL6XRFpLnEt0jTFiCs8k4sp08LQpDEBlFlOo2tRLXGo9z9yx+7RJmxAv6LQ4Gx39UP2lP95eDgbHTHRCf+5T/AHlaLzL/AM/o/l/BZeIvyfRjRkPE+FZ9WxFSrBw2GfR6HSTUc6AG6SLQe35Iu7HUsNQwVWtX0s+oAdBDiapcxoBA+7yi/wAkj/8Ax3mMT0A/a0/3l7i+EcyfobUaXhjdLA6uxwY3k1su6o7goTzekH+zLxeWP5H+zAGSujE0T2VaZ/8AcLvbaeoSNiuWZPwNiWVG1K4axrHB0a2uc4gyAA2ecbp/wWPc1sdhWjSYpxi21RfTRlBO0NtTGMDOsbJSx+MAqudTMg2XufVvsw0HfdDKNoJFlp08ebNOKNss18bI0xcpxyjD6aQHckzABr67R3roFGITc8qVD59KMqVKxW7CjSTC8p05WuvW0SsjuXAv4uAVhv5y8cpRd1aEGySp0jqj+9EGUpcnZEm+fRGeXMje6ZlVWYy7hcSCLb3tIVgmJWjDYWTJWfJ0or6ihmPTDE6Seu8R0gnrM2/CE44XAubTAdcrRmmHY4AiNdO7e8Ddv4pa43zHEhlKvh3OEWcG3mYiRzFviuXLGk2pD4ulZv4ozOvSaGUyGFxg6Rf135paZUxAeC7U4djiXA9oIKIcM5s/MKnQ1WAPa0uDwYnSRaPP4JhzHLmYcA1bCo8dVty9wvZvPv5XV4PavKWWyXNl/G5K3oW1hTDqemXMBIIkcjO08+UrZk+Ha1ulshrmgwTJaSASJ5wbSilTH6aIZp0kgdU3IHfynuVevXHUqctnRyhbsDytXJ2mUhJ20/7CzmFCsKhaxxAPYhVagWOAcSXH+OaacUQXB0wZsVozWmCxxIEgSCulGfQ0u0+QVhsAOV+/dF8rowDqABnb5IJlzXtdY25opWxLmEWlsX5FXmn0IfYacBUlsFBuNKTjQhh5z4RCr5Vm01ALwVY4mx7SHUWzqA1E/h6FcXXx8OLv1KQg1kSEbKcxLa+ltUtB0gkXbqiLt8bJ5w9N4MvqufPIdVg8hc+ZK5fWfpcT2vHzBlPlDEu0brm6eTaY31o2Z3xWzDzTpjVUi/6LfE9vclV2Y1Kuiq+XVHuAA5AE7AchCBOqF9Wo483O+ZRzJKZhkiIJAWXU5nLj0JwK3Z0HAVwGvBMjoyPQEpZyDHa6hbpgCTPmjWXCGPn9Bw+BJPwQjhrDBz6k2XZ9h14M2+4jVxSkw8C0lGGAaYO0JZbTLaunvRvF40NLWn7xgQF0s0OiRliuLQP4jpxbsa1CcO8FsIzxLdzvIfBL9DDvAgXMp2GX/GrGwmopG8bq1luH1VFo03jmr+RnS4ndXnLyOhkZ3LgJPpaRdL7ac1Dbmj2Z1wW2VDCUtRJScLai2x1vbbBuaMsFUDANgi+Mwxdf0VF1JaI00KqxYzWtqdPIKsKznc7d6JZVQbVeWuG7vIAbo3QySk6qQwtLRE35rPjpIVHIorkpcMYVpeDzHNNeogrDDZc2iLFt+8K3Sph+zhKiU0+fQasifKPaDzZaM4rtax09isClBInZLudPc93RsvzPYPEqsEnKwulYV4cYG0JNputrMzpNdBcEq47F1DTFNhEN3vuqeBpktJO87JjxW236iYwfVnRKj2uaHDYrGvWH3WlLuAxp6HT+iVuwTnOdKz5IbSHGitjKLzi6Te/V3WuT6BEsNhRUpOadpML11M9M+oZswMH+J3+3zV/BU9MBY9TNOcY9l/kbF0hCORPo1NVKWObOlw1eESLg7729Ub4ayt7XHFYpzqjgT0eoky4ncTsNk7MosiXAWFyhGMr63AgQ0WaOwKMOHfL5FG0+iKdWoXEl25W3DgkFvI/NZ1qOoWWqhXLV07uNIpup2BcXgqtSqxjXQ0GT3QieNpaqRYDDtvFbcZSOoVGHxCofWOv8VdScjQpWijgqTmdUzfcndX8VQNSmRFxcFG6eFa4THmF5o02tA2UPMm/mWtXaFLKMK8VQTYNuSdoCrcQ4wBz3MJMzqceZPyHd4JhzXCllF75+9EDnG65/mJLiGjnHqOrPyXC9q59+VRXRD18O5GrHtD+iAsZE+vsmzBVOols4ENLIMkFoN5vYFNNGkWtDYu4T5WB/jwWbEtipleXJsTsWBSqEHYunyP8ABRrLnvLtTjADrAbBv4zZXcfw+Kzpa6HiCBaDF4PottPKy5tFrLAthw5gyTH+/csmWFMvBtcPoMWT0tVMk/nAj1sq+WYPozUB31I1lFJuhrDYzbv7R5hDMwxegvDhBJK6/slyjvgY9TLdJlbE5i2m6TchacjxZxGI6Q7ahA7AEv5pVL5A5ph4Pw2h7G89z6LsTap/oZkEc9H2jvFL2LzRwmnTMHm7n4BGOJMYA9vfPzSwzBuc+WjnvyCmELgrLKPHmN2GJ1EaiXACT3lMGGaaQ623ag+UZa5jjqMkuk+SaMVApqzdUu4zH8VoCVMSXE3RHBGGOKC0BLiTzPwRyiBoh2xKZlpRSNF3ETM44yqtfoa0aQYE81WZxWY6zLrfxfkopHWBLD+d2HsKWw+OSyW0/KzDc4tplyjmLwIbbmimSse4EzYFDRgnCnrIgRIJ5+CMZK7TQEbklXjLii25dDPFPqF17ea3Yas9gLg4271upYUuu5V8QdIjtKZGQRkEcDxC89V95BuhFDMnvNRoMAm/ae6exWKdBrjbkCbeC0YTC6IB3In1TIpeg3G9zo2VKA0bXWpktuEQqCKdxzsqlU2AHNPh8JpVU2WcoqFzocZ1b9ybsEGNAA3S9hsIKbWujrHmr1CvoY+pNwIH+Ig/guXrcsYtvsZppOXAYgOqaR+aZPeT/wAQrTKclCcgdLS7tKNNqLiqTat9WTLjg8zmkRQtuSJKXMDV62hxidjylM+LdrYWDeLeIuk7HAggjkV1dA1LG12YlSko0MAYW7rymxjrEXXuDrdLSB5jftlYVqPMbpvyfUpy0ZfVCARNvklnMGaakhNeFxM2dv8ANDszwMusOYhWxzafJbHkfRmWTVurpNiNvBEQQT7Kh9X0MDh5rcx+3zRNJu0PjK+gO4gYSXtHWmBA5JSzjKjQDXmDzkcjaWnyXQ6NDW7U6IGw8OZSrx1iqYYabd5k848fRefzYYq5N8vobITuoL0FvA9dpifvQO2eXxKacBQLWhzty0E3Bg6iLeiTOHKwlwO2sH4BNoxTWghoAA5en4FMWxYrfUmnKdroVsdjYrNDTcTt4lXMsxkgOH6UjwJlJ2JxH248J+P/ACjOArOZTcd2hwv2SZhc3I23ZsnFJV2HttQlhtpdMtvuNwR6hCeKqpfRZUiHGQe+Iv8AFXmsNUU9LraJ/j+OS0cWVg2lTpxdoM+f/C6Xs1t5U1/c5GoSUfmJWGlzgnbIGxiT3N/BKOXNl4HaR807ZVTio8/2V3ZdGZL4FriV5dVa0b8vMq7T6rGsG/PvWVTDg4hznbMHxKqYvGBkkGXch2LSmqQ3J8P6hXCiXTHJb8ZUGm+wWvASKYJ3iSqWOq6zpHPdVS3SBWkkY0aUkECy3Zk+GgK/g6AAk8kHx7tcntJUqW5jVKkVKmLOk03dZhGxuhLckpH85F30bALVUwN91d4lMmUVNcg/iNv2bWz91qIZThQ2k2ewKtnjeuG8zA+KJPOkADksUerMjVdDZTrQ6CLINnFQB5jYK7VJseRQd1I1Hm+6lPsQhm4RwQdSqVCN7DyQ/CMLnOkz1iB4BO+UZUKeFaz+zfxhKYHR6h/aKvhncmXwy8xqxrTtuFdybAhzpPZZDnDUd0bwlXox3kQFpnJ7aRrk/LRTzVzjUDG7WCp55WcIpN+6y3O55k9+pHqDAHguuRLvIX9ksPJc+TvJsO0+y89r5XNRFY+eQ/kVQtbfn5ooa8GeX/CG4CmQ33Vl0wkLoSwjSr9fVyAt/HgkHjPMqlLEGmww0DUD2zBEppfAEkxEkX5i/ml3jfAOe+lVABDqekmL6m9vM7haPZ83HM4dxWWL28Gvh7jIMJ6Zm4u5nOP7J5+CcsBmdKsJpPB7jZw8iuQuwxCJUKpaBBjwXaeJS5fUzJs6nWwhNwDIWPSkiDZw+KAcLZ1iSxxc7VTbA61zJ2AKcssxQrNcS0WG3NZcilDl9At3YHxlQdEDzHLxW/LqDS0HzHYQpm4pBhIEGYAmyo5Vii0xNhy7uauk5Y+DRB3G0FdGoOAsT8pXPvpALQ4UqYAi7jzLjyJ8PmuiYwDTrHIE+NlybGu6Wq4uNyfxuuTq9q57/SjfooubfIEyt5bq7S729kew9cmZ3MT3wJ/jwQfGYEsdqbccx+KzweMJNrzt/wCywydrg2w8j2syr0S7ECDEN/EpoGKd9XbQa0SZLjH3hMhDMvwJnWYkjtkeCbeG6LOkBcLBLV9ERmSUG33svZeHUaVIHcjmNgSJCo8VPFR1uQj5phzKhqaYMxcJQxzrld7SYIQiqOHlyObZVymjp0nnJ+Cb8pvJ/sj5pdwQFvA/FM2SMhryeUBapvyso+IgLiSo1sxaTPiUs1sQalRjeRI5RzRbP6TnvdVJAptsJ3Jm9kHysa8TTtYH5XToy4GbrG/NK4YzS3c2VTKqJ1S7z7lYx7GlwPYPKVlhBvCauIDIdLLWPxHVICEMECFexMSJ8fQKhhru80uNJFWvQ04svEaR4nsVDFZz1iANreaIZtqIIZZA8TgnatlGTI10KzyNKjfQqF+JBd2z6BHsxoattkCyh41aucfMo9TxAIgrO2k+BbZVxbYpfBUcnw5L7CeaLY5sgAeKu8N5e77wAg2Pgq7qVlU6Q0YauTQ1u7Eg5k4NcZ7SmfijOWUKYaeyY7guU5pmdSrULpseQRie1N9y+IZqGIbYzsihrBz57BPgkPC4j80m55Ju4eGrUKuzWy7vHYrS1HlbaofK2uAlnGYNbTsRqeI8Gb/EgJcoYka2A7k391WznG66jjPcByAEgAeSo4CoenaJ5fiuFOTnLcwvaqR0ahWbFisjXE/BAqFa2/P5Af7qxRxonvkdk9hhMb9CbM+IcaGU4i7rAxYfx+KpUMT9YouaJ6Rp1MB52u30HwVfjOtqYCJkEHntzQPAYotcHtMR8/4Copyx5FOPVFbvhlfE4kuNwN1YweGdUIjnyR7H5eyoG4lgHWMPHIOjeOw/xuqge5rgWWE2Fl6bTy8eCyJmaSadMYcLR0UejG0g+PajWSvI64EDY9hOyBUsTLYO8K5hcY1jIkzPkUZY3GiOCznd26R27+R3VHJjPjsidKuKjZtYjx8/VUq1PosQCPuO280qL42jYOgrj6unDVAeTTC5PXqdcnv29P8AddEzvMWhrmOO7TaNwuemlLjHauNr41JfodbQRai2+5YomVoweHY2o4s07x2x2juvy7lvo4V2kVGgFoPWA+8QLHSrmY4AaW1aZaGxJty38tlh8N0a5ZouS46G2g8TG4TRkFCZI7J+KTaD+wzsnDhvFhkh1pgfijCk51IprU/DuIw0jJI7Uo5rRipp7SmilWa7rMMiULz7A6306gtpeNXeP+V3sfldHn5A9rIfA5QjNGRh3EbmoPRLdfFDpDLoGu5FzE8gjVHiemwaWUiW9pdcntKc1J9EDi30E/EuqOaGOmNTnepWeX0ywl2xAITizNKNUjVSaJ2Jjfs7lpxWUMfOg6T8EyLrqqLxv1BOHqzY87oiwhrd1UfgXUru5cxss/vDdNu0OT4PNep5jk2PVF8pwAa0ud4BUcqwp1OcR2QrGeZgadMhlz2LPN80hcuOCpmWIGsNAFkDxuLAeQLr0Co5heQfFLz8w0kjvS3JXyxDjbCvCTqLmu11WNM2Je0fMogMVRmOlp/52+64KosL1N+gp501wjt+Izem2oPtWEf42+611uMnlwZQqNa1p31N63qdlxRRR7w6qiI5q9DpHEmevrVQ6o9ptFiIj1VYYlgbZ7Z8QkBRMhrZQTVDYatxukNtOuHOnUO2SQnnA5ixuCk1GaqhvLxOlthN5jc+a4yos2TI5x2lY6lx9Dpr8VTmNbLc9QM+XJZZTiGai4vYD/iHJcwUSVGmD1LfodtGMpc6rP8AO3kPHuW2hi6IderT7uuPFcNXqsHvPyO7ZtXovpgipT2v9o3f1SjQxTGuc3W2Af0gkKtUonTppuERq69zcyASDB2vHktVd1PUdDXBvIOeHOFubgwA3nkFVxsj3l3dHZuGs0pAmm+qzS+xl7RFrb98KzhsVRdIL6Wpp/Tbf43XDJHYfUeytmtR6IgMIqW60yLETz8eXPzWjTZ54LSfD9Alqd3VHcPr9Af/AG0/87fdYOzKkbCpT/zt91wZXqWJpBkFnWg3gG8G8k87eEWmVr/EH/T9RO87g3N6dIOBq097jW33WjiTiek2k0NexzjtDgY9Cuf8AZ1h6DGitUDSMbhqlwT9mxlYPdYGwLm+qVcLiKbajjUbqaTYQLjVPPa3NUlrW1wi6zNHVs4zgPABqU7hsQ5tmxN7pd/KIuA9t+8WSHiXNLpaIHpJ5mOU7xyWpYszeWbm/U6EfajjFRUfqdRyviYU+q/S4C0hwnz7fFbMXxKyHdHDdW4c4FviGzYrlSuZc+mNWuOUEt1Wh028dPxS9j7lfxJ/0/U6DluPbpGp7bH9IDwR7BZnTaQekZ39ce64/VfT6SQBpjsMTHZvC04pzSerp2H3QQPid0vwebsb+MPbt2fX/R9BYPO6bXSKtODMgvbfn2rfi89olp+1p3G2tp/FfN6i6UdW0kmrfcw5NVvd1R2XB4mmSC+qzc/nt5HxVvNczohwDH09usQ9sd2xXD1E38QdVQLVUqo7DSzYOsKjAP8AGL/FNORZvSZGqrTM7/aN5+a+dVEiWpk3bI95fY+m83zDDu6orUiIn/qNv433QV+Koiftqf7Rvuvn5ROjrnFVRHvL7He/5SMogNBa7tIe33S07PXOqlxe3rHYuED4rlKiq9Y27oPeHd0d+GfUugNJr6Zc4Rd7QAe3dc8r4rS5wcWyCZ6wPxlIiiXk1G/0Ieov0IooosxnIooogCKKKIAiiiiAIooogCKKKIAL/wAoKsNBDDp0xYj7paRsRN2NWvEZ3Ue1rSGQx2odWb331zIvtsoogDz8t1f7r9hR/cU/LdX+6/YUf3FFEWBPy3V/uv2FH9xT8t1f7r9hR/cUURYE/LdX+6/YUf3FPy1V/uv2FH9xRRFga8zzR9eoatTTqIYDpaAIYxtNsDlZoVTpD3eg9l6ogDzpD3eg9lnSrlrmuES0giw3BkKKIAIVc+qOmWsvE2cNhA2cqmY5g6sQXxIECJ7SeZJ5r1RAFNRRRAEUUUQBFFFEARRRRAEUUUQBFFFEAf/Z';

  public productDetails: ProductDetails[] = [
    {
      productId: 0,
      productName: 'abc',
      productCost: 100,
      productSalePrice: 200,
      productRetailsPrice: 250,
      productInventory: 30,
      productManufacturing: 22,
      productBackordered: true,
      productPrimaryImage: this.image,
      productCatalogImage: [this.image, this.image, this.image],
      productSalesAndOpps: null,
    },
  ];

  setProduct(product: ProductDetails) {
    this.productDetails.push(product);
  }

  getAllProducts() {
    return this.productDetails;
  }

  deleteProduct(id: number) {
    this.productDetails.map((i, j) => {
      if (i.productId == id) {
        this.productDetails.splice(j, 1);
        console.log(this.productDetails);
        this.updatedProduct.next(this.productDetails);
      }
    });
  }

  getProductDetailsById(id: number): ProductDetails {
    let pro: ProductDetails;
    this.productDetails.forEach((product: ProductDetails) => {
      if (product.productId == id) {
        pro = product;
      }
    });
    return pro;
  }

  //for storing actual product id
  getPid() {
    return this.productId;
  }
  setPid(productId: number) {
    this.productId = productId;
  }

  //setAll products for seraching

  setAllProducts(productDetails: ProductDetails[]) {
    this.productDetails = productDetails;
  }
}
