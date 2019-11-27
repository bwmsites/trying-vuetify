import { RestClient } from '../services/restclient'

export class ClassProdutoGradeProduto {
  db = {}
  constructor (uri) {
    this.db = new RestClient(uri)
  }
}
