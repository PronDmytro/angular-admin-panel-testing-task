import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { IsNotLoggedInGuard } from './core/guards/is-not-logged-in.guard';
import { RegisterComponent } from './components/auth/register/register.component';
import { FrameComponent } from './components/frame/frame.component';
import { IsLoggedInGuard } from './core/guards/is-logged-in.guard';
import { ProductListComponent } from './components/profile/product-list/product-list.component';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [IsNotLoggedInGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: '',
    component: FrameComponent,
    canActivate: [IsLoggedInGuard],
    children: [
      { path: '', redirectTo: 'account', pathMatch: 'full' },
      {
        path: 'account',
        children: [
          { path: '', redirectTo: 'product-list', pathMatch: 'full' },
          { path: 'product-list', component: ProductListComponent },
        ],
      },
      { path: '**', redirectTo: 'account', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
