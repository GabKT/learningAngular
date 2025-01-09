import { Produto } from "../../views/produto/model/produto.model";
import { FilterStrategy } from "./filter.strategy";

export class PriceFilter implements FilterStrategy {
    constructor(private value: number) { }

    apply(produtos: Produto[]): Produto[] {
        if (this.value == 0) {
            return produtos;
        }
        return produtos.filter(produto => produto.preco < this.value);
    }
}