import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NzFormModule, CommonModule, ReactiveFormsModule, NzCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = this.fb.group({
    token: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const token = this.loginForm.value.token!;
      localStorage.setItem('authToken', token); // Salva o token no localStorage
      this.message.success('Login successful!');
      this.router.navigate(['/products']); // Redireciona para a lista de produtos
    } else {
      this.message.error('Please enter a valid token');
    }
  }
}
