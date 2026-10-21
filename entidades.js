// Aqui ficam as 3 entidades do sistema e os campos de cada uma.
// Se quiser adicionar um campo novo, é só colocar aqui.

module.exports = [
  {
    tabela: 'clientes',
    singular: 'Cliente',
    plural: 'Clientes',
    campos: [
      { nome: 'nome', rotulo: 'Nome', tipo: 'text', obrigatorio: true },
      { nome: 'email', rotulo: 'E-mail', tipo: 'email' },
      { nome: 'telefone', rotulo: 'Telefone', tipo: 'text' }
    ]
  },
  {
    tabela: 'fornecedores',
    singular: 'Fornecedor',
    plural: 'Fornecedores',
    campos: [
      { nome: 'nome', rotulo: 'Nome', tipo: 'text', obrigatorio: true },
      { nome: 'cnpj', rotulo: 'CNPJ', tipo: 'text' },
      { nome: 'telefone', rotulo: 'Telefone', tipo: 'text' }
    ]
  },
  {
    tabela: 'produtos',
    singular: 'Produto',
    plural: 'Produtos',
    campos: [
      { nome: 'nome', rotulo: 'Nome', tipo: 'text', obrigatorio: true },
      { nome: 'preco', rotulo: 'Preço (R$)', tipo: 'number', passo: '0.01' },
      { nome: 'estoque', rotulo: 'Estoque', tipo: 'number', passo: '1' }
    ]
  }
];
