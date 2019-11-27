import { http } from './config'

export class RestClient {
  _uri = ''

  constructor (link) {
    this._uri = link
  }

  get () {
    return http.get(this._uri)
  }

  put (source) {
    return http.put(this._uri + '/' + source.id, source)
  }

  post (source) {
    return http.post(this._uri, source)
  }

  delete (id) {
    return http.delete(this._uri + '/' + id)
  }

  key (contratante) {
    return http.get(`get-key/${contratante}`)
  }

  codigo (contratante) {
    return http.get(`get-codigo/${this._uri}/${contratante}`)
  }

  getChild (parent, table, val) {
    return http.get(`consultar/${table}/*/${parent}=${val}`)
  }
}
