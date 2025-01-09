import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produto } from '../../model/produto.model';
import { ProdutoService } from '../../service/produto.service';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-update-product-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule],
  templateUrl: './update-product-dialog.component.html',
  styleUrl: './update-product-dialog.component.css'
})
export class UpdateProductDialogComponent {

  produto: Produto;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Produto) {
    this.produto = data
  }
}
