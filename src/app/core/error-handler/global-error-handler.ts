import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Inject, Injectable, Injector, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    @Inject(Injector) private readonly injector: Injector,
    private readonly zone: NgZone,
  ) {
  }

  public async handleError(error: any) {
    // Check if it's an error from an HTTP response, wrapped to promise error.
    if (!(error instanceof HttpErrorResponse) && error.rejection) {
      error = error.rejection; // get the error object
    }
    await this.zone.run(async () => {
      if (!environment.production) {
        console.error(error);
      }
      this.toastrService.error('Please try again or later!', 'Something went wrong', {
        timeOut: 3000,
      });
    });
  }

  // Need to get ToastrService from injector rather than constructor injection to avoid cyclic dependency error
  private get toastrService(): ToastrService {
    return this.injector.get(ToastrService);
  }

}
