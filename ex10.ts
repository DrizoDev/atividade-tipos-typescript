export {};

// Exercício 10 - Sistema de estacionamento (projeto integrador)

// 1 e 2. Type aliases, tuplas, propriedades readonly e união discriminada.
type Placa = string;
type Periodo = [entrada: number, saida: number];

type Carro = {
  readonly placa: Placa;
  tipo: 'carro';
  portas: 2 | 4;
};

type Moto = {
  readonly placa: Placa;
  tipo: 'moto';
  cilindradas: number;
};

type Caminhao = {
  readonly placa: Placa;
  tipo: 'caminhao';
  eixos: number;
};

type Veiculo = Carro | Moto | Caminhao;

// 3 e 4. Enum de string e objeto do ticket.
enum SituacaoTicket {
  Aberto = 'ABERTO',
  Pago = 'PAGO'
}

type Ticket = {
  veiculo: Veiculo;
  periodo: Periodo;
  selo: boolean;
  situacao: SituacaoTicket;
  valor?: number;
};

// 5. Cobrança da primeira hora e das adicionais.
function calcularTarifa(v: Veiculo, horas: number): number {
  const horasCobradas = Math.max(1, Math.ceil(horas));

  switch (v.tipo) {
    case 'carro':
      return 8 + (horasCobradas - 1) * 5;
    case 'moto':
      return 4 + (horasCobradas - 1) * 2;
    case 'caminhao':
      return 15 + (horasCobradas - 1) * 10;
    default: {
      const _naoTratado: never = v;
      return _naoTratado;
    }
  }
}

// Teste solicitado de verificação exaustiva (deixado comentado):
// type Van = { readonly placa: Placa; tipo: 'van'; passageiros: number };
// Se o tipo Veiculo fosse Carro | Moto | Caminhao | Van, sem criar um case
// 'van' em calcularTarifa, o compilador indicaria:
// TS2322: Type 'Van' is not assignable to type 'never'.
// O never garante que todos os tipos de Veiculo sejam tratados no switch.

// 6. Fecha o ticket e devolve outro objeto, preservando o ticket original.
function fecharTicket(t: Ticket): Ticket {
  const horas = Math.max(1, t.periodo[1] - t.periodo[0]);
  const tarifa = calcularTarifa(t.veiculo, horas);
  const valorFinal = t.selo ? tarifa * 0.5 : tarifa;

  return {
    ...t,
    situacao: SituacaoTicket.Pago,
    valor: valorFinal
  };
}

// 7. Função com retorno void.
function registrar(msg: string): void {
  console.log(msg);
}

// 8. Entrada externa: somente dados validados viram um Veiculo.
function falhar(mensagem: string): never {
  throw new Error(mensagem);
}

function lerVeiculo(json: string): Veiculo {
  let dados: unknown;
  try {
    dados = JSON.parse(json);
  } catch (erro: unknown) {
    if (erro instanceof SyntaxError) {
      falhar('JSON malformado');
    }
    throw erro;
  }

  if (typeof dados !== 'object' || dados === null || Array.isArray(dados)) {
    falhar('veículo deve ser um objeto');
  }
  if (!('placa' in dados) || typeof dados.placa !== 'string' || dados.placa.trim() === '') {
    falhar('placa inválida');
  }
  if (!('tipo' in dados) || typeof dados.tipo !== 'string') {
    falhar('tipo inválido');
  }

  const placa = dados.placa;
  switch (dados.tipo) {
    case 'carro':
      if (!('portas' in dados) || (dados.portas !== 2 && dados.portas !== 4)) {
        falhar('número de portas inválido');
      }
      return { placa, tipo: 'carro', portas: dados.portas };

    case 'moto':
      if (!('cilindradas' in dados) || typeof dados.cilindradas !== 'number' ||
          !Number.isFinite(dados.cilindradas) || dados.cilindradas <= 0) {
        falhar('cilindradas inválidas');
      }
      return { placa, tipo: 'moto', cilindradas: dados.cilindradas };

    case 'caminhao':
      if (!('eixos' in dados) || typeof dados.eixos !== 'number' ||
          !Number.isInteger(dados.eixos) || dados.eixos <= 0) {
        falhar('número de eixos inválido');
      }
      return { placa, tipo: 'caminhao', eixos: dados.eixos };

    default:
      return falhar(`tipo "${dados.tipo}" desconhecido`);
  }
}

// Dados de teste: os quatro veículos são lidos a partir de JSON.
const tickets: Ticket[] = [
  {
    veiculo: lerVeiculo('{"placa":"ABC1D23","tipo":"carro","portas":4}'),
    periodo: [8, 11],
    selo: false,
    situacao: SituacaoTicket.Aberto
  },
  {
    veiculo: lerVeiculo('{"placa":"MOT0A12","tipo":"moto","cilindradas":160}'),
    periodo: [9, 10],
    selo: false,
    situacao: SituacaoTicket.Aberto
  },
  {
    veiculo: lerVeiculo('{"placa":"CAM9Z99","tipo":"caminhao","eixos":3}'),
    periodo: [7, 12],
    selo: false,
    situacao: SituacaoTicket.Aberto
  },
  {
    veiculo: lerVeiculo('{"placa":"XYZ4E56","tipo":"carro","portas":2}'),
    periodo: [14, 16],
    selo: true,
    situacao: SituacaoTicket.Aberto
  }
];

// 9. map fecha; filter pega os pagos; reduce soma o faturamento e entradas.
const ticketsFechados: Ticket[] = tickets.map(fecharTicket);
const pagos: Ticket[] = ticketsFechados.filter((t) => t.situacao === SituacaoTicket.Pago);

pagos.forEach((ticket) => {
  const horas = Math.max(1, ticket.periodo[1] - ticket.periodo[0]);
  const observacao = ticket.selo ? ' (selo -50%)' : '';
  registrar(`[${ticket.situacao}] ${ticket.veiculo.placa} (${ticket.veiculo.tipo}) - ${horas}h - R$ ${ticket.valor!.toFixed(2)}${observacao}`);
});

const faturamento: number = pagos.reduce((soma, ticket) => soma + (ticket.valor ?? 0), 0);

const entradas = tickets.reduce(
  (contagem, ticket) => {
    contagem[ticket.veiculo.tipo] += 1;
    return contagem;
  },
  { carro: 0, moto: 0, caminhao: 0 }
);

registrar(`Faturamento: R$ ${faturamento.toFixed(2)}`);
registrar(`Entradas: carro=${entradas.carro}, moto=${entradas.moto}, caminhao=${entradas.caminhao}`);

try {
  lerVeiculo('{"placa":"BIC1C23","tipo":"bicicleta"}');
} catch (erro: unknown) {
  if (erro instanceof Error) {
    registrar(`Erro ao ler veículo: ${erro.message}`);
  }
}
