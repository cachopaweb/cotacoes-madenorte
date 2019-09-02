import { TListaItens } from "./TListaItens";

export class TPedido {
    constructor (
        public codigo: number,
        public dARF: number,
        public data_Chegada: string,
        public data_Pronto_Venda: string,
        public estado: string,
        public fornecedor: number,
        public frete: number,
        public iCMS: number,
        public listaItens: TListaItens,
        public pedido: number,
        public valor: number        
    ){}
}
