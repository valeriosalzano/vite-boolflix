<template>
  <div class="card-list">
    <h2 v-if="chose =='movie'">Movies</h2>
    <ul>
      <li v-for="card in store.fullData">
        <card :cardData = "card" :chose="chose"/>
      </li>
    </ul>
  </div>
</template>

<script>
  import { store } from '../store/store.js';

  import Card from './Card.vue';

  export default {
    name: 'card-list',
    components: {
      Card,
    },
    data() {
      return {
        store,
      }
    },
    props: {
      chose : String,
    }
  }
</script>

<style lang="scss" scoped>
  
</style>