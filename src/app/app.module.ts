import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FrameComponent } from './components/frame/frame.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProductListComponent } from './components/profile/product-list/product-list.component';
import { ProductComponent } from './components/profile/product/product.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpTokenInterceptor } from './core/interceptors/http.token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    FrameComponent,
    LoginComponent,
    RegisterComponent,
    ProductListComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
