import { Produto } from "../../views/produto/model/produto.model";

export interface FilterStrategy {
    apply(produto: Produto[]): Produto[];
}