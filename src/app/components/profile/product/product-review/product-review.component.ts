import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../../../core/models/review';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.scss'],
})
export class ProductReviewComponent implements OnInit {

  @Input()
  public reviewData: Review | undefined;

  public countPositive: any[] = [];
  public countEmpty: any[] = [];

  public constructor() {
  }

  public ngOnInit(): void {
    if (this.reviewData) {
      this.countPositive = Array(this.reviewData.rate).fill(0);
      this.countEmpty = Array(5 - this.reviewData.rate).fill(0);
    }
  }

}
