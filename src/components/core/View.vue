<template>
  <v-content
    v-if="userid"
  >
    <div id="core-view">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </div>
    <core-footer v-if="$route.name !== 'Maps'" />
  </v-content>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('sessao', ['userid'])
  },

  metaInfo () {
    return {
      title: 'WISDON v. 2.0 - Sistema de Gestão Multi-Seguimento'
    }
  }
}
</script>

<style>
#core-view {
  padding-bottom: 100px;
}
</style>
