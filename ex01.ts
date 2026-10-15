export {};

// Exercício 01 - Caixa da padaria
// Anotações explícitas de tipos
let nomeProduto1: string = 'Pão francês';
let precoUnitario1: number = 0.75;
let quantidade1: number = 12;

let nomeProduto2: string = 'Bolo de cenoura';
let precoUnitario2: number = 18.5;
let quantidade2: number = 2;

// Tipo inferido pelo TypeScript: boolean.
let aberta = true;

const subtotal1: number = precoUnitario1 * quantidade1;
const subtotal2: number = precoUnitario2 * quantidade2;
const total: number = subtotal1 + subtotal2;

// Os sublinhados facilitam a leitura; o valor continua sendo 1250000.
const paesVendidos: number = 1_250_000;
// 0x1A (hexadecimal) corresponde a 26 (decimal).
const categoria: number = 0x1A;

// Erro provocado e comentado:
// quantidade1 = 'doze'; // TS2322: Type 'string' is not assignable to type 'number'.

console.log(`${nomeProduto1}: ${quantidade1} x R$ ${precoUnitario1.toFixed(2)} = R$ ${subtotal1.toFixed(2)}`);
console.log(`${nomeProduto2}: ${quantidade2} x R$ ${precoUnitario2.toFixed(2)} = R$ ${subtotal2.toFixed(2)}`);
console.log(`Total: R$ ${total.toFixed(2)}`);
console.log(`Padaria aberta? ${aberta}`);
console.log(`Pães vendidos no ano: ${paesVendidos}`);
console.log(`Categoria: ${categoria}`);
