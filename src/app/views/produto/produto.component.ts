import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CardComponent } from './card/card.component';
import { ProdutoService } from './produto.service';
import { Produto } from './produto.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-produto',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CardComponent,
    CommonModule
  ],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.css'
})
export class ProdutoComponent {

  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService, private router: Router) { }

  ngOnInit() {
    this.produtoService.getAllProducts().subscribe({
      next: (data: Produto[]) => this.produtos = data,
      error: (err) => console.error("erro ao carregar produtos", err)
    });
  }

  viewCriarProduto() {
    this.router.navigate(["/produto/criar"]);
  }
}
