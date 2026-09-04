const ABA_USUARIOS = 'USUARIOS';

/**
 * Abre o sistema.
 */
function doGet() {
  return HtmlService
    .createTemplateFromFile('Login')
    .evaluate()
    .setTitle('Secretaria Granemann')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Faz o login do usuário.
 */
function fazerLogin(usuario, senha) {

  usuario = String(usuario || '').trim().toUpperCase();
  senha = String(senha || '');

  if (!usuario || !senha) {
    return {
      sucesso: false,
      mensagem: 'Informe usuário e senha.'
    };
  }

  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  const aba = planilha.getSheetByName(ABA_USUARIOS);

  if (!aba) {
    return {
      sucesso: false,
      mensagem: 'A aba USUARIOS não foi encontrada.'
    };
  }

  const dados = aba.getDataRange().getValues();

  for (let i = 1; i < dados.length; i++) {

    const id = dados[i][0];
    const usuarioPlanilha = String(dados[i][1] || '').trim().toUpperCase();
    const nome = String(dados[i][2] || '').trim();
    const senhaPlanilha = String(dados[i][3] || '');
    const nivel = String(dados[i][4] || '').trim().toUpperCase();

    if (
      usuarioPlanilha === usuario &&
      senhaPlanilha === senha
    ) {

      return {
        sucesso: true,
        id: id,
        usuario: usuarioPlanilha,
        nome: nome,
        nivel: nivel
      };
    }
  }

  return {
    sucesso: false,
    mensagem: 'Usuário ou senha incorretos.'
  };
}

/**
 * Inclui arquivos HTML dentro de outros arquivos.
 */
function incluir(nomeArquivo) {
  return HtmlService
    .createHtmlOutputFromFile(nomeArquivo)
    .getContent();
}
