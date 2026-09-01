/*************************************************
 * SECRETARIA GRANEMANN
 * API DE INTEGRAÇÃO COM GOOGLE SHEETS
 * VERSÃO CORRIGIDA - STATUS E CONTATOS
 *************************************************/

const ABA_USUARIOS = "USUARIOS";
const ABA_EVENTOS = "EVENTOS";
const ABA_CONTATOS = "CONTATOS";
const ABA_AGENDA = "AGENDA";
const ABA_TAREFAS = "TAREFAS";


/*************************************************
 * GET
 *************************************************/
function doGet(e) {
  try {
    const acao = (e && e.parameter && e.parameter.acao) || "";

    if (acao === "login") return login_(e.parameter);
    if (acao === "listarEventos") return listarEventos_();
    if (acao === "listarContatos") return listarContatos_();
    if (acao === "listarAgenda") return listarAgenda_();
    if (acao === "listarTarefas") return listarTarefas_();

    return json_({ ok: false, message: "Ação não encontrada." });
  } catch (erro) {
    return json_({ ok: false, message: String(erro) });
  }
}


/*************************************************
 * POST
 *************************************************/
function doPost(e) {
  try {
    const dados = JSON.parse((e.postData && e.postData.contents) || "{}");
    const acao = dados.acao || "";

    if (acao === "login") return login_(dados);
    if (acao === "salvarEvento") return salvarEvento_(dados);
    if (acao === "salvarContato") return salvarContato_(dados);
    if (acao === "salvarAgenda") return salvarAgenda_(dados);
    if (acao === "salvarTarefa") return salvarTarefa_(dados);

    return json_({ ok: false, message: "Ação não encontrada." });
  } catch (erro) {
    return json_({ ok: false, message: String(erro) });
  }
}


/*************************************************
 * UTILITÁRIOS
 *************************************************/
function normalizar_(valor) {
  return String(valor == null ? "" : valor)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9]/g, "")
    .toUpperCase()
    .trim();
}

function localizarColuna_(cabecalho, aliases) {
  const mapa = {};
  cabecalho.forEach(function(nome, indice) {
    mapa[normalizar_(nome)] = indice;
  });

  for (let i = 0; i < aliases.length; i++) {
    const chave = normalizar_(aliases[i]);
    if (Object.prototype.hasOwnProperty.call(mapa, chave)) {
      return mapa[chave];
    }
  }
  return -1;
}

function valorLinha_(linha, indice, padrao) {
  return indice >= 0 && linha[indice] != null ? linha[indice] : (padrao || "");
}

function json_(dados) {
  return ContentService
    .createTextOutput(JSON.stringify(dados))
    .setMimeType(ContentService.MimeType.JSON);
}


/*************************************************
 * LOGIN
 *************************************************/
function login_(dados) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ABA_USUARIOS);

  if (!sh) {
    return json_({ ok: false, message: "A aba USUARIOS não foi encontrada." });
  }

  const valores = sh.getDataRange().getValues();
  if (!valores.length) {
    return json_({ ok: false, message: "A aba USUARIOS está vazia." });
  }

  const cabecalho = valores[0];
  const colNome = localizarColuna_(cabecalho, ["NOME"]);
  const colLogin = localizarColuna_(cabecalho, ["LOGIN", "USUARIO", "USUÁRIO"]);
  const colSenha = localizarColuna_(cabecalho, ["SENHA"]);
  const colPerfil = localizarColuna_(cabecalho, ["PERFIL"]);
  const colAtivo = localizarColuna_(cabecalho, ["ATIVO"]);

  for (let i = 1; i < valores.length; i++) {
    const linha = valores[i];
    const login = String(valorLinha_(linha, colLogin)).trim();
    const senha = String(valorLinha_(linha, colSenha)).trim();
    const ativo = String(valorLinha_(linha, colAtivo, "SIM")).trim().toUpperCase();

    if (
      login === String(dados.usuario || "").trim() &&
      senha === String(dados.senha || "").trim()
    ) {
      if (ativo && ativo !== "SIM") {
        return json_({ ok: false, message: "Usuário inativo." });
      }

      return json_({
        ok: true,
        usuario: {
          nome: valorLinha_(linha, colNome),
          login: valorLinha_(linha, colLogin),
          perfil: valorLinha_(linha, colPerfil)
        }
      });
    }
  }

  return json_({ ok: false, message: "Usuário ou senha incorretos." });
}


/*************************************************
 * LISTAR EVENTOS
 *************************************************/
function listarEventos_() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ABA_EVENTOS);

  if (!sh) {
    return json_({ ok: false, message: "A aba EVENTOS não foi encontrada." });
  }

  const valores = sh.getDataRange().getValues();
  if (!valores.length) return json_({ ok: true, eventos: [] });

  const cabecalho = valores[0];
  const eventos = [];

  for (let i = 1; i < valores.length; i++) {
    const linha = valores[i];
    if (!linha.some(function(valor) { return valor !== ""; })) continue;

    const obj = {};
    cabecalho.forEach(function(coluna, index) {
      obj[coluna] = linha[index];
    });
    eventos.push(obj);
  }

  return json_({ ok: true, eventos: eventos });
}


/*************************************************
 * SALVAR EVENTO
 *************************************************/
function salvarEvento_(dados) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ABA_EVENTOS);

  if (!sh) {
    return json_({ ok: false, message: "A aba EVENTOS não foi encontrada." });
  }

  const id = gerarId_("EV");

  sh.appendRow([
    id,
    new Date(),
    dados.cadastradoPor || "",
    dados.nomeEvento || "",
    dados.cidade || "",
    dados.estado || "",
    dados.dataInicio || "",
    dados.dataFim || "",
    dados.promotor || "",
    dados.telefone || "",
    dados.contato || "",
    dados.programacao || "",
    "NOVO",
    dados.responsavelContato || "André",
    "",
    "",
    "",
    "",
    dados.observacoesAngelica || "",
    dados.observacoesAndre || ""
  ]);

  SpreadsheetApp.flush();

  return json_({
    ok: true,
    message: "Evento cadastrado com sucesso.",
    id: id
  });
}


/*************************************************
 * LISTAR CONTATOS
 *************************************************/
function listarContatos_() {
  return listarAba_(ABA_CONTATOS);
}


/*************************************************
 * SALVAR CONTATO
 *************************************************/
function salvarContato_(dados) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ABA_CONTATOS);

  if (!sh) {
    return json_({ ok: false, message: "A aba CONTATOS não foi encontrada." });
  }

  if (!dados.idEvento) {
    return json_({ ok: false, message: "Selecione o evento." });
  }

  const id = gerarId_("CT");

  sh.appendRow([
    id,
    dados.idEvento || "",
    new Date(),
    dados.responsavel || "",
    dados.tipoContato || "",
    dados.resultado || "",
    dados.proximaAcao || "",
    dados.dataRetorno || "",
    dados.observacao || ""
  ]);

  const atualizado = atualizarEventoContato_(dados);

  SpreadsheetApp.flush();

  if (!atualizado) {
    return json_({
      ok: false,
      message: "O contato foi registrado, mas não foi possível localizar o evento para atualizar a situação."
    });
  }

  return json_({
    ok: true,
    message: "Contato registrado e situação do evento atualizada com sucesso."
  });
}


/*************************************************
 * ATUALIZA EVENTO APÓS O CONTATO
 *************************************************/
function atualizarEventoContato_(dados) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ABA_EVENTOS);
  if (!sh) return false;

  const valores = sh.getDataRange().getValues();
  if (valores.length < 2) return false;

  const cabecalho = valores[0];

  const colId = localizarColuna_(cabecalho, [
    "ID_EVENTO", "ID EVENTO", "ID"
  ]);

  const colStatus = localizarColuna_(cabecalho, [
    "STATUS_CONTATO", "STATUS CONTATO", "STATUS"
  ]);

  const colUltimoContato = localizarColuna_(cabecalho, [
    "DATA_ULTIMO_CONTATO", "DATA ULTIMO CONTATO", "ÚLTIMO CONTATO"
  ]);

  const colResultado = localizarColuna_(cabecalho, [
    "RESULTADO", "SITUACAO_APOS_CONTATO", "SITUAÇÃO APÓS O CONTATO"
  ]);

  const colProximaAcao = localizarColuna_(cabecalho, [
    "PROXIMA_ACAO", "PROXIMA ACAO", "PRÓXIMA AÇÃO"
  ]);

  const colDataAcao = localizarColuna_(cabecalho, [
    "DATA_PROXIMA_ACAO", "DATA PROXIMA ACAO", "DATA DA PRÓXIMA AÇÃO"
  ]);

  const colObs = localizarColuna_(cabecalho, [
    "OBSERVACOES_ANDRE", "OBSERVACOES", "OBSERVAÇÃO", "OBSERVACAO"
  ]);

  if (colId < 0) {
    throw new Error("Não foi encontrada a coluna ID_EVENTO na aba EVENTOS.");
  }

  const idProcurado = String(dados.idEvento).trim();

  for (let i = 1; i < valores.length; i++) {
    if (String(valores[i][colId]).trim() === idProcurado) {
      const linha = i + 1;
      const status = dados.resultado || "CONTATO REALIZADO";

      if (colStatus >= 0) {
        sh.getRange(linha, colStatus + 1).setValue(status);
      }

      if (colUltimoContato >= 0) {
        sh.getRange(linha, colUltimoContato + 1).setValue(new Date());
      }

      if (colResultado >= 0) {
        sh.getRange(linha, colResultado + 1).setValue(status);
      }

      if (colProximaAcao >= 0) {
        sh.getRange(linha, colProximaAcao + 1)
          .setValue(dados.proximaAcao || "");
      }

      if (colDataAcao >= 0) {
        sh.getRange(linha, colDataAcao + 1)
          .setValue(dados.dataRetorno || "");
      }

      if (colObs >= 0) {
        sh.getRange(linha, colObs + 1)
          .setValue(dados.observacao || "");
      }

      return true;
    }
  }

  return false;
}


/*************************************************
 * AGENDA
 *************************************************/
function listarAgenda_() {
  return listarAba_(ABA_AGENDA);
}

function salvarAgenda_(dados) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ABA_AGENDA);

  if (!sh) {
    return json_({ ok: false, message: "A aba AGENDA não foi encontrada." });
  }

  sh.appendRow([
    gerarId_("AG"),
    dados.data || "",
    dados.horaInicio || "",
    dados.horaFim || "",
    dados.titulo || "",
    dados.descricao || "",
    dados.responsavel || "",
    dados.visivelPara || "TODOS",
    dados.status || "PENDENTE",
    dados.observacoes || ""
  ]);

  SpreadsheetApp.flush();
  return json_({ ok: true, message: "Compromisso salvo." });
}


/*************************************************
 * TAREFAS
 *************************************************/
function listarTarefas_() {
  return listarAba_(ABA_TAREFAS);
}

function salvarTarefa_(dados) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ABA_TAREFAS);

  if (!sh) {
    return json_({ ok: false, message: "A aba TAREFAS não foi encontrada." });
  }

  sh.appendRow([
    gerarId_("TR"),
    new Date(),
    dados.tarefa || "",
    dados.responsavel || "",
    dados.prioridade || "MEDIA",
    dados.prazo || "",
    "PENDENTE",
    dados.observacoes || ""
  ]);

  SpreadsheetApp.flush();
  return json_({ ok: true, message: "Tarefa salva." });
}


/*************************************************
 * LISTAR ABA GENÉRICA
 *************************************************/
function listarAba_(nomeAba) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(nomeAba);

  if (!sh) {
    return json_({
      ok: false,
      message: "A aba " + nomeAba + " não foi encontrada."
    });
  }

  const valores = sh.getDataRange().getValues();
  if (!valores.length) return json_({ ok: true, dados: [] });

  const cabecalho = valores[0];
  const dados = [];

  for (let i = 1; i < valores.length; i++) {
    const linha = valores[i];
    if (!linha.some(function(valor) { return valor !== ""; })) continue;

    const obj = {};
    cabecalho.forEach(function(coluna, index) {
      obj[coluna] = linha[index];
    });
    dados.push(obj);
  }

  return json_({ ok: true, dados: dados });
}


/*************************************************
 * GERAR ID
 *************************************************/
function gerarId_(prefixo) {
  return prefixo + "-" +
    Utilities.formatDate(
      new Date(),
      Session.getScriptTimeZone(),
      "yyyyMMddHHmmss"
    ) +
    "-" +
    Math.floor(Math.random() * 1000);
}
