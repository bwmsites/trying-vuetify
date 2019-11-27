/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '/dashboard',
    name: 'Visão Geral',
    view: 'Dashboard' // Relative to /src/views
  },
  {
    path: '/teste',
    name: 'Testando',
    view: 'Teste'
  },
  {
    path: '/cadastro',
    name: 'Cadastros do Sistema',
    view: 'Cadastro'
  },
  {
    path: '/configuracao',
    name: 'Configurações do Sistema',
    view: 'Configuracao'
  },
  {
    path: '/movimento',
    name: 'Tipos de Movimentações',
    view: 'Movtos'
  },
  {
    path: '/contabil',
    name: 'Contábil',
    view: 'Contabil'
  },
  {
    path: '/cadastro/produto',
    name: 'Cadastro de Produtos',
    view: 'Cadastro.Produto'
  }
]
