import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ProdutoComponent } from './views/produto/produto.component';

export const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "produto", component: ProdutoComponent }
];
