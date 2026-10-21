const express = require('express');
const path = require('path');
const entidades = require('./entidades');
const criarRotas = require('./routes/crud');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// deixa a lista de entidades disponível em todas as telas (para o menu)
app.use((req, res, next) => {
  res.locals.entidades = entidades;
  next();
});

// INDEX GERAL: mostra o nome do aluno e os links dos cadastros
app.get('/', (req, res) => {
  res.render('index');
});

// cria as rotas de cada entidade: /clientes, /fornecedores, /produtos
entidades.forEach((e) => {
  app.use('/' + e.tabela, criarRotas(e));
});

// o Render define a porta na variável PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
