import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductsService } from '../product.service';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzIconModule,
    CommonModule,
    NzCheckboxModule,
    RouterLink,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  productForm!: FormGroup;
  isEdit = false;
  private productId: string | null = null;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private nzMessage: NzMessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.checkEdit();
  }
  typeOptions = ['furniture', 'equipment', 'stationary', 'part'];

  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      cost: [0, [Validators.required, Validators.min(0)]],
      sku: ['', Validators.required],
      type: [this.typeOptions[0]],
      available: [true],
      backlog: [null],
      profile: this.fb.array([]),
    });
  }

  checkEdit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.isEdit = true;
      this.productService
        .getProductById(Number(this.productId))
        .subscribe((product) => {
          this.productForm.patchValue({
            name: product.name,
            description: product.description,
            cost: product.cost,
            sku: product.sku,
            available: product.profile?.available ?? true,
            backlog: product.profile?.backlog ?? null,
            type: product.profile?.type ?? null,
          });
          // Popula propriedades personalizadas, se existirem
          this.populateCustomProperties(product.profile || {});
        });
      this.productForm.get('sku')?.disable();
    }
  }
  onSubmit(): void {
    // Obter os dados do formulário
    const formData = this.productForm.value;

    // Transformar o array de profile em um objeto
    const transformedProfile = this.profile.value.reduce(
      (acc: any, property: any) => {
        if (property.key && property.key.trim() !== '') {
          acc[property.key] = property.value;
        }
        return acc;
      },
      {}
    );

    const productData = {
      id: this.isEdit ? this.productId : undefined, // Inclui ID apenas na edição
      name: formData.name,
      description: formData.description,
      sku: formData.sku,
      cost: formData.cost,
      backlog: formData.backlog,
      profile: {
        type: formData.type,
        available: formData.available,
        backlog: formData.backlog,
        ...transformedProfile, // Adiciona propriedades dinâmicas ao profile
      },
    };

    if (this.isEdit) {
      this.productService
        .updateProduct(Number(this.productId), productData)
        .subscribe(() => {
          this.nzMessage.success('Product edited successfully');

          this.router.navigate(['/products']);
        });
    } else {
      this.productService.createProduct(productData).subscribe(() => {
        this.nzMessage.success('Product created successfully');

        this.router.navigate(['/products']);
      });
    }
  }

  populateCustomProperties(properties: any): void {
    const profileArray = Object.entries(properties)
      .filter(([key]) => !['type', 'available', 'backlog'].includes(key))
      .map(([key, value]) => ({ key, value }));

    this.profile.clear();
    profileArray.forEach((property) => {
      this.profile.push(
        this.fb.group({
          key: [property.key, Validators.required],
          value: [property.value],
        })
      );
    });
  }

  get profile(): FormArray {
    return this.productForm.get('profile') as FormArray;
  }

  addCustomProperty(): void {
    this.profile.push(
      this.fb.group({
        key: [, Validators.required],
        value: [],
      })
    );
  }

  removeCustomProperty(index: number): void {
    if (index >= 0 && index < this.profile.length) {
      this.profile.removeAt(index); // Remove a propriedade
      this.productForm.markAsDirty(); // Marca o formulário como alterado
      this.productForm.updateValueAndValidity(); // Atualiza a validade e o estado do formulário
      console.log('After removal:', this.profile.value); // Verifica o estado atualizado
    } else {
      console.error('Invalid index for removing custom property:', index);
    }
  }

  reset() {
    this.productForm.reset();
  }
}
