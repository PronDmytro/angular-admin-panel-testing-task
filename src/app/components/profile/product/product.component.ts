import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserApiService } from '../../../services/user-api.service';
import { DataService } from '../../../services/data.service';
import { Product } from '../../../core/models/product';
import { Review } from '../../../core/models/review';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

  public product: Product | undefined;
  public reviews: Review[] | undefined;
  public reviewForm: FormGroup;

  public constructor(
    private readonly fb: FormBuilder,
    private readonly userApiService: UserApiService,
    private readonly dataService: DataService,
    private router: Router,
  ) {
    this.reviewForm = fb.group({
      review: ['', [Validators.required]],
      rating: ['', [Validators.required]],
    });
  }

  public async ngOnInit(): Promise<void> {
    this.product = this.dataService.selectedProduct;
    if (this.product) {
      this.reviews = await this.userApiService.getReviews(this.product.id);
    } else {
      await this.router.navigate(['account/']);
    }
  }

  public async submit(): Promise<void> {
    if (this.reviewForm.value && this.product) {
      const res = await this.userApiService.createReview(this.product!.id, {
        text: this.reviewForm.get('review')!.value,
        rate: Number(this.reviewForm.get('rating')!.value),
      });
      console.log(res);
      this.reviews = await this.userApiService.getReviews(this.product.id);
    }
  }

}
