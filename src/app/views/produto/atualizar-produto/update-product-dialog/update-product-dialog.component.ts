import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produto } from '../../model/produto.model';
import { ProdutoService } from '../../service/produto.service';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-product-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule],
  templateUrl: './update-product-dialog.component.html',
  styleUrl: './update-product-dialog.component.css'
})
export class UpdateProductDialogComponent {

  produto: Produto;
  tamanhos: string[] = [
    "PP", "P", "M", "G", "GG"
  ];
  categorias: string[] = [
    "Calças",
    "Camisetas",
    "Vestidos",
    "Jaquetas",
    "Saias",
    "Shorts",
    "Blusas",
    "Casacos",
    "Macacões",
    "Conjuntos",
    "Roupas Íntimas",
    "Roupas de Banho",
    "Roupas de Academia",
    "Acessórios",
    "Calçados"
  ];

  updateForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Produto,
    private dialogRef: MatDialogRef<UpdateProductDialogComponent>,
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService) {
    this.produto = data
    this.updateForm = this.formBuilder.group({
      id: [this.produto.id],
      nome: [this.produto.nome, Validators.required],
      categoria: [this.produto.categoria, Validators.required],
      preco: [this.produto.preco, Validators.required],
      tamanho: [this.produto.tamanho, Validators.required],
      imagem: [this.produto.imagem, Validators.required]
    })
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      const formData: Produto = this.updateForm.value;
      this.produtoService.updateProduct(formData).subscribe(
        (value: Produto) => {
          console.log("Produto atualizado : ", value);
          alert("A atualização foi um sucesso!");
          window.location.reload();
        },
        (error: any) => {
          console.error("Erro ao atualizar: ", error)
        }
      )
    } else {
      alert("Preencha todos os campos corretamente")
    }
  }

  onSelectedFile(event: any): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length) {
      if (input.files[0].size < 5000000) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          if (fileReader.result) {
            this.produto.imagem = fileReader.result.toString();
            this.updateForm.get('imagem')?.setValue(this.produto.imagem);
          }
        }
        fileReader.onerror = () => {
          alert("Erro ao processar a imagem");
        }
        fileReader.readAsDataURL(input.files[0]);
      }
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
