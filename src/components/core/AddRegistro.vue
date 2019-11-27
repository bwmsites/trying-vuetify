<template>
  <v-layout
    row
    justify-start
    style="margin-left: 15px;"
  >
    <v-dialog
      v-model="dialog"
      persistent
      max-width="500">
      <template
        v-slot:activator="{ on }"
      >
        <v-btn
          icon
          dark
          color="indigo"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline"
        >
          {{ titulo }}
        </v-card-title>
        <v-card-text>
          {{ mensagem }}
          <v-flex
            xs12
            md12
          >
            <v-data-table
              :headers="[
                {sortable: false, text: 'Grade', value: 'descricao', width: '100%'},
              ]"
              :items="dados"
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
                  @click="confirmar(item)"
                >
                  <td>
                    {{ item.descricao }}
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-flex>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="light-blue darken-1"
            flat
            @click="dialog = false"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    inserter: {
      type: Function,
      default: () => {
        //
      }
    },
    titulo: {
      type: String,
      default: ''
    },
    mensagem: {
      type: String,
      default: ''
    },
    dados: {
      type: Array,
      default: () => {}
    }
  },

  data () {
    return {
      dialog: false
    }
  },

  methods: {
    confirmar (item) {
      this.inserter(item)
      this.dialog = false
    }
  }
}
</script>
