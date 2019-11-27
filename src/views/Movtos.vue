<template>
  <core-options
    :opcoes="opcoes"
  />
</template>

<script>
import '../components/core/Options.vue'

export default {
  data: () => ({
    opcoes: [
      {
        to: '/financeiro',
        icon: 'mdi-currency-usd',
        text: 'Financeiro'
      },
      {
        to: '/estoque',
        icon: 'mdi-barcode-scan',
        text: 'Estoque'
      }
    ]
  })
}
</script>
