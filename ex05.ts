export {};

// Exercício 05 - Boletim do clima
const leituras: [cidade: string, temperatura: number][] = [
  ['Porto Velho', 34],
  ['Curitiba', 12],
  ['Manaus', 31],
  ['Porto Alegre', 9],
  ['Natal', 29]
];

function extremos(temps: number[]): [number, number] {
  return [Math.min(...temps), Math.max(...temps)];
}

const temperaturas: number[] = leituras.map(([, temperatura]) => temperatura);
const [minima, maxima] = extremos(temperaturas);
const media: number = temperaturas.reduce((soma, temp) => soma + temp, 0) / temperaturas.length;

for (const [cidade, temp] of leituras) {
  console.log(`${cidade}: ${temp}°C`);
}
console.log(`Mínima: ${minima}°C | Máxima: ${maxima}°C | Média: ${media.toFixed(1)}°C`);

// O último campo dessas tuplas é opcional.
const contatoComEmail: [nome: string, telefone: string, email?: string] = [
  'Marina', '(69) 99999-1234', 'marina@jornal.com'
];
const contatoSemEmail: [nome: string, telefone: string, email?: string] = [
  'Carlos', '(69) 99999-5678'
];

// Rest: depois da cidade, pode haver quantas temperaturas forem necessárias.
const historicoSemanal: [string, ...number[]] = ['Porto Velho', 32, 33, 31, 34, 35, 33, 34];
const [cidadeHistorico, ...valoresSemanais] = historicoSemanal;
const mediaSemanal: number = valoresSemanais.reduce((soma, temp) => soma + temp, 0) / valoresSemanais.length;

const capitalOficial: readonly [string, string] = ['RO', 'Porto Velho'];
// capitalOficial[1] = 'Outra cidade'; // TS2540: Cannot assign to '1' because it is a read-only property.
// A tupla readonly não permite alteração de suas posições.

// Média semanal calculada: 33.1°C (variável mediaSemanal).
// Os dados históricos e contatos foram mantidos sem saída extra para
// reproduzir exatamente as linhas previstas pelo enunciado.
