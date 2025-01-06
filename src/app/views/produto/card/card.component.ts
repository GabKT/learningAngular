import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common'; // Adicione isso


@Component({
  selector: 'app-card',
  imports: [
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
    CurrencyPipe
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() id: number = 0.0;
  @Input() img: string = "";
  @Input() nome: string = "";
  @Input() preco: number = 0.0;
  @Input() tamanho: string = "";
  @Input() categoria: string = "";

  selected: boolean = false;

  constructor() { }

}
