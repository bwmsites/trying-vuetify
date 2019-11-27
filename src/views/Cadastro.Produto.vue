<template>
  <v-tabs
    v-model="active"
    color="#eee"
    dark
    slider-color="#eee"
  >
    <v-tab ripple />
    <v-tab-item>
      <template>
        <v-container
          fill-height
          fluid
          grid-list-xl
          style="margin-top: -80px;"
        >
          <v-layout
            justify-center
            wrap
          >
            <v-flex
              md12
            >
              <material-card
                :title="listTitle"
                :text="listText"
                :color="color"
              >
                <v-btn
                  fab
                  dark
                  color="indigo"
                  @click="inserir()"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-text-field
                  :color="color"
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Pesquisar"
                  single-line
                />
                <v-data-table
                  :headers="headers"
                  :items="items"
                  :search="search"
                >
                  <template
                    slot="headerCell"
                    slot-scope="{ header }"
                  >
                    <span
                      class="subheading font-weight-bold text-primary text--darken-3"
                      v-text="header.text"
                    />
                  </template>
                  <template
                    slot="items"
                    slot-scope="{ item }"
                  >
                    <tr
                      style="cursor: pointer;"
                      @click="editar(item)"
                    >
                      <td>
                        {{ item.codigo }}
                      </td>
                      <td>
                        {{ item.descricao }}
                      </td>
                      <td>
                        {{ item.status }}
                      </td>
                    </tr>
                  </template>
                  <template
                    slot="no-results"
                  >
                    <v-alert
                      :value="true"
                      color="warning"
                      icon="mdi-alert-circle"
                    >
                      Sua busca por "{{ search }}" não encontrou nenhum resultado
                    </v-alert>
                  </template>
                </v-data-table>
              </material-card>
            </v-flex>
          </v-layout>
        </v-container>
      </template>
    </v-tab-item>
    <v-tab ripple />
    <v-tab-item>
      <template>
        <v-container
          fill-height
          fluid
          grid-list-xl
          style="margin-top: -78px;"
        >
          <v-layout
            justify-center
            wrap
          >
            <v-flex
              md12
            >
              <material-card
                :title="itemTitle"
                :text="itemText"
                :color="color"
              >
                <v-alert
                  v-if="retorno.send"
                  :color="retorno.tipo"
                  :icon="retorno.icone"
                  dismissible
                  value="true"
                >
                  {{ retorno.msg }}
                </v-alert>
                <v-form id="frm-cad-produto">
                  <v-container py-0>
                    <v-layout wrap>
                      <v-flex
                        xs12
                        md2
                      >
                        <v-text-field
                          :color="color"
                          :rules="[validacao.requerido]"
                          v-model="produto.codigo"
                          required
                          label="Código"
                          placeholder="Código do Produto"
                          hint="Essa informação é gerada automaticamente, contudo você pode alterá-la. Apenas números são permitidos"
                        />
                      </v-flex>
                      <v-flex
                        xs12
                        md3
                      >
                        <v-text-field
                          :color="color"
                          v-model="produto.codigo_barra"
                          label="Código de Barras(EAN/GTIN)"
                          hint="Você pode usar um leitor de códigos de barras nesse campo se preferir"
                        />
                      </v-flex>
                      <v-flex
                        xs12
                        md7
                      >
                        <v-text-field
                          :color="color"
                          :rules="[validacao.requerido]"
                          v-model="produto.descricao"
                          required
                          label="Descrição"
                          placeholder="Descrição do Produto/Serviço"
                          hint="Informe aqui o nome/descrição do produto ou serviço"
                        />
                      </v-flex>
                      <v-flex
                        xs12
                        md6
                      >
                        <v-autocomplete
                          :color="color"
                          :items="grupos"
                          v-model="produto.grupo"
                          clearable
                          clear-icon="mdi-close"
                          item-value="id"
                          item-text="descricao"
                          required
                          label="Grupo"
                          placeholder="Informe o grupo"
                          hint="Selecione na listagem o grupo ao qual esse produto/serviço pertence"
                        />
                      </v-flex>
                      <v-flex
                        xs12
                        md6
                      >
                        <v-autocomplete
                          :color="color"
                          :items="subgrupos"
                          v-model="produto.subgrupo"
                          clearable
                          clear-icon="mdi-close"
                          item-value="id"
                          item-text="descricao"
                          required
                          label="Sub-Grupo"
                          placeholder="Informe o sub-grupo"
                          hint="Selecione na listagem o sub-grupo ao qual esse produto/serviço deve ser associado"
                        />
                      </v-flex>
                      <v-flex
                        xs12
                        md12
                      >
                        <v-tabs
                          color="info"
                          dark
                          slider-color="blue"
                        >
                          <v-tab ripple>
                            Geral
                          </v-tab>
                          <v-tab-item>
                            <v-layout
                              line
                              style="margin-top: 5px;"
                            >
                              <v-flex
                                xs12
                                md12
                              >
                                <v-autocomplete
                                  :color="color"
                                  :items="tipos"
                                  v-model="produto.tipo"
                                  clearable
                                  clear-icon="mdi-close"
                                  item-value="codigo"
                                  item-text="descricao"
                                  required
                                  label="Tipo"
                                  placeholder="Informe o tipo de item"
                                  hint="Selecione na listagem o tipo contábil no qual esse item se classifica"
                                />
                              </v-flex>
                              <v-flex
                                v-if="produto.status"
                                xs12
                                md6
                              >
                                <v-switch
                                  v-model="status.ok"
                                  :label="status.text"
                                  :color="color"
                                  @change="setStatusProduto()"
                                />
                              </v-flex>
                            </v-layout>
                          </v-tab-item>
                          <v-tab ripple>
                            Preços
                          </v-tab>
                          <v-tab-item>
                            <v-layout
                              wrap
                              style="margin-top: 5px;"
                            >
                              <v-flex
                                xs12
                                md2
                              >
                                <v-switch
                                  v-model="produto.usa_grade"
                                  :color="color"
                                  label="Preço por Grade?"
                                />
                              </v-flex>
                              <template
                                v-if="!produto.usa_grade"
                              >
                                <v-flex
                                  xs12
                                  md2
                                >
                                  <label
                                    class="label-personal"
                                  >Margem de Lucro</label>
                                  <money
                                    :color="color"
                                    v-model="produto.margem_lucro"
                                    v-bind="margens"
                                    class="money-box"
                                  />
                                </v-flex>
                                <v-flex
                                  xs12
                                  md2
                                >
                                  <label
                                    class="label-personal"
                                  >Último Custo</label>
                                  <money
                                    :color="color"
                                    v-model="produto.preco_custo"
                                    v-bind="money"
                                    class="money-box"
                                  />
                                </v-flex>
                                <v-flex
                                  xs12
                                  md2
                                >
                                  <label
                                    class="label-personal"
                                  >Preço Unit.</label>
                                  <money
                                    :color="color"
                                    :rules="[validacao.requerido]"
                                    v-model="produto.preco_unit"
                                    v-bind="money"
                                    required
                                    class="money-box"
                                  />
                                </v-flex>
                              </template>
                              <v-flex
                                xs12
                                md2
                              >
                                <v-switch
                                  v-model="produto.comissao_aplicar"
                                  :color="color"
                                  label="Aplicar Comissão?"
                                />
                              </v-flex>
                              <v-flex
                                xs12
                                md1
                              >
                                <v-select
                                  :items="comissoes"
                                  :color="color"
                                  v-model="produto.comissao_tipo"
                                  item-value="tipo"
                                  item-text="texto"
                                  label="Tipo"
                                  hint="Tipo de cálculo de comissão a ser aplicado (Percentual ou Monetário)"
                                />
                              </v-flex>
                              <v-flex
                                xs12
                                md1
                              >
                                <label
                                  class="label-personal"
                                >Valor</label>
                                <money
                                  :color="color"
                                  :rules="[validacao.requerido]"
                                  v-model="produto.comissao_valor"
                                  v-bind="money"
                                  class="money-box"
                                />
                              </v-flex>
                            </v-layout>
                          </v-tab-item>
                          <v-tab
                            v-if="produto.usa_grade"
                            ripple
                          >
                            Grade de Valores
                          </v-tab>
                          <v-tab-item>
                            <v-layout
                              wrap
                              style="margin-top: 5px"
                            >
                              <core-add-registro
                                :dados="grades"
                                :inserter="addGrade"
                                titulo="Grades de Valores"
                                mensagem="Selecione uma grade de valores para vincular ao produto"
                              />
                              <v-flex
                                xs12
                                md12
                              >
                                <v-data-table
                                  :headers="[
                                    {sortable: false, text: 'Grade', value: 'descricao', width: '70%'},
                                    {sortable: false, text: 'Valor (R$)', value: 'valor', width: '20%'},
                                    {sortable: false, text: 'Excluir', value: 'excluir', width: '10%'}
                                  ]"
                                  :items="prodgrades"
                                  hide-actions
                                >
                                  <template
                                    slot="headerCell"
                                    slot-scope="{ header }"
                                  >
                                    <span
                                      class="subheading font-weight-bold text-primary text--darken-3"
                                      v-text="header.text"
                                    />
                                  </template>
                                  <template
                                    slot="items"
                                    slot-scope="{ item }"
                                  >
                                    <tr
                                      style="cursor: pointer;"
                                    >
                                      <td>
                                        {{ item.descricao }}
                                      </td>
                                      <td>
                                        <money
                                          :color="color"
                                          v-model="item.valor"
                                          v-bind="money"
                                          class="money-box"
                                        />
                                      </td>
                                      <td>
                                        <v-btn
                                          icon
                                          color="error"
                                          @click="delGrade(item)"
                                        >
                                          <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                      </td>
                                    </tr>
                                  </template>
                                </v-data-table>
                              </v-flex>
                            </v-layout>
                          </v-tab-item>
                        </v-tabs>
                      </v-flex>
                    </v-layout>
                    <v-layout
                      wrap
                    >
                      <v-btn
                        dark
                        color="success"
                        small
                        @click="salvar()"
                      >
                        <v-icon>mdi-check</v-icon>
                        Salvar
                      </v-btn>
                      <v-btn
                        dark
                        color="warning"
                        small
                        @click="cancelar()"
                      >
                        <v-icon>mdi-arrow-left</v-icon>
                        Voltar
                      </v-btn>
                      <core-confirm-delete
                        v-if="produto.id"
                        :deleter="excluir"
                        mensagem="Deseja realmente excluir o produto selecionado?"
                      />
                      <div />
                    </v-layout>
                  </v-container>
                </v-form>
              </material-card>
            </v-flex>
          </v-layout>
        </v-container>
      </template>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import { produto } from '../classes/classe.produto'
import { mapState } from 'vuex'
import { mensagem } from '../services/util.mensagem'
import { Money } from 'v-money'
import { recurso } from '../services/util.recursos'
import { ClassProdutoGradeProduto } from '../classes/classe.produto_grade_produto'
import '../components/core/ConfirmDelete'
import '../components/core/AddRegistro'

export default {
  components: { Money },

  data: () => ({
    money: {
      decimal: ',',
      thousands: '.',
      precision: 2
    },
    margens: {
      decimal: ',',
      thousands: '.',
      precision: 2,
      suffix: ' %'
    },
    produto: {},
    prodgrades: [],
    deltas: [],
    active: null,
    search: '',
    listTitle: 'Produtos Cadastrados',
    listText: 'Esta relação traz os produtos tanto ativos quanto os inativos cadastrados no sistema diferenciando-os pelo status',
    itemTitle: 'Produto',
    itemText: 'Detalhamento do Produto',
    comissoes: [
      {
        tipo: 'P',
        texto: '%'
      },
      {
        tipo: 'V',
        texto: '$'
      }
    ],
    headers: [
      {
        sortable: false,
        text: 'Código',
        value: 'codigo',
        width: '10%'
      },
      {
        sortable: true,
        text: 'Descrição',
        value: 'descricao',
        width: '60%'
      },
      {
        sortable: true,
        text: 'Situação',
        value: 'status',
        width: '10%'
      }
    ],
    items: [],
    grupos: [],
    subgrupos: [],
    grades: [],
    status: {
      ok: false,
      text: 'Inativo'
    },
    retorno: {},
    nID: null,
    tipos: [
      { codigo: '00', descricao: 'Mercadoria para Revenda' },
      { codigo: '01', descricao: 'Matéria-Prima' },
      { codigo: '02', descricao: 'Embalagem' },
      { codigo: '03', descricao: 'Produto em Processo' },
      { codigo: '04', descricao: 'Produto Acabado' },
      { codigo: '05', descricao: 'Subproduto' },
      { codigo: '06', descricao: 'Produto Intermediário' },
      { codigo: '07', descricao: 'Material de Uso e Consumo' },
      { codigo: '08', descricao: 'Ativo Imobilizado' },
      { codigo: '09', descricao: 'Serviços' },
      { codigo: '10', descricao: 'Outros insumos' },
      { codigo: '99', descricao: 'Outras' }
    ],
    validacao: {
      requerido: value => !!value || 'Campo obrgatório'
    }
  }),

  computed: {
    ...mapState('app', ['color']),
    ...mapState('sessao', ['userid', 'username', 'contratante'])
  },

  mounted () {
    this.listar()
  },

  methods: {
    nextTab () {
      const active = parseInt(this.active)
      this.active = (active < 2 ? active + 1 : 0)
      this.retorno = {}
    },

    listar () {
     recurso.consulta('grupo_produto', 'id,codigo,descricao', 'true').get().then(resp => {
        this.grupos = resp.data
     })

      produto.get().then(resp => {
        this.items = resp.data
      })

      recurso.consulta('produto_grade', 'id,descricao', 'true').get().then(resp => {
        this.grades = resp.data
      })
    },

    addGrade (reg) {
      const grade = {
        flag: 'I',
        descricao: reg.descricao,
        produto: this.produto.id,
        grade: reg.id,
        valor: 0,
        usuario_cad: this.userid
      }

      this.prodgrades.push(grade)
    },

    delGrade (reg) {
      reg.flag = 'D'
      if (!this.deltas.includes(reg)) {
        this.deltas.push(reg)
      }
      let ix = this.prodgrades.indexOf(reg)
      if (ix >= 0) {
        this.prodgrades.splice(ix, 1)
      }
    },

    editar (reg) {
      this.produto = reg

      let produtoGrade = new ClassProdutoGradeProduto('produto/' + this.produto.id + '/grade')
      produtoGrade.db.get().then(resp => {
        this.prodgrades = resp.data
      })

      this.setStatus(this.produto.status)
      this.nextTab()
      produtoGrade = {}
    },

    inserir () {
      this.produto = {
        codigo: null,
        descricao: '',
        preco_unit: 0,
        preco_custo: 0,
        margem_lucro: 0,
        comissao_aplicar: false,
        comissao_tipo: 'P',
        comissao_valor: 0,
        status: 'A',
        codigo_barra: null,
        grupo: null,
        subgrupo: null,
        tipo: null,
        usa_grade: false,
        usuario_cad: this.userid,
        contratante: 1
      }
      this.setStatus(this.produto.status)
      this.setCodigo()
      this.setID()
      this.nextTab()
    },

    excluir () {
      this.retorno = {}
      produto.delete(this.produto.id).then(resp => {
        this.retorno = mensagem.sucesso(resp.data)
        this.listar()
        this.nextTab()
      }).catch(e => {
        this.retorno = mensagem.erro(e.response.data)
      })
    },

    salvarGrade () {
      this.prodgrades.forEach(el => {
        if (!el.flag) {
          el.flag = 'U'
          el.usuario_alt = this.userid
          el.data_alt = new Date()
        }
        this.deltas.push(el)
      })
      let produtoGrade = new ClassProdutoGradeProduto('produto/grade')
      this.deltas.forEach(delta => {
        produtoGrade.db.post(delta).then(resp => {
          // console.log(resp.data)
        })
      })

      this.deltas = {}
    },

    salvar () {
      this.retorno = {}

      if (this.produto.id) {
        this.produto.usuario_alt = this.userid
        this.produto.data_alt = new Date()
        produto.put(this.produto).then(resp => {
          this.retorno = mensagem.sucesso(resp.data)
          this.listar()
          // this.nextTab()
        }).catch(e => {
          this.retorno = mensagem.erro(e.response.data)
        })
      } else {
        this.produto.id = this.nID
        produto.post(this.produto).then(resp => {
          this.retorno = mensagem.sucesso(resp.data)
          this.listar()
          // this.nextTab()
        }).catch(e => {
          this.retorno = mensagem.erro(e.response.data)
        })
      }

      if (this.prodgrades.length > 0) {
        this.salvarGrade()
      }
    },

    cancelar () {
      this.produto = {}
      this.retorno = {}
      this.listar()
      this.nextTab()
    },

    setStatus (status) {
      if (status === 'A') {
        this.status.ok = true
        this.status.text = 'Situação: Ativo'
      } else {
        this.status.ok = false
        this.status.text = 'Situação: Inativo'
      }
    },

    setStatusProduto () {
      if (this.produto.status === 'A') {
        this.produto.status = 'I'
      } else {
        this.produto.status = 'A'
      }

      this.setStatus(this.produto.status)
    },

    setID () {
      produto.key(this.contratante).then(resp => {
        this.nID = resp.data
      })
    },

    setCodigo () {
      produto.codigo(this.contratante).then(resp => {
        this.produto.codigo = resp.data
      })
    }
  }
}
</script>

<style>
  .label-personal {font-size: 12px; color: rgb(172 172 172)}
  .money-box {width: 100%; padding: 2px; font-size: 14px}
</style>
