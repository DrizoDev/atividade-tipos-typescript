export {};

// Exercício 06 - Status do pedido no app de delivery
enum StatusPedido {
  Recebido = 1,
  EmPreparo,
  SaiuParaEntrega,
  Entregue,
  Cancelado
}

enum FormaPagamento {
  PIX = 'PIX',
  CARTAO = 'CARTAO',
  DINHEIRO = 'DINHEIRO'
}

function mensagem(status: StatusPedido): string {
  switch (status) {
    case StatusPedido.Recebido:
      return 'Recebemos seu pedido!';
    case StatusPedido.EmPreparo:
      return 'Seu pedido está sendo preparado 🍳';
    case StatusPedido.SaiuParaEntrega:
      return 'O entregador está a caminho 🛵';
    case StatusPedido.Entregue:
      return 'Pedido entregue. Bom apetite!';
    case StatusPedido.Cancelado:
      return 'Pedido cancelado.';
  }
}

function avancar(status: StatusPedido): StatusPedido {
  switch (status) {
    case StatusPedido.Recebido:
      return StatusPedido.EmPreparo;
    case StatusPedido.EmPreparo:
      return StatusPedido.SaiuParaEntrega;
    case StatusPedido.SaiuParaEntrega:
      return StatusPedido.Entregue;
    case StatusPedido.Entregue:
    case StatusPedido.Cancelado:
      return status; // Estado final: não há avanço.
  }
}

const pagamento: FormaPagamento = FormaPagamento.PIX;
// const formaInvalida: FormaPagamento = 'PIX';
// TS2322: Type '"PIX"' is not assignable to type 'FormaPagamento'.
// É obrigatório usar um membro do enum (FormaPagamento.PIX), não uma string solta.

// Mapeamento reverso: StatusPedido[2] é 'EmPreparo'.
let statusAtual: StatusPedido = StatusPedido.Recebido;
while (true) {
  console.log(`[${statusAtual} - ${StatusPedido[statusAtual]}] ${mensagem(statusAtual)}`);
  if (statusAtual === StatusPedido.Entregue) {
    break;
  }
  statusAtual = avancar(statusAtual);
}
console.log(`Pagamento: ${pagamento}`);
