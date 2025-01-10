import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Produto } from '../../model/produto.model';
import { MatButtonModule } from '@angular/material/button';
import { UpdateProductDialogComponent } from '../../atualizar-produto/update-product-dialog/update-product-dialog.component';


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
    private dialogRef: MatDialogRef<CardDetailsComponent>,
    private dialog: MatDialog) {
    this.produto = data
  }

  fechar(): void {
    this.dialogRef.close();
  }

  onUpdateProduct(): void {
    this.dialog.open(UpdateProductDialogComponent, {
      width: "55%",
      height: "55%",
      data: this.produto
    });
  }
}
