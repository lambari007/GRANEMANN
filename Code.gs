const ABA_USUARIOS = 'USUARIOS';
const ABA_RODEIOS = 'RODEIOS';
const ABA_CONTRATOS = 'CONTRATOS';
const ABA_FINANCEIRO = 'FINANCEIRO';
const ABA_RECEBIMENTOS = 'RECEBIMENTOS';
const ABA_COMISSOES = 'COMISSOES';
const ID_PLANILHA = '1qlcBUZV9zBK8e1OvcxG8N7y-PVL7FwiPPML3T84liCc';


// =====================================================
// API PRINCIPAL
// =====================================================

function doGet(e) {

  const params = e && e.parameter ? e.parameter : {};
  const acao = String(params.acao || '').toLowerCase();

  if (acao === 'login') {
    return respostaJSONP(fazerLoginAPI(params), params.callback);
  }

  if (acao === 'listarrodeios') {
    return respostaJSONP(listarRodeios(), params.callback);
  }

  if (acao === 'cadastrarrodeio') {

    const dados = {
      nomeEvento: params.nomeEvento || '',
      organizador: params.organizador || '',
      cidade: params.cidade || '',
      estado: params.estado || '',
      dataInicio: params.dataInicio || '',
      dataFim: params.dataFim || '',
      telefone: params.telefone || '',
      fotoProgramacao: params.fotoProgramacao || '',
      status: params.status || '',
      tipoDocumentoEvento: params.tipoDocumentoEvento || '',
      cpfCnpjEvento: params.cpfCnpjEvento || '',
      enderecoEvento: params.enderecoEvento || '',
      nomeDocumentoEvento: params.nomeDocumentoEvento || ''
    };

    return respostaJSONP(cadastrarRodeio(dados), params.callback);
  }

  if (acao === 'editarrodeio') {

    const dados = {
      id: params.id || '',
      nomeEvento: params.nomeEvento || '',
      organizador: params.organizador || '',
      cidade: params.cidade || '',
      estado: params.estado || '',
      dataInicio: params.dataInicio || '',
      dataFim: params.dataFim || '',
      telefone: params.telefone || '',
      fotoProgramacao: params.fotoProgramacao || '',
      status: params.status || '',
      tipoDocumentoEvento: params.tipoDocumentoEvento || '',
      cpfCnpjEvento: params.cpfCnpjEvento || '',
      enderecoEvento: params.enderecoEvento || '',
      nomeDocumentoEvento: params.nomeDocumentoEvento || ''
    };

    return respostaJSONP(editarRodeio(dados), params.callback);
  }

  // ALTERAR SOMENTE O STATUS
  if (acao === 'alterarstatusrodeio') {

    return respostaJSONP(
      alterarStatusRodeio(
        params.id,
        params.status
      ),
      params.callback
    );
  }

  if (acao === 'excluirrodeio') {
    return respostaJSONP(
      excluirRodeio(params.id),
      params.callback
    );
  }

  // =====================================================
  // CONTRATOS
  // =====================================================

  if (acao === 'listarcontratos') {
    return respostaJSONP(listarContratos(), params.callback);
  }

  if (acao === 'listarcontratospendentes') {
    return respostaJSONP(listarContratosPendentes(), params.callback);
  }

  if (acao === 'cadastrarcontrato') {
    const dados = {
      idRodeio: params.idRodeio || '',
      cliente: params.cliente || '',
      cpfCnpj: params.cpfCnpj || '',
      responsavel: params.responsavel || '',
      telefone: params.telefone || '',
      email: params.email || '',
      endereco: params.endereco || '',
      cep: params.cep || '',
      cidade: params.cidade || '',
      estado: params.estado || '',
      nomeRodeio: params.nomeRodeio || '',
      dataInicio: params.dataInicio || '',
      dataFim: params.dataFim || '',
      localEvento: params.localEvento || '',
      sistemaMdl: params.sistemaMdl || '',
      secretaria: params.secretaria || '',
      julgamento: params.julgamento || '',
      equipamentos: params.equipamentos || '',
      outros: params.outros || '',
      onlineTipo: params.onlineTipo || '',
      onlinePercentual: params.onlinePercentual || '',
      onlineFixo: params.onlineFixo || '',
      valorTotal: params.valorTotal || '',
      valorRecebido: params.valorRecebido || '',
      formaPagamento: params.formaPagamento || '',
      vencimento: params.vencimento || '',
      juiz: params.juiz || '',
      narrador: params.narrador || '',
      secretariaResponsavel: params.secretariaResponsavel || '',
      responsavelMdl: params.responsavelMdl || '',
      observacoes: params.observacoes || '',
      statusContrato: params.statusContrato || 'Em negociação'
    };

    return respostaJSONP(cadastrarContrato(dados), params.callback);
  }

  if (acao === 'listarcomissoes') return respostaJSONP(listarComissoes(), params.callback);

  if (acao === 'cadastrarcomissao') {
    return respostaJSONP(cadastrarComissao({id:params.id||'',idRodeio:params.idRodeio||'',parceiro:params.parceiro||'',valor:params.valor||'',observacoes:params.observacoes||''}), params.callback);
  }

  if (acao === 'excluircomissao') return respostaJSONP(excluirComissao(params.id), params.callback);

  if (acao === 'listarfinanceiro') {
    return respostaJSONP(listarFinanceiro(), params.callback);
  }

  if (acao === 'listarrecebimentos') {
    return respostaJSONP(listarRecebimentos(params.idFinanceiro), params.callback);
  }

  if (acao === 'cadastrarrecebimento') {
    const dados = {
      idFinanceiro: params.idFinanceiro || '',
      valor: params.valor || '',
      data: params.data || '',
      pagador: params.pagador || '',
      formaPagamento: params.formaPagamento || '',
      observacoes: params.observacoes || ''
    };
    return respostaJSONP(cadastrarRecebimento(dados), params.callback);
  }

  if (acao === 'excluirrecebimento') {
    return respostaJSONP(excluirRecebimento(params.id), params.callback);
  }

  if (acao === 'editarcontrato') {
    const dados = {
      id: params.id || '',
      idRodeio: params.idRodeio || '',
      cliente: params.cliente || '',
      cpfCnpj: params.cpfCnpj || '',
      responsavel: params.responsavel || '',
      telefone: params.telefone || '',
      email: params.email || '',
      endereco: params.endereco || '',
      cep: params.cep || '',
      cidade: params.cidade || '',
      estado: params.estado || '',
      nomeRodeio: params.nomeRodeio || '',
      dataInicio: params.dataInicio || '',
      dataFim: params.dataFim || '',
      localEvento: params.localEvento || '',
      sistemaMdl: params.sistemaMdl || '',
      secretaria: params.secretaria || '',
      julgamento: params.julgamento || '',
      equipamentos: params.equipamentos || '',
      outros: params.outros || '',
      onlineTipo: params.onlineTipo || '',
      onlinePercentual: params.onlinePercentual || '',
      onlineFixo: params.onlineFixo || '',
      valorTotal: params.valorTotal || '',
      valorRecebido: params.valorRecebido || '',
      formaPagamento: params.formaPagamento || '',
      vencimento: params.vencimento || '',
      juiz: params.juiz || '',
      narrador: params.narrador || '',
      secretariaResponsavel: params.secretariaResponsavel || '',
      responsavelMdl: params.responsavelMdl || '',
      observacoes: params.observacoes || '',
      statusContrato: params.statusContrato || 'Em negociação'
    };

    return respostaJSONP(editarContrato(dados), params.callback);
  }

  return respostaJSONP(
    {
      sucesso: true,
      sistema: 'Secretaria Granemann',
      status: 'online'
    },
    params.callback
  );
}


// =====================================================
// LOGIN
// =====================================================

function fazerLoginAPI(params) {

  const usuario = String(params.usuario || '')
    .trim()
    .toUpperCase();

  const senha = String(params.senha || '');

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

    const usuarioPlanilha =
      String(dados[i][1] || '')
        .trim()
        .toUpperCase();

    const nome =
      String(dados[i][2] || '').trim();

    const senhaPlanilha =
      String(dados[i][3] || '');

    const nivel =
      String(dados[i][4] || '')
        .trim()
        .toUpperCase();

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


// =====================================================
// GARANTIR COLUNA STATUS
// =====================================================

function garantirColunaStatus() {

  const planilha = SpreadsheetApp.openById(ID_PLANILHA);
  const aba = planilha.getSheetByName(ABA_RODEIOS);

  if (!aba) return null;

  // Estrutura oficial da aba RODEIOS.
  // As 4 últimas colunas guardam os dados do cliente informados
  // no fechamento e são usados automaticamente na aba Contratos.
  const cabecalhos = [
    'ID','NOME_EVENTO','ORGANIZADOR','CIDADE','ESTADO','DATA_INICIO','DATA_FIM',
    'TELEFONE','FOTO_PROGRAMACAO','DATA_CADASTRO','USUARIO_CADASTRO','STATUS',
    'TIPO_DOCUMENTO_EVENTO','CPF_CNPJ_EVENTO','ENDERECO_EVENTO','NOME_DOCUMENTO_EVENTO'
  ];

  if (aba.getMaxColumns() < cabecalhos.length) {
    aba.insertColumnsAfter(aba.getMaxColumns(), cabecalhos.length - aba.getMaxColumns());
  }

  const cab = aba.getRange(1, 1, 1, cabecalhos.length).getValues()[0];
  for (let i = 0; i < cabecalhos.length; i++) {
    if (String(cab[i] || '').trim() !== cabecalhos[i]) {
      aba.getRange(1, i + 1).setValue(cabecalhos[i]);
    }
  }
  aba.setFrozenRows(1);

  return aba;
}

// =====================================================
// NORMALIZAR STATUS
// =====================================================

function normalizarStatus(status) {

  const valor =
    String(status == null ? '' : status)
      .trim()
      .toLowerCase();

  if (!valor) {
    return '';
  }

  if (valor === 'contatado') {
    return 'Contatado';
  }

  if (valor === 'fechado') {
    return 'Fechado';
  }

  if (
    valor === 'sem interesse' ||
    valor === 'sem_interesse'
  ) {
    return 'Sem interesse';
  }

  return '';
}


// =====================================================
// LISTAR RODEIOS
// =====================================================

function listarRodeios() {

  try {

    const aba = garantirColunaStatus();

    if (!aba) {
      return {
        sucesso: false,
        mensagem: 'A aba RODEIOS não foi encontrada.',
        dados: []
      };
    }

    const valores = aba.getDataRange().getValues();

    if (valores.length <= 1) {
      return {
        sucesso: true,
        dados: []
      };
    }

    const resultado = [];

    for (let i = 1; i < valores.length; i++) {

      if (!valores[i][0]) continue;

      resultado.push({
        id: valores[i][0],
        nomeEvento: valores[i][1] || '',
        organizador: valores[i][2] || '',
        cidade: valores[i][3] || '',
        estado: valores[i][4] || '',
        dataInicio: formatarData(valores[i][5]),
        dataFim: formatarData(valores[i][6]),
        telefone: valores[i][7] || '',
        fotoProgramacao: valores[i][8] || '',
        dataCadastro: formatarDataHora(valores[i][9]),
        usuarioCadastro: valores[i][10] || '',
        status: normalizarStatus(valores[i][11]),
        tipoDocumentoEvento: valores[i][12] || '',
        cpfCnpjEvento: valores[i][13] || '',
        enderecoEvento: valores[i][14] || '',
        nomeDocumentoEvento: valores[i][15] || ''
      });
    }

    return {
      sucesso: true,
      dados: resultado
    };

  } catch (erro) {

    return {
      sucesso: false,
      mensagem: 'Erro ao listar rodeios: ' + erro.message,
      dados: []
    };
  }
}


// =====================================================
// CADASTRAR RODEIO
// =====================================================

function cadastrarRodeio(dados) {

  try {

    const aba = garantirColunaStatus();

    if (!aba) {
      return {
        sucesso: false,
        mensagem: 'A aba RODEIOS não foi encontrada.'
      };
    }

    const nomeEvento =
      String(dados.nomeEvento || '').trim();

    const organizador =
      String(dados.organizador || '').trim();

    const cidade =
      String(dados.cidade || '').trim();

    const estado =
      String(dados.estado || '')
        .trim()
        .toUpperCase();

    const dataInicio =
      String(dados.dataInicio || '').trim();

    const dataFim =
      String(dados.dataFim || '').trim();

    const telefone =
      String(dados.telefone || '').trim();

    const fotoProgramacao =
      String(dados.fotoProgramacao || '').trim();

    const status =
      normalizarStatus(dados.status);

    if (!nomeEvento) {
      return {
        sucesso: false,
        mensagem: 'Informe o nome do evento.'
      };
    }

    if (!organizador) {
      return {
        sucesso: false,
        mensagem: 'Informe o organizador.'
      };
    }

    if (!cidade) {
      return {
        sucesso: false,
        mensagem: 'Informe a cidade.'
      };
    }

    if (!estado) {
      return {
        sucesso: false,
        mensagem: 'Informe o estado.'
      };
    }

    if (!dataInicio) {
      return {
        sucesso: false,
        mensagem: 'Informe a data de início.'
      };
    }

    if (!dataFim) {
      return {
        sucesso: false,
        mensagem: 'Informe a data de fim.'
      };
    }

    let novoID = 1;
    const ultimaLinha = aba.getLastRow();

    if (ultimaLinha >= 2) {

      const ids =
        aba.getRange(
          2,
          1,
          ultimaLinha - 1,
          1
        )
        .getValues()
        .flat()
        .filter(function(valor) {
          return valor !== '';
        })
        .map(function(valor) {
          return Number(valor);
        })
        .filter(function(valor) {
          return !isNaN(valor);
        });

      if (ids.length > 0) {
        novoID =
          Math.max.apply(null, ids) + 1;
      }
    }

    const usuario =
      Session.getActiveUser().getEmail() ||
      'SISTEMA';

    const agora = new Date();

    aba.appendRow([
      novoID,
      nomeEvento,
      organizador,
      cidade,
      estado,
      converterData(dataInicio),
      converterData(dataFim),
      telefone,
      fotoProgramacao,
      agora,
      usuario,
      status,
      String(dados.tipoDocumentoEvento || '').trim().toUpperCase(),
      String(dados.cpfCnpjEvento || '').trim(),
      String(dados.enderecoEvento || '').trim(),
      String(dados.nomeDocumentoEvento || '').trim()
    ]);

    return {
      sucesso: true,
      mensagem: 'Rodeio cadastrado com sucesso.',
      id: novoID,
      status: status
    };

  } catch (erro) {

    return {
      sucesso: false,
      mensagem:
        'Erro ao cadastrar rodeio: ' +
        erro.message
    };
  }
}


// =====================================================
// EDITAR RODEIO
// =====================================================

function editarRodeio(dados) {

  try {

    const aba = garantirColunaStatus();

    if (!aba) {
      return {
        sucesso: false,
        mensagem: 'A aba RODEIOS não foi encontrada.'
      };
    }

    const id = Number(dados.id);

    if (!id) {
      return {
        sucesso: false,
        mensagem: 'ID do rodeio não informado.'
      };
    }

    const valores = aba.getDataRange().getValues();

    for (let i = 1; i < valores.length; i++) {

      if (Number(valores[i][0]) === id) {

        const linha = i + 1;

        const fotoAtual =
          valores[i][8] || '';

        const novaFoto =
          String(
            dados.fotoProgramacao || ''
          ).trim();

        const fotoFinal =
          novaFoto || fotoAtual;

        const statusAtual =
          normalizarStatus(
            valores[i][11]
          );

        const novoStatus =
          dados.status
            ? normalizarStatus(dados.status)
            : statusAtual;

        aba.getRange(
          linha,
          2,
          1,
          15
        ).setValues([[
          String(dados.nomeEvento || '').trim(),
          String(dados.organizador || '').trim(),
          String(dados.cidade || '').trim(),
          String(dados.estado || '').trim().toUpperCase(),
          converterData(dados.dataInicio),
          converterData(dados.dataFim),
          String(dados.telefone || '').trim(),
          fotoFinal,
          valores[i][9] || new Date(),
          valores[i][10] || 'SISTEMA',
          novoStatus,
          String(dados.tipoDocumentoEvento || valores[i][12] || '').trim().toUpperCase(),
          String(dados.cpfCnpjEvento || valores[i][13] || '').trim(),
          String(dados.enderecoEvento || valores[i][14] || '').trim(),
          String(dados.nomeDocumentoEvento || valores[i][15] || '').trim()
        ]]);

        return {
          sucesso: true,
          mensagem: 'Rodeio atualizado com sucesso.',
          status: novoStatus
        };
      }
    }

    return {
      sucesso: false,
      mensagem: 'Rodeio não encontrado.'
    };

  } catch (erro) {

    return {
      sucesso: false,
      mensagem:
        'Erro ao editar rodeio: ' +
        erro.message
    };
  }
}


// =====================================================
// ALTERAR SOMENTE O STATUS
// =====================================================

function alterarStatusRodeio(id, status) {

  try {

    const aba = garantirColunaStatus();

    if (!aba) {
      return {
        sucesso: false,
        mensagem: 'A aba RODEIOS não foi encontrada.'
      };
    }

    const numeroID = Number(id);

    if (!numeroID) {
      return {
        sucesso: false,
        mensagem: 'ID do rodeio não informado.'
      };
    }

    const novoStatus =
      normalizarStatus(status);

    const valores =
      aba.getDataRange().getValues();

    for (let i = 1; i < valores.length; i++) {

      if (Number(valores[i][0]) === numeroID) {

        // Coluna L = STATUS
        aba.getRange(i + 1, 12)
          .setValue(novoStatus);

        return {
          sucesso: true,
          mensagem: 'Status alterado com sucesso.',
          id: numeroID,
          status: novoStatus
        };
      }
    }

    return {
      sucesso: false,
      mensagem: 'Rodeio não encontrado.'
    };

  } catch (erro) {

    return {
      sucesso: false,
      mensagem:
        'Erro ao alterar status: ' +
        erro.message
    };
  }
}


// =====================================================
// EXCLUIR RODEIO
// =====================================================

function excluirRodeio(id) {

  try {

    const aba = garantirColunaStatus();

    if (!aba) {
      return {
        sucesso: false,
        mensagem: 'A aba RODEIOS não foi encontrada.'
      };
    }

    id = Number(id);

    const valores =
      aba.getDataRange().getValues();

    for (let i = 1; i < valores.length; i++) {

      if (Number(valores[i][0]) === id) {

        aba.deleteRow(i + 1);

        return {
          sucesso: true,
          mensagem: 'Rodeio excluído com sucesso.'
        };
      }
    }

    return {
      sucesso: false,
      mensagem: 'Rodeio não encontrado.'
    };

  } catch (erro) {

    return {
      sucesso: false,
      mensagem:
        'Erro ao excluir rodeio: ' +
        erro.message
    };
  }
}



// =====================================================
// CONTRATOS - BANCO DE DADOS
// =====================================================

const CABECALHO_CONTRATOS = [
  'ID','ID_RODEIO','CLIENTE','CPF_CNPJ','RESPONSAVEL','TELEFONE','EMAIL',
  'ENDERECO','CEP','CIDADE','ESTADO','NOME_RODEIO','DATA_INICIO','DATA_FIM',
  'LOCAL_EVENTO','SISTEMA_MDL','SECRETARIA','JULGAMENTO','EQUIPAMENTOS','OUTROS',
  'ONLINE_TIPO','ONLINE_PERCENTUAL','ONLINE_FIXO','VALOR_TOTAL','VALOR_RECEBIDO',
  'FORMA_PAGAMENTO','VENCIMENTO','JUIZ','NARRADOR','SECRETARIA_RESPONSAVEL',
  'RESPONSAVEL_MDL','OBSERVACOES','STATUS_CONTRATO','DATA_CADASTRO','USUARIO_CADASTRO'
];

function obterAbaContratos_() {
  const planilha = SpreadsheetApp.openById(ID_PLANILHA);
  let aba = planilha.getSheetByName(ABA_CONTRATOS);
  if (!aba) aba = planilha.insertSheet(ABA_CONTRATOS);

  if (aba.getMaxColumns() < CABECALHO_CONTRATOS.length) {
    aba.insertColumnsAfter(
      aba.getMaxColumns(),
      CABECALHO_CONTRATOS.length - aba.getMaxColumns()
    );
  }

  const cab = aba.getRange(1, 1, 1, CABECALHO_CONTRATOS.length).getValues()[0];
  let precisa = false;
  for (let i = 0; i < CABECALHO_CONTRATOS.length; i++) {
    if (String(cab[i] || '').trim() !== CABECALHO_CONTRATOS[i]) {
      precisa = true;
      break;
    }
  }
  if (precisa) {
    aba.getRange(1, 1, 1, CABECALHO_CONTRATOS.length).setValues([CABECALHO_CONTRATOS]);
    aba.setFrozenRows(1);
  }
  return aba;
}

function proximoIdContrato_() {
  const aba = obterAbaContratos_();
  const ultima = aba.getLastRow();
  if (ultima < 2) return 1;
  const ids = aba.getRange(2, 1, ultima - 1, 1).getValues().flat()
    .map(v => Number(v)).filter(v => !isNaN(v) && v > 0);
  return ids.length ? Math.max.apply(null, ids) + 1 : 1;
}

function valorTexto_(v) {
  return String(v == null ? '' : v).trim();
}

function listarContratos() {
  try {
    const aba = obterAbaContratos_();
    const valores = aba.getDataRange().getValues();
    if (valores.length <= 1) return { sucesso: true, dados: [] };

    const resultado = [];
    for (let i = 1; i < valores.length; i++) {
      if (!valores[i][0]) continue;
      resultado.push({
        id: valores[i][0],
        idRodeio: valores[i][1] || '',
        cliente: valores[i][2] || '',
        cpfCnpj: valores[i][3] || '',
        responsavel: valores[i][4] || '',
        telefone: valores[i][5] || '',
        email: valores[i][6] || '',
        endereco: valores[i][7] || '',
        cep: valores[i][8] || '',
        cidade: valores[i][9] || '',
        estado: valores[i][10] || '',
        nomeRodeio: valores[i][11] || '',
        dataInicio: formatarData(valores[i][12]),
        dataFim: formatarData(valores[i][13]),
        localEvento: valores[i][14] || '',
        sistemaMdl: valores[i][15] || '',
        secretaria: valores[i][16] || '',
        julgamento: valores[i][17] || '',
        equipamentos: valores[i][18] || '',
        outros: valores[i][19] || '',
        onlineTipo: valores[i][20] || '',
        onlinePercentual: valores[i][21] || '',
        onlineFixo: valores[i][22] || '',
        valorTotal: valores[i][23] || '',
        valorRecebido: valores[i][24] || '',
        formaPagamento: valores[i][25] || '',
        vencimento: formatarData(valores[i][26]),
        juiz: valores[i][27] || '',
        narrador: valores[i][28] || '',
        secretariaResponsavel: valores[i][29] || '',
        responsavelMdl: valores[i][30] || '',
        observacoes: valores[i][31] || '',
        statusContrato: valores[i][32] || ''
      });
    }
    return { sucesso: true, dados: resultado };
  } catch (erro) {
    return { sucesso: false, mensagem: 'Erro ao listar contratos: ' + erro.message, dados: [] };
  }
}

function listarContratosPendentes() {
  try {
    const rodeios = listarRodeios();
    const contratos = listarContratos();

    if (!rodeios.sucesso) {
      return { sucesso: false, mensagem: rodeios.mensagem || 'Erro ao listar rodeios.', dados: [] };
    }
    if (!contratos.sucesso) {
      return { sucesso: false, mensagem: contratos.mensagem || 'Erro ao listar contratos.', dados: [] };
    }

    const idsComContrato = new Set(
      (contratos.dados || [])
        .map(c => String(c.idRodeio || '').trim())
        .filter(Boolean)
    );

    const dados = (rodeios.dados || []).filter(r => {
      const status = String(r.status || '').trim().toLowerCase();
      return status === 'fechado' && !idsComContrato.has(String(r.id || '').trim());
    });

    return { sucesso: true, dados: dados };
  } catch (erro) {
    return { sucesso: false, mensagem: 'Erro ao listar contratos pendentes: ' + erro.message, dados: [] };
  }
}

function validarContrato_(dados) {
  if (!valorTexto_(dados.cliente)) return 'Informe o cliente.';
  if (!valorTexto_(dados.nomeRodeio)) return 'Informe o nome do rodeio.';
  if (!valorTexto_(dados.dataInicio)) return 'Informe a data de início.';
  if (!valorTexto_(dados.dataFim)) return 'Informe a data de fim.';
  return '';
}

function montarLinhaContrato_(dados, id, existente) {
  const usuario = Session.getActiveUser().getEmail() || 'SISTEMA';
  const agora = existente || new Date();
  return [
    id,
    valorTexto_(dados.idRodeio),
    valorTexto_(dados.cliente),
    valorTexto_(dados.cpfCnpj),
    valorTexto_(dados.responsavel),
    valorTexto_(dados.telefone),
    valorTexto_(dados.email),
    valorTexto_(dados.endereco),
    valorTexto_(dados.cep),
    valorTexto_(dados.cidade),
    valorTexto_(dados.estado).toUpperCase(),
    valorTexto_(dados.nomeRodeio),
    converterData(valorTexto_(dados.dataInicio)),
    converterData(valorTexto_(dados.dataFim)),
    valorTexto_(dados.localEvento),
    valorTexto_(dados.sistemaMdl),
    valorTexto_(dados.secretaria),
    valorTexto_(dados.julgamento),
    valorTexto_(dados.equipamentos),
    valorTexto_(dados.outros),
    valorTexto_(dados.onlineTipo),
    valorTexto_(dados.onlinePercentual),
    valorTexto_(dados.onlineFixo),
    valorTexto_(dados.valorTotal),
    valorTexto_(dados.valorRecebido),
    valorTexto_(dados.formaPagamento),
    converterData(valorTexto_(dados.vencimento)),
    valorTexto_(dados.juiz),
    valorTexto_(dados.narrador),
    valorTexto_(dados.secretariaResponsavel),
    valorTexto_(dados.responsavelMdl),
    valorTexto_(dados.observacoes),
    valorTexto_(dados.statusContrato) || 'Em negociação',
    agora,
    usuario
  ];
}

function cadastrarContrato(dados) {
  try {
    const erro = validarContrato_(dados);
    if (erro) return { sucesso: false, mensagem: erro };

    const aba = obterAbaContratos_();
    const id = proximoIdContrato_();
    aba.appendRow(montarLinhaContrato_(dados, id, null));
    sincronizarFaturamentoContrato_(dados, id);
    return { sucesso: true, mensagem: 'Contrato salvo com sucesso.', id: id };
  } catch (erro) {
    return { sucesso: false, mensagem: 'Erro ao cadastrar contrato: ' + erro.message };
  }
}

function editarContrato(dados) {
  try {
    const erro = validarContrato_(dados);
    if (erro) return { sucesso: false, mensagem: erro };

    const id = Number(dados.id);
    if (!id) return { sucesso: false, mensagem: 'ID do contrato não informado.' };

    const aba = obterAbaContratos_();
    const valores = aba.getDataRange().getValues();

    for (let i = 1; i < valores.length; i++) {
      if (Number(valores[i][0]) === id) {
        const linha = i + 1;
        const dataCadastro = valores[i][33] || new Date();
        const usuarioCadastro = valores[i][34] || 'SISTEMA';
        const novaLinha = montarLinhaContrato_(dados, id, dataCadastro);
        novaLinha[33] = dataCadastro;
        novaLinha[34] = usuarioCadastro;
        aba.getRange(linha, 1, 1, CABECALHO_CONTRATOS.length).setValues([novaLinha]);
        sincronizarFaturamentoContrato_(dados, id);
        return { sucesso: true, mensagem: 'Contrato atualizado com sucesso.' };
      }
    }
    return { sucesso: false, mensagem: 'Contrato não encontrado.' };
  } catch (erro) {
    return { sucesso: false, mensagem: 'Erro ao editar contrato: ' + erro.message };
  }
}

// =====================================================
// COMISSÕES
// =====================================================
const CABECALHO_COMISSOES=['ID','ID_RODEIO','RODEIO','PARCEIRO','VALOR_COMISSAO','OBSERVACOES','DATA_CADASTRO','USUARIO_CADASTRO'];
function obterAbaComissoes_(){
  const p=SpreadsheetApp.openById(ID_PLANILHA); let a=p.getSheetByName(ABA_COMISSOES); if(!a)a=p.insertSheet(ABA_COMISSOES);
  if(a.getMaxColumns()<CABECALHO_COMISSOES.length)a.insertColumnsAfter(a.getMaxColumns(),CABECALHO_COMISSOES.length-a.getMaxColumns());
  const c=a.getRange(1,1,1,CABECALHO_COMISSOES.length).getValues()[0]; let ok=true; for(let i=0;i<c.length;i++)if(String(c[i]||'').trim()!==CABECALHO_COMISSOES[i]){ok=false;break;}
  if(!ok)a.getRange(1,1,1,CABECALHO_COMISSOES.length).setValues([CABECALHO_COMISSOES]); a.setFrozenRows(1); return a;
}
function listarComissoes(){try{const a=obterAbaComissoes_(),v=a.getDataRange().getValues(),rs=listarRodeios().dados||[],map={};rs.forEach(r=>map[String(r.id)]=r);const d=[];for(let i=1;i<v.length;i++){if(!v[i][0])continue;const r=map[String(v[i][1])]||{};d.push({id:v[i][0],idRodeio:v[i][1]||'',nomeRodeio:v[i][2]||r.nomeEvento||'',parceiro:v[i][3]||'',valor:numeroFinanceiro_(v[i][4]),observacoes:v[i][5]||'',dataCadastro:formatarDataHora(v[i][6])});}return{sucesso:true,dados:d};}catch(e){return{sucesso:false,mensagem:'Erro ao listar comissões: '+e.message,dados:[]};}}
function cadastrarComissao(d){try{const idR=String(d.idRodeio||'').trim(),par=valorTexto_(d.parceiro),val=numeroFinanceiro_(d.valor);if(!idR)return{sucesso:false,mensagem:'Selecione o rodeio.'};if(!par)return{sucesso:false,mensagem:'Informe o parceiro.'};if(val<0)return{sucesso:false,mensagem:'A comissão não pode ser negativa.'};const a=obterAbaComissoes_(),v=a.getDataRange().getValues();let linha=-1,id='';for(let i=1;i<v.length;i++)if(String(v[i][1])===idR){linha=i+1;id=v[i][0];break;}const r=(listarRodeios().dados||[]).find(x=>String(x.id)===idR);if(!r)return{sucesso:false,mensagem:'Rodeio não encontrado.'};const ld=[id||proximoIdGenerico_(a),idR,r.nomeEvento||'',par,val,valorTexto_(d.observacoes),new Date(),Session.getActiveUser().getEmail()||'SISTEMA'];if(linha<0)a.appendRow(ld);else a.getRange(linha,1,1,CABECALHO_COMISSOES.length).setValues([ld]);sincronizarTodosFinanceirosComissoes_();return{sucesso:true,mensagem:'Comissão salva com sucesso.',id:ld[0]};}catch(e){return{sucesso:false,mensagem:'Erro ao salvar comissão: '+e.message};}}
function excluirComissao(id){try{const a=obterAbaComissoes_(),v=a.getDataRange().getValues();for(let i=1;i<v.length;i++)if(String(v[i][0])===String(id)){const r=v[i][1];a.deleteRow(i+1);sincronizarFinanceiroPorRodeio_(r);return{sucesso:true,mensagem:'Comissão excluída com sucesso.'};}return{sucesso:false,mensagem:'Comissão não encontrada.'};}catch(e){return{sucesso:false,mensagem:'Erro ao excluir comissão: '+e.message};}}
function obterComissaoPorRodeio_(idR){const a=obterAbaComissoes_(),v=a.getDataRange().getValues();for(let i=1;i<v.length;i++)if(String(v[i][1])===String(idR))return numeroFinanceiro_(v[i][4]);return 0;}
function sincronizarFinanceiroPorRodeio_(idR){const a=obterAbaFinanceiro_(),v=a.getDataRange().getValues();for(let i=1;i<v.length;i++)if(String(v[i][2])===String(idR)){recalcularFinanceiro_(v[i][0]);break;}}
function sincronizarTodosFinanceirosComissoes_(){const a=obterAbaFinanceiro_(),v=a.getDataRange().getValues();for(let i=1;i<v.length;i++)if(v[i][0])recalcularFinanceiro_(v[i][0]);}

// FINANCEIRO
// =====================================================

const CABECALHO_FINANCEIRO = [
  'ID','ID_CONTRATO','ID_RODEIO','CLIENTE','NOME_RODEIO','FATURAMENTO',
  'COMISSAO','FATURAMENTO_LIQUIDO','RECEBIDO','SALDO','STATUS_FINANCEIRO','VENCIMENTO','DATA_CADASTRO','USUARIO_CADASTRO'
];

const CABECALHO_RECEBIMENTOS = [
  'ID','ID_FINANCEIRO','ID_CONTRATO','VALOR','DATA_RECEBIMENTO','PAGADOR',
  'FORMA_PAGAMENTO','OBSERVACOES','DATA_CADASTRO','USUARIO_CADASTRO'
];

function obterAbaFinanceiro_() {
  const planilha = SpreadsheetApp.openById(ID_PLANILHA);
  let aba = planilha.getSheetByName(ABA_FINANCEIRO);
  if (!aba) aba = planilha.insertSheet(ABA_FINANCEIRO);

  // Migração da estrutura antiga (12 colunas) para a nova (14 colunas).
  // As duas colunas novas entram depois de FATURAMENTO, preservando
  // RECEBIDO, SALDO, STATUS e VENCIMENTO dos lançamentos existentes.
  const cabAntigo = ['ID','ID_CONTRATO','ID_RODEIO','CLIENTE','NOME_RODEIO','FATURAMENTO','RECEBIDO','SALDO','STATUS_FINANCEIRO','VENCIMENTO','DATA_CADASTRO','USUARIO_CADASTRO'];
  if (aba.getMaxColumns() >= cabAntigo.length) {
    const atual = aba.getRange(1,1,1,cabAntigo.length).getValues()[0].map(v=>String(v||'').trim());
    if (atual.join('|') === cabAntigo.join('|')) {
      aba.insertColumnsAfter(6,2);
    }
  }
  if (aba.getMaxColumns() < CABECALHO_FINANCEIRO.length) {
    aba.insertColumnsAfter(aba.getMaxColumns(), CABECALHO_FINANCEIRO.length - aba.getMaxColumns());
  }
  aba.getRange(1,1,1,CABECALHO_FINANCEIRO.length).setValues([CABECALHO_FINANCEIRO]);
  aba.setFrozenRows(1);
  return aba;
}

function obterAbaRecebimentos_() {
  const planilha = SpreadsheetApp.openById(ID_PLANILHA);
  let aba = planilha.getSheetByName(ABA_RECEBIMENTOS);
  if (!aba) aba = planilha.insertSheet(ABA_RECEBIMENTOS);
  if (aba.getMaxColumns() < CABECALHO_RECEBIMENTOS.length) {
    aba.insertColumnsAfter(aba.getMaxColumns(), CABECALHO_RECEBIMENTOS.length - aba.getMaxColumns());
  }
  const cab = aba.getRange(1,1,1,CABECALHO_RECEBIMENTOS.length).getValues()[0];
  let precisa = false;
  for (let i=0;i<CABECALHO_RECEBIMENTOS.length;i++) {
    if (String(cab[i] || '').trim() !== CABECALHO_RECEBIMENTOS[i]) { precisa=true; break; }
  }
  if (precisa) { aba.getRange(1,1,1,CABECALHO_RECEBIMENTOS.length).setValues([CABECALHO_RECEBIMENTOS]); aba.setFrozenRows(1); }
  return aba;
}

function proximoIdGenerico_(aba) {
  const ultima = aba.getLastRow();
  if (ultima < 2) return 1;
  const ids = aba.getRange(2,1,ultima-1,1).getValues().flat().map(v=>Number(v)).filter(v=>!isNaN(v)&&v>0);
  return ids.length ? Math.max.apply(null,ids)+1 : 1;
}

function numeroFinanceiro_(v) {
  if (typeof v === 'number') return v;
  const s = String(v == null ? '' : v).trim().replace(/R\$/gi,'').replace(/\./g,'').replace(',','.').replace(/\s/g,'');
  const n = Number(s);
  return isNaN(n) ? 0 : n;
}

function statusFinanceiro_(faturamento, recebido) {
  const f = Math.round(numeroFinanceiro_(faturamento)*100)/100;
  const r = Math.round(numeroFinanceiro_(recebido)*100)/100;
  if (r > f + 0.009) return 'Acima do faturamento';
  if (f > 0 && Math.abs(f-r) < 0.009) return 'Recebido integralmente';
  if (r > 0) return 'Recebimento parcial';
  return 'Não recebido';
}

function recalcularFinanceiro_(idFinanceiro) {
  const abaF = obterAbaFinanceiro_();
  const abaR = obterAbaRecebimentos_();
  const valores = abaF.getDataRange().getValues();
  let linha = -1;
  for (let i=1;i<valores.length;i++) if (String(valores[i][0]) === String(idFinanceiro)) { linha=i+1; break; }
  if (linha < 0) return null;
  const faturamento = numeroFinanceiro_(valores[linha-1][5]);
  const idRodeio = valores[linha-1][2];
  const comissao = obterComissaoPorRodeio_(idRodeio);
  const faturamentoLiquido = Math.max(0, Math.round((faturamento-comissao)*100)/100);
  const recs = abaR.getDataRange().getValues();
  let recebido = 0;
  for (let i=1;i<recs.length;i++) if (String(recs[i][1]) === String(idFinanceiro)) recebido += numeroFinanceiro_(recs[i][3]);
  const saldo = Math.round((faturamentoLiquido-recebido)*100)/100;
  const status = statusFinanceiro_(faturamentoLiquido, recebido);
  abaF.getRange(linha,7,1,5).setValues([[comissao,faturamentoLiquido,recebido,saldo,status]]);
  const idContrato = valores[linha-1][1];
  if (idContrato) atualizarValorRecebidoContrato_(idContrato, recebido);
  return { faturamento, comissao, faturamentoLiquido, recebido, saldo, status };
}

function atualizarValorRecebidoContrato_(idContrato, recebido) {
  const aba = obterAbaContratos_();
  const valores = aba.getDataRange().getValues();
  for (let i=1;i<valores.length;i++) {
    if (String(valores[i][0]) === String(idContrato)) {
      aba.getRange(i+1,25).setValue(recebido); // VALOR_RECEBIDO
      return;
    }
  }
}

function sincronizarFaturamentoContrato_(dados, idContrato) {
  const aba = obterAbaFinanceiro_();
  const valores = aba.getDataRange().getValues();
  let linha = -1, idFinanceiro = '';
  for (let i=1;i<valores.length;i++) {
    if (String(valores[i][1]) === String(idContrato)) { linha=i+1; idFinanceiro=valores[i][0]; break; }
  }
  const usuario = Session.getActiveUser().getEmail() || 'SISTEMA';
  const faturamento = numeroFinanceiro_(dados.valorTotal);
  if (linha < 0) {
    idFinanceiro = proximoIdGenerico_(aba);
    const comissao = obterComissaoPorRodeio_(dados.idRodeio); const liquido = Math.max(0,faturamento-comissao); aba.appendRow([idFinanceiro,idContrato,valorTexto_(dados.idRodeio),valorTexto_(dados.cliente),valorTexto_(dados.nomeRodeio),faturamento,comissao,liquido,0,liquido,'Não recebido',converterData(valorTexto_(dados.vencimento)),new Date(),usuario]);
    const legado = numeroFinanceiro_(dados.valorRecebido);
    if (legado > 0) {
      const abaR = obterAbaRecebimentos_();
      abaR.appendRow([proximoIdGenerico_(abaR),idFinanceiro,idContrato,legado,new Date(),valorTexto_(dados.cliente),valorTexto_(dados.formaPagamento),'Valor recebido informado no contrato',new Date(),usuario]);
    }
  } else {
    const comissao = obterComissaoPorRodeio_(dados.idRodeio); const liquido = Math.max(0,faturamento-comissao); aba.getRange(linha,2,1,7).setValues([[idContrato,valorTexto_(dados.idRodeio),valorTexto_(dados.cliente),valorTexto_(dados.nomeRodeio),faturamento,comissao,liquido]]);
    aba.getRange(linha,12).setValue(converterData(valorTexto_(dados.vencimento)));
  }
  recalcularFinanceiro_(idFinanceiro);
  return idFinanceiro;
}

function listarFinanceiro() {
  try {
    const contratos = listarContratos();
    if (contratos.sucesso) {
      (contratos.dados || []).forEach(function(c) {
        sincronizarFaturamentoContrato_(c, c.id);
      });
    }
    const aba = obterAbaFinanceiro_();
    const valores = aba.getDataRange().getValues();
    if (valores.length <= 1) return {sucesso:true,dados:[]};
    const resultado=[];
    for(let i=1;i<valores.length;i++){
      if(!valores[i][0]) continue;
      const f=numeroFinanceiro_(valores[i][5]), comissao=numeroFinanceiro_(valores[i][6]), liquido=numeroFinanceiro_(valores[i][7]), r=numeroFinanceiro_(valores[i][8]);
      resultado.push({id:valores[i][0],idContrato:valores[i][1],idRodeio:valores[i][2],cliente:valores[i][3]||'',nomeRodeio:valores[i][4]||'',faturamento:f,comissao:comissao,faturamentoLiquido:liquido,recebido:r,saldo:Math.round((liquido-r)*100)/100,statusFinanceiro:statusFinanceiro_(liquido,r),vencimento:formatarData(valores[i][11])});
    }
    return {sucesso:true,dados:resultado};
  } catch(e){ return {sucesso:false,mensagem:'Erro ao listar financeiro: '+e.message,dados:[]}; }
}

function listarRecebimentos(idFinanceiro) {
  try {
    const aba=obterAbaRecebimentos_(), valores=aba.getDataRange().getValues(), resultado=[];
    for(let i=1;i<valores.length;i++){
      if(!valores[i][0]) continue;
      if(idFinanceiro && String(valores[i][1])!==String(idFinanceiro)) continue;
      resultado.push({id:valores[i][0],idFinanceiro:valores[i][1],idContrato:valores[i][2],valor:numeroFinanceiro_(valores[i][3]),data:formatarData(valores[i][4]),pagador:valores[i][5]||'',formaPagamento:valores[i][6]||'',observacoes:valores[i][7]||''});
    }
    return {sucesso:true,dados:resultado};
  }catch(e){return {sucesso:false,mensagem:'Erro ao listar recebimentos: '+e.message,dados:[]};}
}

function cadastrarRecebimento(dados) {
  try {
    const idFinanceiro=String(dados.idFinanceiro||'').trim();
    const valor=numeroFinanceiro_(dados.valor);
    if(!idFinanceiro) return {sucesso:false,mensagem:'Faturamento não informado.'};
    if(valor<=0) return {sucesso:false,mensagem:'Informe um valor de recebimento maior que zero.'};
    const abaF=obterAbaFinanceiro_(), valores=abaF.getDataRange().getValues();
    let registro=null;
    for(let i=1;i<valores.length;i++) if(String(valores[i][0])===idFinanceiro){registro=valores[i];break;}
    if(!registro) return {sucesso:false,mensagem:'Faturamento não encontrado.'};
    const atual=numeroFinanceiro_(registro[8]), faturamentoLiquido=numeroFinanceiro_(registro[7]);
    if(atual+valor > faturamentoLiquido+0.009) return {sucesso:false,mensagem:'Este recebimento ultrapassa o faturamento. Confira o valor antes de lançar.'};
    const abaR=obterAbaRecebimentos_(), id=proximoIdGenerico_(abaR), usuario=Session.getActiveUser().getEmail()||'SISTEMA';
    abaR.appendRow([id,idFinanceiro,registro[1],valor,converterData(valorTexto_(dados.data))||new Date(),valorTexto_(dados.pagador),valorTexto_(dados.formaPagamento),valorTexto_(dados.observacoes),new Date(),usuario]);
    const resumo=recalcularFinanceiro_(idFinanceiro);
    return {sucesso:true,mensagem:'Recebimento registrado com sucesso.',id:id,resumo:resumo};
  }catch(e){return {sucesso:false,mensagem:'Erro ao registrar recebimento: '+e.message};}
}

function excluirRecebimento(id) {
  try {
    const aba=obterAbaRecebimentos_(), valores=aba.getDataRange().getValues();
    for(let i=1;i<valores.length;i++) if(String(valores[i][0])===String(id)){
      const idFinanceiro=valores[i][1]; aba.deleteRow(i+1); const resumo=recalcularFinanceiro_(idFinanceiro);
      return {sucesso:true,mensagem:'Recebimento excluído com sucesso.',resumo:resumo};
    }
    return {sucesso:false,mensagem:'Recebimento não encontrado.'};
  }catch(e){return {sucesso:false,mensagem:'Erro ao excluir recebimento: '+e.message};}
}

// =====================================================
// UTILITÁRIOS
// =====================================================

function converterData(data) {

  if (!data) return '';

  const partes =
    String(data).split('-');

  if (partes.length !== 3) {
    return data;
  }

  return new Date(
    Number(partes[0]),
    Number(partes[1]) - 1,
    Number(partes[2])
  );
}


function formatarData(valor) {

  if (!valor) return '';

  if (
    Object.prototype.toString.call(valor) ===
    '[object Date]'
  ) {

    return Utilities.formatDate(
      valor,
      Session.getScriptTimeZone(),
      'dd/MM/yyyy'
    );
  }

  return String(valor);
}


function formatarDataHora(valor) {

  if (!valor) return '';

  if (
    Object.prototype.toString.call(valor) ===
    '[object Date]'
  ) {

    return Utilities.formatDate(
      valor,
      Session.getScriptTimeZone(),
      'dd/MM/yyyy HH:mm'
    );
  }

  return String(valor);
}


// =====================================================
// JSONP
// =====================================================

function respostaJSONP(dados, callback) {

  callback =
    String(callback || 'callback')
      .replace(/[^a-zA-Z0-9_$\.]/g, '');

  if (!callback) {
    callback = 'callback';
  }

  const json = JSON.stringify(dados);

  return ContentService
    .createTextOutput(
      callback + '(' + json + ')'
    )
    .setMimeType(
      ContentService.MimeType.JAVASCRIPT
    );
}
