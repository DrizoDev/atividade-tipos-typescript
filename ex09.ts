export {};

// Exercício 09 - Lendo a resposta de uma API de clima
const respostaOk = '{"cidade":"Porto Velho","temperatura":34,"umidade":0.62}';
const respostaQuebrada = '{"cidade":"Porto Velho","temperatura":"quente"}';
const respostaInvalida = '{ cidade: Porto Velho ';

// Neste exercício, 'any' é utilizado exclusivamente onde o enunciado pede.
function lerComAny(json: string): void {
  const dados: any = JSON.parse(json);
  console.log(dados.temperatura.toFixed(1));
}
// Ao passar 'respostaQuebrada', o código compila, mas na execução gera:
// TypeError: dados.temperatura.toFixed is not a function.
// Isso acontece porque o valor 'quente' é uma string, sem método toFixed.

function falhar(mensagem: string): never {
  throw new Error(mensagem);
}

function lerClima(json: string): { cidade: string; temperatura: number } {
  let dados: unknown;
  try {
    dados = JSON.parse(json);
  } catch (erro: unknown) {
    if (erro instanceof SyntaxError) {
      falhar('JSON malformado');
    }
    throw erro;
  }

  if (typeof dados !== 'object' || dados === null) {
    falhar('resposta não é um objeto');
  }
  if (!('cidade' in dados) || typeof dados.cidade !== 'string') {
    falhar('campo "cidade" inválido');
  }
  if (!('temperatura' in dados) || typeof dados.temperatura !== 'number') {
    falhar('campo "temperatura" inválido');
  }

  return { cidade: dados.cidade, temperatura: dados.temperatura };
}

// O catch recebe unknown e verifica Error antes de ler message.
function testarResposta(json: string): void {
  try {
    const clima = lerClima(json);
    console.log(`${clima.cidade}: ${clima.temperatura.toFixed(1)}°C`);
  } catch (erro: unknown) {
    if (erro instanceof Error) {
      console.log(`Erro: ${erro.message}`);
    } else {
      console.log('Erro desconhecido');
    }
  }
}

// As três respostas pedidas, na ordem da saída esperada.
testarResposta(respostaOk);
testarResposta(respostaQuebrada);
testarResposta(respostaInvalida);

// Demonstração do problema com any: o erro é capturado para não parar o programa.
try {
  lerComAny(respostaQuebrada);
} catch (erro: unknown) {
  if (erro instanceof Error) {
    // Erro observado na execução, anotado acima: TypeError.
    // console.log(`${erro.name}: ${erro.message}`); // Descomente para visualizar.
  }
}
