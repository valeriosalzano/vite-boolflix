<template>
  <div class="search-bar">
    <input type="text" placeholder="Scrivi qualcosa" v-model="store.searchKey">
    <button type="button" @click="$emit('clickOnSearch')">Cerca</button>
  </div>
</template>

<script>
import { store } from '../store/store.js';

export default {
  name: 'search-bar',
  data() {
    return {
      store,
    }
  },
}
</script>

<style lang="scss" scoped>

</style>