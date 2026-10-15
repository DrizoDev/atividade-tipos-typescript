export {};

// Exercício 03 - Ficha de paciente
// Tipo definido diretamente na anotação, sem type e sem interface.
let paciente: {
  readonly cpf: string;
  nome: string;
  idade: number;
  plano: boolean;
  alergias?: string[];
  contatoEmergencia?: { nome: string; telefone: string };
} = {
  cpf: '12345678900',
  nome: 'Ana Souza',
  idade: 34,
  plano: true,
  alergias: ['dipirona', 'lactose'],
  contatoEmergencia: { nome: 'Paulo Souza', telefone: '(69) 99999-0000' }
};

// typeof paciente reaproveita a estrutura do tipo do primeiro paciente.
const paciente2: typeof paciente = {
  cpf: '98765432100',
  nome: 'Carlos Lima',
  idade: 61,
  plano: false
};

function resumo(p: { nome: string; idade: number; alergias?: string[] }): string {
  const descricaoAlergias = p.alergias === undefined
    ? 'Sem alergias registradas'
    : `Alergias: ${p.alergias.join(', ')}`;
  return `${p.nome}, ${p.idade} anos. ${descricaoAlergias}`;
}

// Erros provocados e comentados:
// paciente.cpf = '00000000000'; // TS2540: Cannot assign to 'cpf' because it is a read-only property.
// paciente.peso = 70; // TS2339: Property 'peso' does not exist on type of paciente.

let dados: object = paciente;
// console.log(dados.nome); // TS2339: Property 'nome' does not exist on type 'object'.
// Explicação: 'object' indica que o valor não é primitivo, mas não
// informa quais propriedades estão disponíveis no objeto.

let x: {} = 10; // Aceito: {} permite qualquer valor não nulo/não indefinido.
// let y: object = 10; // TS2322: Type 'number' is not assignable to type 'object'.
// 'object' exige um valor não primitivo; número é um valor primitivo.
// 'Object' (com O maiúsculo) também aceita primitivos não nulos, como 10.
let exemploObject: Object = 10;

console.log(resumo(paciente));
console.log(resumo(paciente2));
