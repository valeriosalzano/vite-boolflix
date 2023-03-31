<template>
  <div class="card-list">
    <h2 v-if="chose =='movie'">Movies</h2>
    <ul class="cards-container">
      <li v-for="card in store.fullData" class="card-container">
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
.cards-container {
  display: flex;
  flex-wrap: wrap;

  .card-container {
    width: 25%;
    padding: 0.5rem 1rem;
  }
}
</style>