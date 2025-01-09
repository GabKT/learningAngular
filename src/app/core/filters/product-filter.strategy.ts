import { Produto } from "../../views/produto/model/produto.model";
import { FilterStrategy } from "./filter.strategy";

export class ProductFilter {
    private strategies: FilterStrategy[] = [];

    addStrategy(strategy: FilterStrategy): void {
        this.strategies.push(strategy);
    }

    applyFilters(produtos: Produto[]): Produto[] {
        return this.strategies.reduce((result, strategy) => strategy.apply(result), produtos);
    }
}