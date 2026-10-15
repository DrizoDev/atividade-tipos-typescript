export {};

// Exercício 07 - Central de notificações
type Notificador = (destinatario: string, mensagem: string) => void;

const porEmail: Notificador = (destinatario, mensagem) => {
  console.log(`[E-MAIL] para ${destinatario}: ${mensagem}`);
};

const porSms: Notificador = (destinatario, mensagem) => {
  if (mensagem.length > 160) {
    console.log('SMS ignorado: mensagem longa');
    return; // Retorno antecipado, sem valor.
  }
  console.log(`[SMS] para ${destinatario}: ${mensagem}`);
};

const porApp: Notificador = (destinatario, mensagem) => {
  console.log(`[APP] para ${destinatario}: ${mensagem}`);
};

function notificarTodos(destinatarios: string[], mensagem: string, enviar: Notificador): void {
  destinatarios.forEach((destinatario) => enviar(destinatario, mensagem));
}

// function teste(): void { return 10; }
// TS2322: Type 'number' is not assignable to type 'void'.
// Uma função declarada como void não pode devolver o número 10 diretamente.

const contar: Notificador = (_destinatario, mensagem) => mensagem.length;
// Reflexão: funções que retornam algum valor podem ser atribuídas a um
// callback com retorno void. Quem chama o callback deve ignorar esse retorno;
// void aqui indica que o resultado não será utilizado.

const aviso = 'Reunião de pais sexta às 19h';
notificarTodos(['ana@escola.com'], aviso, porEmail);
notificarTodos(['joao.resp'], aviso, porApp);
notificarTodos(['(69) 99999-0000'], 'A'.repeat(161), porSms);
// O retorno numérico existe na implementação, mas é ignorado no tipo Notificador.
contar('responsavel', aviso);
