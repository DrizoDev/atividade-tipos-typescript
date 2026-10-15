export {};

// Exercício 02 - Cupom fiscal
const nomeDigitado: string = ' maria da silva ';

function formatarNome(nome: string): string {
  const conectivos = ['da', 'de', 'do'];

  return nome.trim()
    .split(' ')
    .filter((palavra) => palavra.length > 0)
    .map((palavra) => {
      const minuscula = palavra.toLowerCase();
      if (conectivos.includes(minuscula)) {
        return minuscula;
      }
      return minuscula.charAt(0).toUpperCase() + minuscula.slice(1);
    })
    .join(' ');
}

const nomeCliente: string = formatarNome(nomeDigitado);
const precoLido: string = '12.40';
const quantidadeLida: string = '3un';
const preco: number = Number(precoLido);
const quantidade: number = parseInt(quantidadeLida, 10);
const clienteFidelidade: boolean = true;

const subtotal: number = preco * quantidade;
const desconto: number = clienteFidelidade ? subtotal * 0.05 : 0;
const total: number = subtotal - desconto;
const numeroCupom: string = String(42).padStart(6, '0');

// Todo o cupom foi montado em uma única template string multilinha.
const cupom: string = `CUPOM Nº ${numeroCupom}
Cliente: ${nomeCliente}
Item: ${quantidade} x R$ ${preco.toFixed(2)}
Subtotal: R$ ${subtotal.toFixed(2)}
Desconto fidelidade: R$ ${desconto.toFixed(2)}
TOTAL: R$ ${total.toFixed(2)}`;

console.log(cupom);
