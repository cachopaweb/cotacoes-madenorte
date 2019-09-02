import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CotacaoFornecedorComponent } from './cotacao-fornecedor/cotacao-fornecedor.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'cotacao-fornecedor', component: CotacaoFornecedorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
