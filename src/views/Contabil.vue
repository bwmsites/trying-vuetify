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
        to: '/contabil/contas',
        icon: 'mdi-book',
        text: 'Plano de Contas'
      },
      {
        to: '/contabil/movimentadores',
        icon: 'mdi-airplay',
        text: 'Movimentadores'
      }
    ]
  })
}
</script>
