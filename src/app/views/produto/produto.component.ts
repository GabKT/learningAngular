import { Component, QueryList, ViewChildren } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CardComponent } from './card/card.component';
import { ProdutoService } from './produto.service';
import { Produto } from './produto.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CardDetailsComponent } from './card/card-details/card-details.component';
import { FormsModule } from '@angular/forms'
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { max } from 'rxjs';


@Component({
  selector: 'app-produto',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CardComponent,
    CommonModule,
    MatButtonToggleModule,
    MatSliderModule,
    FormsModule,
    CurrencyPipe
  ],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.css'
})
export class ProdutoComponent {

  //content
  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];
  searchTerm: string = '';
  @ViewChildren(CardComponent) cards!: QueryList<CardComponent>;

  //filter

  //size
  selectedSizes: string[] = [];

  //price
  min: number = 0.0;
  max: number = 5000.0;
  step: number = 50.0;
  value: number = 0.0;

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.produtoService.getAllProducts().subscribe({
      next: (data: Produto[]) => {
        this.produtos = data;
        this.produtosFiltrados = this.produtos;
        this.max = (Math.max(...this.produtos.map(produto => produto.preco))) * 1.001;
        this.step = this.max * 0.01
      },
      error: (err) => console.error("erro ao carregar produtos", err)
    });
  }

  deletarProdutos(): void {
    const cardsSelecteds = this.cards.filter(e => e.selected == true).map(e => e.id);
    this.produtoService.deletarRoupas(cardsSelecteds).subscribe({
      next: (deletedIds: number[]) => {
        alert(deletedIds.length + " produtos deletados");
        this.produtos = this.produtos.filter(produto => !deletedIds.includes(produto.id));
        this.produtosFiltrados = this.produtos;
      },
      error: (error) => console.error("Erro ao deletar: ", error)
    });
  }

  onSearch(): void {
    this.produtosFiltrados = this.produtos.filter(produto => produto.nome.toLowerCase().includes(this.searchTerm.toLowerCase()))
  }

  openCardDetails(cardData: Produto): void {
    const dialogRef = this.dialog.open(CardDetailsComponent, {
      width: '1000px',
      height: '550px',
      data: cardData
    });
  }

  onSliderChange(): void {
    if (this.selectedSizes.length != 0) {
      this.produtosFiltrados = this.produtos.filter(e => e.preco < this.value && this.selectedSizes.includes(e.tamanho));
    }
    if (this.selectedSizes.length == 0) {
      this.produtosFiltrados = this.produtos.filter(e => e.preco < this.value);
    }
    if (this.value == 0.0) {
      this.produtosFiltrados = this.produtos
    }
  }

  onBtnToggleChange(event: any): void {
    this.selectedSizes = event.value;
    if (this.value != 0.0) {

      if (this.selectedSizes.length == 0) {
        this.produtosFiltrados = this.produtosFiltrados.filter(e => this.selectedSizes.includes(e.tamanho) && e.preco < this.value)
      } else {
        this.produtosFiltrados = this.produtos.filter(e => this.selectedSizes.includes(e.tamanho) && e.preco < this.value)
      }

    } else {
      this.produtosFiltrados = this.produtos.filter(e => this.selectedSizes.includes(e.tamanho))
    }
  }

  viewCriarProduto() {
    this.router.navigate(["/produto/criar"]);
  }

}
