import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-criar-produto',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule
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

  constructor(
    private router: Router
  ) { }

  mainViewProduto() {
    this.router.navigate(["/produto"]);
  }

  onSelectedFile(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length) {
      if (input.files[0].size < 5000000) {
        this.selectedFile = input.files[0];
        console.log(this.selectedFile);
        this.convertToBase64(this.selectedFile);
      } else {
        alert("Imagem tem que ser menos que 5MB");
      }
    }
  }

  convertToBase64(file: File): void {
    const reader = new FileReader();

    reader.onloadend = () => {
      this.base64Image = reader.result as string;
      console.log("Base64 da imagem:", this.base64Image);
    };
    reader.readAsDataURL(file);
  }

}
