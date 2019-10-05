import { Component, OnInit } from '@angular/core';
import { CotacaoServiceService } from '../cotacao-service.service';
import { TItem } from '../Model/TItem';
import { TPedido } from '../Model/TPedido';
import { TListaItens } from '../Model/TListaItens';
import { TCotacao } from '../Model/TCotacao';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { TAcesso } from '../Model/TAcesso';
import { TFornecedores } from '../Model/TAcessoFornecedores';
import { CSTServiceService } from '../cst-service.service';
import { CSOSNServiceService } from '../csosn-service.service';
import { FormControl } from '@angular/forms';
import { TCst } from '../Model/TCst';
import { TCsosn } from '../Model/TCsosn';

@Component({
  selector: 'app-cotacao-fornecedor',
  templateUrl: './cotacao-fornecedor.component.html',
  styleUrls: ['./cotacao-fornecedor.component.css']
})
export class CotacaoFornecedorComponent implements OnInit {
  public itens: TItem[];
  public listaItens: TListaItens;
  public pedido: TPedido;
  public cotacao: TCotacao; 
  public Usuario: TAcesso;
  public cod_cotacao: string;
  public QuantCotacoes: number;
  public fornecedores: TFornecedores;
  public ListaCST: TCst[] = [];
  public ListaCSOSN: TCsosn[] = [];
  public CST = new FormControl();
  public CSOSN = new FormControl();
  public data_entrega: string;
  public valorFrete: number;
  public for_nome: string;
  public CRT: number;
  public tipoFrete: number;
  
  constructor(private _ServiceCotacao: CotacaoServiceService, 
              private _route: Router,
              private _ServiceCST: CSTServiceService,
              private _ServiceCSOSN: CSOSNServiceService) { }

  ngOnInit() {
    this.tipoFrete = 0;//CIF 
    this.Usuario = JSON.parse(localStorage.getItem('login'));  
    if (this.Usuario){
      this.for_nome = this.Usuario.nome;
      this.CRT = this.Usuario.crt;
    }
    if (this.Usuario.pedido > 0)
    {
      this._ServiceCotacao.BuscaPedido(this.Usuario.pedido.toString()).subscribe(
        (sucess)=>{ 
          if (sucess)
          {
            this.listaItens = sucess.listaItens;
            this.pedido = sucess;
            this.pedido.codigo = 0;
            this.itens = sucess.listaItens.items;
            if (this.itens){
              this.itens.forEach(item=>{
                item.quant_Atendida = item.quant_Pedida
                item.valorUnit = item.valorUnit
                item.valor = 0
              })
            }
          }
        }            
      );
    }else
    {
      this._ServiceCotacao.BuscaCotacao(this.Usuario.cotacao.toString()).subscribe(
        (sucess)=>{ 
          if (sucess)
          {
            this.listaItens = sucess.listaItens;
            this.pedido = sucess;
            this.pedido.codigo = this.Usuario.cotacao;
            this.itens = sucess.listaItens.items;  
            if (this.itens){
              this.itens.forEach(item=>{
                item.valorUnit = item.valor / item.quant_Atendida                
              })
            }         
          }
        }            
      );
    }
    //contador de cotacoes
    this._ServiceCotacao.BuscaQuantidadeCotacoes().subscribe(
      (cotacoes)=> {
        if (cotacoes)
          this.QuantCotacoes = cotacoes.length
      }
    );
    //acesso fornecedores
    this._ServiceCotacao.AcessoFornecedores().subscribe(
      (forn)=>{this.fornecedores = forn}
    );
    //CST
    this.ListaCST = this._ServiceCST.getCST();    
    //CSOSN
    this.ListaCSOSN = this._ServiceCSOSN.getCSOSN();    
  }

  Finalizar(){
    if (this.itens){
      this.itens.forEach(item=>{
        item.valor = item.quant_Atendida * item.valorUnit
      })
    }
      if (!this.QuantCotacoes) {
        this.QuantCotacoes = 1;
      }
      if (this.pedido.codigo === 0){
        this.pedido.codigo = this.QuantCotacoes;
      }
    this.pedido.data_Chegada = this.data_entrega.toString();
    this.pedido.frete = this.valorFrete;
    this.cotacao = new TCotacao(this.pedido.codigo,
                                this.pedido.dARF, 
                                this.pedido.data_Chegada, 
                                this.pedido.data_Pronto_Venda, 
                                this.pedido.estado, 
                                this.Usuario.codigo, 
                                this.pedido.frete, 
                                this.pedido.iCMS, 
                                this.listaItens, 
                                this.pedido.pedido, 
                                this.pedido.valor,
                                this.tipoFrete);
      Swal.fire(`Aguarde finalizando Cotação ${this.cotacao.codigo}...`, 'Cotações Madenorte', 'info')
      this._ServiceCotacao.InsereCotacao(this.cotacao.codigo.toString(), this.cotacao).subscribe(
      (cotacao)=>{
        let achou = 0;
        for (let i = 0; i < this.fornecedores.items.length; i++) {
          if (this.fornecedores.items[i].codigo == this.Usuario.codigo)
          {
            achou = i;
            break;          
          }
        }
        this.fornecedores.items.splice(achou, 1);//remove do array  
        this.fornecedores.listHelper[0] = this.fornecedores.items.length;      
        this._ServiceCotacao.RemoveAcesso(this.fornecedores).subscribe((ok)=>{ console.log('removido com sucesso'+ok)});
        Swal.fire(`Cotação ${cotacao.codigo} finalizada com sucesso...`, 'Cotações Madenorte', 'success')
        .finally(
          ()=> this._route.navigateByUrl('')
        )
      },
      (error)=>console.log(error)
    );
    
    //voltar para a pagina inicial
  }

  ChangeTipoFrete(tipo: number){
    this.tipoFrete = tipo;    
  }

}
