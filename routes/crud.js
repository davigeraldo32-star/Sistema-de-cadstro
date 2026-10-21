// Rotas de CRUD (listar, cadastrar, editar e excluir).
// A mesma função serve para Clientes, Fornecedores e Produtos.
const express = require('express');
const db = require('../db');

// pega do formulário só os campos que a entidade tem
function pegarCampos(entidade, corpo) {
  const resultado = {};
  entidade.campos.forEach((campo) => {
    resultado[campo.nome] = (corpo[campo.nome] || '').trim();
  });
  return resultado;
}

// confere se os campos obrigatórios foram preenchidos
function validar(entidade, dados) {
  for (const campo of entidade.campos) {
    if (campo.obrigatorio && !dados[campo.nome]) {
      return `O campo "${campo.rotulo}" é obrigatório.`;
    }
  }
  return null;
}

function criarRotas(entidade) {
  const router = express.Router();
  const t = entidade.tabela;

  // LISTAR
  router.get('/', (req, res) => {
    res.render('lista', { entidade, itens: db.listar(t) });
  });

  // TELA DE CADASTRO
  router.get('/novo', (req, res) => {
    res.render('form', {
      entidade,
      item: {},
      acao: `/${t}`,
      titulo: `Novo ${entidade.singular}`,
      erro: null
    });
  });

  // SALVAR NOVO
  router.post('/', (req, res) => {
    const dados = pegarCampos(entidade, req.body);
    const erro = validar(entidade, dados);
    if (erro) {
      return res.render('form', {
        entidade,
        item: dados,
        acao: `/${t}`,
        titulo: `Novo ${entidade.singular}`,
        erro
      });
    }
    db.inserir(t, dados);
    res.redirect(`/${t}`);
  });

  // TELA DE EDITAR
  router.get('/:id/editar', (req, res) => {
    const item = db.buscar(t, Number(req.params.id));
    if (!item) return res.redirect(`/${t}`);
    res.render('form', {
      entidade,
      item,
      acao: `/${t}/${item.id}/editar`,
      titulo: `Editar ${entidade.singular}`,
      erro: null
    });
  });

  // SALVAR EDIÇÃO
  router.post('/:id/editar', (req, res) => {
    const id = Number(req.params.id);
    const dados = pegarCampos(entidade, req.body);
    const erro = validar(entidade, dados);
    if (erro) {
      return res.render('form', {
        entidade,
        item: { ...dados, id },
        acao: `/${t}/${id}/editar`,
        titulo: `Editar ${entidade.singular}`,
        erro
      });
    }
    db.atualizar(t, id, dados);
    res.redirect(`/${t}`);
  });

  // EXCLUIR
  router.post('/:id/excluir', (req, res) => {
    db.excluir(t, Number(req.params.id));
    res.redirect(`/${t}`);
  });

  return router;
}

module.exports = criarRotas;
