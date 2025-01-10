import { Component, QueryList, ViewChildren } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CardComponent } from './card/card.component';
import { ProdutoService } from './service/produto.service';
import { Produto } from './model/produto.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CardDetailsComponent } from './card/card-details/card-details.component';
import { FormsModule } from '@angular/forms'
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { ProductFilter } from '../../core/filters/product-filter.strategy';
import { SizeFilter } from '../../core/filters/size-filter.strategy';
import { PriceFilter } from '../../core/filters/price-filter.strategy';
import { SearchFilter } from '../../core/filters/search-filter.strategy';


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
        this.max = (Math.max(...this.produtos.map(produto => produto.preco))) * 1.01;
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

  openCardDetails(cardData: Produto): void {
    const dialogRef = this.dialog.open(CardDetailsComponent, {
      // width: '1000px',
      // height: '550px',
      width: '60%',
      height: '60%',
      data: cardData
    });
  }

  onSearch(): void {
    const productFilter = new ProductFilter();
    productFilter.addStrategy(new SearchFilter(this.searchTerm));
    productFilter.addStrategy(new SizeFilter(this.selectedSizes));
    productFilter.addStrategy(new PriceFilter(this.value));

    this.produtosFiltrados = productFilter.applyFilters(this.produtos);
  }

  onSliderChange(): void {
    const productFilter = new ProductFilter();
    productFilter.addStrategy(new PriceFilter(this.value));
    productFilter.addStrategy(new SizeFilter(this.selectedSizes));
    productFilter.addStrategy(new SearchFilter(this.searchTerm));

    this.produtosFiltrados = productFilter.applyFilters(this.produtos);
  }

  onBtnToggleChange(event: any): void {
    this.selectedSizes = event.value;
    const productFilter = new ProductFilter();
    productFilter.addStrategy(new SizeFilter(this.selectedSizes));
    productFilter.addStrategy(new PriceFilter(this.value));
    productFilter.addStrategy(new SearchFilter(this.searchTerm));

    this.produtosFiltrados = productFilter.applyFilters(this.produtos);
  }

  onUnmark(): void {
    this.cards.map(card => card.selected = false);
  }

  viewCriarProduto() {
    this.router.navigate(["/produto/criar"]);
  }

}
