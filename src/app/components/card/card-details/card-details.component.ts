import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Produto } from '../../../views/produto/model/produto.model';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-card-details',
  imports: [
    MatButtonModule
  ],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.css'
})
export class CardDetailsComponent {
  produto: Produto

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Produto,
    private dialogRef: MatDialogRef<CardDetailsComponent>) {
    this.produto = data
  }

  fechar(): void {
    this.dialogRef.close();
  }
}
