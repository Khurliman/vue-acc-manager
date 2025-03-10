<script setup lang="ts">
import AccountsList from './components/AccountsList.vue'
import { useAccountStore } from './stores/accountStore'

const store = useAccountStore();
store.initStore();

</script>

<template>
  <v-app>
    <v-main>
      <AccountsList />
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
