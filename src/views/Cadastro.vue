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
        to: '/cadastro/grupo-pessoa',
        icon: 'mdi-account-group',
        text: 'Grupos de Pessoas'
      },
      {
        to: '/cadastro/pessoa',
        icon: 'mdi-account-multiple-check',
        text: 'Pessoas'
      },
      {
        to: '/cadastro/grupo-produto',
        icon: 'mdi-format-columns',
        text: 'Grupos de Produtos'
      },
      {
        to: '/cadastro/produto',
        icon: 'mdi-barcode',
        text: 'Produtos'
      },
      {
        to: '/cadastro/grade-produto',
        icon: 'mdi-blur',
        text: 'Grades de Produtos'
      }
    ]
  })
}
</script>
