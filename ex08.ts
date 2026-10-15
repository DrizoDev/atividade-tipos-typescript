export {};

// Exercício 08 - Formulário de cadastro
let codigo: number | string = 'CLI-0042';

function formatarCodigo(c: number | string): string {
  const parteNumerica = typeof c === 'number' ? String(c) : c.replace(/^CLI-/, '');
  return `CLI-${parteNumerica.padStart(4, '0')}`;
}

type TamanhoCamiseta = 'P' | 'M' | 'G' | 'GG';
let camiseta: TamanhoCamiseta = 'M';
// camiseta = 'XG'; // TS2322: Type '"XG"' is not assignable to type 'TamanhoCamiseta'.

function calcularFrete(regiao: 'norte' | 'nordeste' | 'centro-oeste' | 'sudeste' | 'sul'): number {
  switch (regiao) {
    case 'norte': return 25;
    case 'nordeste': return 20;
    case 'centro-oeste': return 18;
    case 'sudeste': return 12;
    case 'sul': return 15;
  }
}

const endereco: string = 'Rua das Flores, 100';
const complemento: string | null = null;
const textoComplemento: string = complemento === null ? '(sem complemento)' : complemento;

function limparTelefone(tel: string | number): string {
  return String(tel).replace(/\D/g, '');
}

// Inferência de literais:
const r = 'sul'; // Tipo inferido: 'sul', pois const não será reatribuída.
let regiaoSemRestricao = 'sul'; // Tipo inferido: string, pois let pode mudar.
// calcularFrete(regiaoSemRestricao);
// TS2345: Argument of type 'string' is not assignable to parameter of type das regiões aceitas.
// Correção: 'as const' preserva o tipo literal mesmo com let.
let r2 = 'sul' as const;

console.log(`Cliente: ${formatarCodigo(codigo)} | Camiseta: ${camiseta}`);
console.log(`Entrega: ${endereco} - ${textoComplemento}`);
console.log(`Frete para o ${r}: R$ ${calcularFrete(r2).toFixed(2)}`);
console.log(`Telefone: ${limparTelefone('(69) 99999-0000')}`);
// Também funciona com número: limparTelefone(69999990000).
