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
        to: '/teste',
        icon: 'mdi-office-building',
        text: 'Empresa'
      },
      {
        to: '!#',
        icon: 'mdi-book-multiple',
        text: 'Contas'
      }
    ]
  })
}
</script>
