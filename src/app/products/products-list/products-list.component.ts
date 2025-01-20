import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ProductsService } from '../product.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    NzTableModule,
    CommonModule,
    NzDropDownModule,
    NzButtonModule,
    NzIconModule,
    RouterLink,
  ],
  templateUrl: './products-list.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent {
  products: any[] = [];
  constructor(
    private productService: ProductsService,
    private router: Router,
    private modal: NzModalService,
    private nzMessage: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  deleteProduct(productId: number): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this product?',
      nzOnOk: () => {
        this.productService.deleteProduct(productId).subscribe(() => {
          this.loadProducts();
          this.nzMessage.success('Product deleted successfully');
        });
      },
    });
  }

  editProduct(productId: number): void {
    this.router.navigate([`/products/edit/${productId}`]);
  }

  // createProduct(): void {
  //   this.router.navigate(['/products/create']);
  // }

  detailProduct(productId: number): void {
    this.router.navigate([`/products/${productId}`]);
  }
}
