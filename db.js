// "Banco de dados" simples: guarda tudo em memória e salva num arquivo data.json
const fs = require('fs');
const path = require('path');

const arquivo = path.join(__dirname, 'data.json');

let dados = { clientes: [], fornecedores: [], produtos: [] };

// ao iniciar, tenta ler o que já estava salvo
if (fs.existsSync(arquivo)) {
  try {
    dados = { ...dados, ...JSON.parse(fs.readFileSync(arquivo, 'utf8')) };
  } catch (erro) {
    console.log('Não consegui ler o data.json, começando vazio.');
  }
}

function salvar() {
  try {
    fs.writeFileSync(arquivo, JSON.stringify(dados, null, 2));
  } catch (erro) {
    console.log('Não consegui salvar o data.json:', erro.message);
  }
}

function listar(tabela) {
  return dados[tabela];
}

function buscar(tabela, id) {
  return dados[tabela].find((item) => item.id === id);
}

function inserir(tabela, item) {
  const ultimo = dados[tabela][dados[tabela].length - 1];
  item.id = ultimo ? ultimo.id + 1 : 1;
  dados[tabela].push(item);
  salvar();
  return item;
}

function atualizar(tabela, id, campos) {
  const item = buscar(tabela, id);
  if (!item) return null;
  Object.assign(item, campos);
  salvar();
  return item;
}

function excluir(tabela, id) {
  dados[tabela] = dados[tabela].filter((item) => item.id !== id);
  salvar();
}

module.exports = { listar, buscar, inserir, atualizar, excluir };
