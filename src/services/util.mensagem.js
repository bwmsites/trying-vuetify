export const mensagem = {
  sucesso: (ret) => ({
    send: true,
    tipo: 'success',
    msg: ret,
    icone: 'mdi-check-circle'
  }),

  erro: (ret) => ({
    send: true,
    tipo: 'error',
    msg: ret,
    icone: 'mdi-alert-circle'
  })
}
