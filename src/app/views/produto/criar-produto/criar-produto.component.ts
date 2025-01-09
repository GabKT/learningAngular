import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produto } from '../model/produto.model';
import { ProdutoService } from '../service/produto.service';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-criar-produto',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './criar-produto.component.html',
  styleUrl: './criar-produto.component.css'
})
export class CriarProdutoComponent {

  base64Image: string = "";
  selectedFile: File | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  tamanhos: string[] = [
    "PP", "P", "M", "G", "GG"
  ];

  cadastroForm: FormGroup;

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private formBuilder: FormBuilder
  ) {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', Validators.required],
      categoria: ['', Validators.required],
      preco: [0.0, Validators.required],
      tamanho: ['', Validators.required],
      imagem: ['',]
    })
  }

  mainViewProduto() {
    this.router.navigate(["/produto"]);
  }

  async onSelectedFile(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length) {
      if (input.files[0].size < 5000000) {
        this.selectedFile = input.files[0];
        this.base64Image = await this.convertToBase64(this.selectedFile);

      } else {
        alert("Imagem tem que ser menos que 5MB");
      }
    }
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      const formData = this.cadastroForm.value
      formData.imagem = this.base64Image
      this.produtoService.insertProduct(formData).subscribe(
        (value: Produto) => {
          console.log("Produto cadastrado : ", value);
          alert("Cadastro feito com sucesso")
          this.cadastroForm.reset();
        },
        (error: any) => {
          console.error("Erro ao cadastrar ", error)
        }
      )

    } else {
      alert("Preencha todos os campos corretamente")
    }
  }

  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result.toString());
        } else {
          reject("Nao foi possivel ler");
        }
      }

      reader.onerror = () => {
        reject("Erro ao ler");
      }

      reader.readAsDataURL(file)
    });
  }

}
