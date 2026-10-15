export {};

// Exercício 04 - Lista de compras do mês
const itens: { nome: string; preco: number; quantidade: number }[] = [
  { nome: 'Arroz 5kg', preco: 28.90, quantidade: 1 },
  { nome: 'Feijão 1kg', preco: 8.49, quantidade: 2 },
  { nome: 'Leite 1L', preco: 4.99, quantidade: 6 },
  { nome: 'Café 500g', preco: 17.90, quantidade: 1 },
  { nome: 'Sabão em pó', preco: 12.50, quantidade: 1 }
];

// map cria os nomes; filter seleciona; reduce soma.
const nomes: string[] = itens.map((item) => item.nome);
const caros = itens.filter((item) => item.preco > 10);
const total: number = itens.reduce(
  (acumulado, item) => acumulado + item.preco * item.quantidade,
  0
);

const categorias: readonly string[] = ['Mercearia', 'Laticínios', 'Limpeza'];
// categorias.push('Bebidas'); // TS2339: Property 'push' does not exist on type 'readonly string[]'.
// Um array readonly não permite adicionar ou remover elementos.

// Cada array interno representa uma prateleira.
const despensa: number[][] = [[2, 0, 1], [4, 4], [1]];
const totalDespensa: number = despensa.reduce(
  (acumulado, prateleira) => acumulado + prateleira.reduce((soma, valor) => soma + valor, 0),
  0
);

// Desestruturação dos dois primeiros itens.
const [primeiroItem, segundoItem] = itens;
// Spread cria nova lista; o array 'itens' não muda.
const listaAmpliada = [...itens, { nome: 'Macarrão 500g', preco: 5.99, quantidade: 2 }];

console.log(`Itens: ${nomes.join(', ')}`);
console.log(`Acima de R$ 10: ${caros.map((item) => item.nome).join(', ')}`);
console.log(`Total da compra: R$ ${total.toFixed(2)}`);
console.log(`Itens na despensa: ${totalDespensa}`);
// Valores disponíveis para conferência: primeiroItem, segundoItem, listaAmpliada.
