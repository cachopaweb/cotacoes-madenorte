import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotacaoFornecedorComponent } from './cotacao-fornecedor.component';

describe('CotacaoFornecedorComponent', () => {
  let component: CotacaoFornecedorComponent;
  let fixture: ComponentFixture<CotacaoFornecedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotacaoFornecedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotacaoFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
