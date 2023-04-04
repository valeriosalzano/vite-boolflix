<template>
  <div class="card-list">
    <div class="card-list-header">
      <h2>{{cardListInfo.title}}</h2>
      <select v-model="store[`${cardListCategory}Selected`]">
        <option value=""> All </option>
        <option v-for="genre in store[`${cardListCategory}Genres`]" :value="genre.id">{{ genre.name }}</option>
      </select>
    </div>

    <ul class="cards-container" v-if="store.data[`${cardListCategory}Data`].length">
      <li v-show="isShowing(card)" v-for="(card,index) in store.data[`${cardListCategory}Data`]" class="card-container">
        <SingleCard
          :cardData="card" 
          :cardCategory="cardListCategory" 
          :partialImgUrl="partialImgUrl"
          :cardCastData="store.data[`${cardListCategory}Credits`][index]"
          :genresData="store[`${cardListCategory}Genres`]"
          />
      </li>
    </ul>
    <div v-else class="no-results">
      Nessun risultato trovato.
    </div>
  </div>
</template>

<script>
  import { store } from '../store/store.js';

  import SingleCard from './SingleCard.vue';

  export default {
    name: 'card list',
    components: {
      SingleCard,
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
      // gestione dei dati della cardlist
      cardListInfo(){
        let cardList = {};

        // dati non condivisi dalle categorie diverse
        switch (this.cardListCategory){
          case 'movie':
            cardList.title = 'Movies';
            break;
          case 'tv':
            cardList.title = 'Tv Series';
            break;
          default :
            console.log("computed:cardListInfo default!");
        }

        // gestione schermata di apertura con i trending week
        if(this.store.last_query == ''){
          cardList.title = 'Trending '+cardList.title;
        }

        // object finale di ritorno
        return cardList;
      },
      // gestione dell'url parziale per le cover
      partialImgUrl(){
        let imgUrl = '';
        if(this.store.api_config){
          imgUrl = this.store.api_config.images.secure_base_url;
          // si aggiungerà un controllo delle dimensioni della finestra in seguito
          imgUrl +=`${this.store.api_config.images.poster_sizes[3]}/`
        }
        return imgUrl
      }
    },
    methods: {
      isShowing(card){
        return this.store[`${this.cardListCategory}Selected`] == '' || card.genre_ids.includes(this.store[`${this.cardListCategory}Selected`])
      }
    }
  }
</script>

<style lang="scss" scoped>
@use '../styles/partials/mixins';
.card-list-header {

  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 2.5rem;
    margin: 2rem 1rem;
  }
  select {
    @include mixins.select();
  }
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
}
.card-container {
    width: 100%;
    padding: 0.5rem 1rem;
  }
.no-results{
  font-size: 2rem;
  margin-left: 2rem;
}
// tablet view
@media screen and (min-width: 768px) {
  .card-container {
    width: calc(100% / 2);
  }
}
// desktop view
@media screen and (min-width: 992px) {
  .card-container {
    width: calc(100% / 3);
  }
}

// l desktop view
@media screen and (min-width: 1200px) {
  .card-container {
    width: calc(100% / 4);
  }
}
// xl desktop view
@media screen and (min-width: 1400px) {
  .card-container {
    width: calc(100% / 5);
  }
}
</style>