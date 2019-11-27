import { RestClient } from './restclient'

export const recurso = {
  sleep: (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  },

  mascara: (t, mask) => {
    let i = t.value.length
    let saida = mask.substring(1, 0)
    let texto = mask.substring(i)
    if (texto.substring(0, 1) !== saida) {
      t.value += texto.substring(0, 1)
    }
  },

  formatVal: (val) => {
    let ret = val.replace('.', '')
    return ret.replace(',', '.')
  },

  consulta: (uri, fields, condition) => {
    let url = 'consultar/' + uri + '/' + fields + '/' + condition
    const cons = new RestClient(url)
    return cons
  },

  delta: (original = [], current = [], comparison = []) => {
    const _delta = []
    comparison.forEach(compare => {
      if (original[compare] !== current[compare]) {
        console.log(_delta)
      }
    })
  }
}
