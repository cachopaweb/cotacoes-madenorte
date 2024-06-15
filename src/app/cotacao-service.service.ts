import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TPedido } from "./Model/TPedido";
import { TCotacao } from './Model/TCotacao';
import { tap } from 'rxjs/operators';
import { TFornecedores } from './Model/TAcessoFornecedores';
import { TAcesso } from './Model/TAcesso';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
};


@Injectable({
  providedIn: 'root'
})
export class CotacaoServiceService {

  private BaseURL: string = "https://cotacoes-madenorte-2024-default-rtdb.firebaseio.com/";
  
  constructor(private _http: HttpClient) { }

  BuscaCotacao(codigo: string){
    return this._http.get<TPedido>(this.BaseURL+`/Cotacoes/${codigo}.json`, httpOptions);
  }

  BuscaPedido(codigo: string){
    return this._http.get<TPedido>(this.BaseURL+`/Pedido/${codigo}.json`, httpOptions);
  }
  
  AcessoFornecedores(){
    return this._http.get<TFornecedores>(this.BaseURL+`/Fornecedores/fornecedores.json`, httpOptions);
  }

  BuscaQuantidadeCotacoes(){
    return this._http.get<TCotacao[]>(this.BaseURL+`/Cotacoes.json`, httpOptions);
  }

  InsereCotacao(codigo: string, cotacao: TCotacao){
    return this._http.put<TCotacao>(this.BaseURL+`/Cotacoes/${codigo}.json`, cotacao, httpOptions)
    .pipe(
      tap(
        
      )
    );
  }

  RemoveAcesso(acesso: TFornecedores){
    return this._http.put(this.BaseURL+`/Fornecedores/fornecedores.json`, acesso, httpOptions);
  }
}
