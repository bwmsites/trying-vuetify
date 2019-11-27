<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-alert
      v-if="!empresa_ok"
      :value="true"
      type="warning"
    >
      Empresa ainda não configurada.
      <a href="/configuracao/empresa">
        <strong>Clique aqui e Proceda com a configuração para poder ativar esse recurso no sistema.</strong>
      </a>
    </v-alert>
    <v-layout
      v-else
      wrap
    >
      <v-flex
        v-for="(opt, i) in opcoes"
        :key="i"
        xs12
        sm6
        lg2
      >
        <v-card
          :key="i"
          :to="opt.to"
          class="mx-auto"
          color="info"
          dark
          max-width="100%"
        >
          <v-card-text>
            <v-layout
              align-center
              justify-center
            >
              <v-icon
                x-large
                center
              >
                {{ opt.icon }}
              </v-icon>
            </v-layout>
            <v-layout
              align-center
              justify-center
            >
              {{ opt.text }}
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    empresa_ok: {
      type: Boolean,
      default: true
    },
    opcoes: {
      type: Array,
      default: () => ({
        //
      })
    }
  }
}
</script>
