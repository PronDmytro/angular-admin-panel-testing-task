import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/models/product';
import { UserApiService } from '../../../services/user-api.service';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

  public isLoading = true;
  public productList: Product[] | undefined;

  public constructor(
    private readonly userApiService: UserApiService,
    private router: Router,
    private readonly dataService: DataService,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.productList = await this.userApiService.getProducts();
    this.isLoading = false;
  }

  public async openProduct(product: Product) {
    this.dataService.selectedProduct = product;
    await this.router.navigate(['account/product']);
  }

}
