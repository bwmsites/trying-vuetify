<template>
  <v-layout
    row
    justify-center>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290">
      <template
        v-slot:activator="{ on }"
      >
        <v-btn
          dark
          color="error"
          small
          v-on="on"
        >
          <v-icon>mdi-delete</v-icon>
          Excluir
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline"
        >
          Confirmação de Ação Necessária
        </v-card-title>
        <v-card-text>
          {{ mensagem }}
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
          <v-btn
            color="red darken-1"
            flat
            @click="confirmar"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    deleter: {
      type: Function,
      default: () => {
        //
      }
    },
    mensagem: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      dialog: false
    }
  },

  methods: {
    confirmar () {
      this.deleter()
      this.dialog = false
    }
  }
}
</script>
