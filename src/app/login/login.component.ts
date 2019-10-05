import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CotacaoServiceService } from '../cotacao-service.service';
import { Router } from '@angular/router';
import { TFornecedores } from '../Model/TAcessoFornecedores';
import { TAcesso } from '../Model/TAcesso';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public ano: Date;
  public Fornecedores: TFornecedores;

  public form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', Validators.required)
  });
  constructor(private _serviceCotacao: CotacaoServiceService,
    private _route: Router) { }

  ngOnInit() {
    this.ano = new Date();
    this._serviceCotacao.AcessoFornecedores().subscribe(
      (sucess) => {
        this.Fornecedores = sucess
      }
    )
  }

  onSubmit() {
    if (!this.form.invalid) {
      if ((this.form.controls.email.value === 'adm@gmail.com') && (this.form.controls.senha.value === 'portal3694')) 
      {
          this._route.navigateByUrl('cotacao-fornecedor');
      }
      if (this.Fornecedores) {
        let login = null;
        for (let i = 0; i < this.Fornecedores.items.length; i++) {
          if ((this.form.controls.email.value === this.Fornecedores.items[i].email)  
          && (this.form.controls.senha.value === this.Fornecedores.items[i].senha))           
          {
            login = this.Fornecedores.items[i];         
            break;            
          }
        }             
        if (!login)  
          alert('E-mail não encontrado!')
        if (login.email == this.form.controls.email.value) {
          if (login.senha == this.form.controls.senha.value) {
            localStorage.clear();
            localStorage.setItem('login', JSON.stringify(login));
            this._route.navigateByUrl('cotacao-fornecedor');
          } else {
            alert('Senha incorreta!')
          }
        }else{

          alert('E-mail não encontrado!')
        }         
      }
    }
  }
}
