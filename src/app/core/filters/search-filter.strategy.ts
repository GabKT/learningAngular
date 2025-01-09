import { Produto } from "../../views/produto/model/produto.model";
import { FilterStrategy } from "./filter.strategy";

export class SearchFilter implements FilterStrategy {
    constructor(private searchTerm: string) { }

    apply(produtos: Produto[]): Produto[] {
        return produtos.filter(produto => produto.nome.toLowerCase().includes(this.searchTerm.toLowerCase()))
    }
}