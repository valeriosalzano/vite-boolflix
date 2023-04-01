<template>
  <div class="card-list">
    <h2>{{cardListInfo.title}}</h2>
    <ul class="cards-container" v-if="store.data[`${cardListCategory}Data`].length">
      <li v-for="card in this.store.data[`${cardListCategory}Data`]" class="card-container">
        <card :cardData="card" :cardCategory="cardListCategory"/>
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
      cardListCategory : String,
    },
    computed: {
      cardListInfo(){
        let cardList = {};

        switch (this.cardListCategory){
          case 'movie':
            return cardList = {
              title: 'Movies'
            };
          case 'tv':
            return cardList = {
              title: 'Tv Series'
            }
        }
      }
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