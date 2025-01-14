import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ProdutoComponent } from './views/produto/produto.component';
import { CriarProdutoComponent } from './views/produto/criar-produto/criar-produto.component';
import { LoginComponent } from './views/auth/login/login.component';
import { authGuard } from './auth.guard';
import { RegisterComponent } from './views/auth/register/register.component';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "home", component: HomeComponent, canActivate: [authGuard] },
    { path: "produto", component: ProdutoComponent, canActivate: [authGuard] },
    { path: "produto/criar", component: CriarProdutoComponent, canActivate: [authGuard] },
    { path: "**", redirectTo: "login" }
];
