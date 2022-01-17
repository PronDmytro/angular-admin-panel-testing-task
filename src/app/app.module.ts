import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FrameComponent } from './components/frame/frame.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProductListComponent } from './components/profile/product-list/product-list.component';
import { ProductComponent } from './components/profile/product/product.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpTokenInterceptor } from './core/interceptors/http.token.interceptor';
import { FlexModule } from '@angular/flex-layout';
import { AuthFrameComponent } from './components/auth/auth-frame/auth-frame.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductReviewComponent } from './components/profile/product/product-review/product-review.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalErrorHandler } from './core/error-handler/global-error-handler';
import { FooterComponent } from './components/frame/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    FrameComponent,
    LoginComponent,
    RegisterComponent,
    ProductListComponent,
    ProductComponent,
    AuthFrameComponent,
    ProductReviewComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FlexModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
