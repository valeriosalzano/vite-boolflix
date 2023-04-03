<template>
  <div class="card-list">
    <h2>{{cardListInfo.title}}</h2>
    <ul class="cards-container" v-if="store.data[`${cardListCategory}Data`].length">
      <li v-for="card in this.store.data[`${cardListCategory}Data`]" class="card-container">
        <SingleCard :cardData="card" :cardCategory="cardListCategory" :partialImgUrl="partialImgUrl"/>
      </li>
    </ul>
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
      cardListInfo(){
        let cardList = {};

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

        if(this.store.last_query == ''){
          cardList.title = 'Trending '+cardList.title;
        }

        return cardList;
      },
      partialImgUrl(){
        let imgUrl = this.store.api_config.images.secure_base_url;

        // will introduce a window size check next
        imgUrl +=`${this.store.api_config.images.poster_sizes[3]}/`

        return imgUrl
      }
    },
  }
</script>

<style lang="scss" scoped>
h2 {
    font-size: 2.5rem;
    margin: 2rem 1rem;
}
.cards-container {
  display: flex;
  flex-wrap: wrap;
}
.card-container {
    width: 100%;
    padding: 0.5rem 1rem;
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