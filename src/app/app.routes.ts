import { Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsListComponent },
  { path: 'products/create', component: ProductFormComponent },
  { path: 'products/edit/:id', component: ProductFormComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
