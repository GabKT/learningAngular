import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from './produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  baseUrl = "http://localhost:8080/roupas";

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseUrl);
  }

  insertProduct(produto: Produto): Observable<Produto>{
    return this.http.post<Produto>(this.baseUrl, produto);
  }
}
