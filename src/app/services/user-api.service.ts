import { Injectable } from '@angular/core';
import { ApiService } from '../core/services/api/api.service';
import { firstValueFrom } from 'rxjs';
import { Product } from '../core/models/product';
import { IReviewRes } from '../core/models/api/ireview.res';
import { IReviewReq } from '../core/models/api/ireview.req';
import { Review } from '../core/models/review';

@Injectable({
  providedIn: 'root',
})
export class UserApiService extends ApiService {

  public async getProducts(): Promise<Product[]> {
    return await firstValueFrom(this.get<Product[]>('/products'));
  }

  public async createReview(productId: number, review: IReviewReq): Promise<IReviewRes> {
    return await firstValueFrom(this.post<IReviewReq, IReviewRes>(`/reviews/${productId}`, review));
  }

  public async getReviews(productId: number): Promise<Review[]> {
    return await firstValueFrom(this.get<Review[]>(`/reviews/${productId}`));
  }

}
