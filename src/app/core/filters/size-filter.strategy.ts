import { Produto } from "../../views/produto/model/produto.model";
import { FilterStrategy } from "./filter.strategy";

export class SizeFilter implements FilterStrategy {
    constructor(private selectedSizes: string[]) { }

    apply(produtos: Produto[]): Produto[] {
        if (this.selectedSizes.length === 0) {
            return produtos;
        }
        return produtos.filter(produto => this.selectedSizes.includes(produto.tamanho));
    }
}