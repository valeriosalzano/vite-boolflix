<template>
  <div class="card" :class="cardData.poster_path? 'flip-card' : 'only-text'">
    <div class="card-container">

      <div class="cover-container">
        <img v-show="cardData.poster_path" :src="cardInfo.image" :alt="'cover di '+cardInfo.title">
      </div>

      <div class="text-container">
        <h3 class="title">{{ cardInfo.title }}</h3>
        <h5 v-if="cardInfo.title != cardInfo.original_title" class="original-title">{{ cardInfo.original_title }}</h5>
        <div class="flag-container language">
          <span>Language : </span> 
          <img :src="`https://flagsapi.com/${cardInfo.language}/flat/64.png`" :alt="computedFlagAlt"> 
        </div>
        <div class="rating"> 
          <span> Rating : </span> 
          <CardStars v-if="cardData.vote_count" :vote_value="cardData.vote_average"/>
          <span v-else>No votes</span>
        </div>
        <div class="cast">
          <span>Cast : {{ cardInfo.cast }}.</span>
        </div>
        <div v-if="cardInfo.overview" class="overview-container">
          <p> {{ cardInfo.overview }}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import languages from '../store/languages_codes.json'
import CardStars from './CardStars.vue';

  export default {
    name: "single card",
    components: {
      CardStars,
    },
    data() {
      return {
        languages,
      }
    },
    props: {
        cardData: Object,
        cardCategory: String,
        partialImgUrl: String,
        cardCastData: Array,
    },
    computed: {
      // gestione dei dati in cardData
      cardInfo() {
        let data = this.cardData;

        let card = {
          // dati condivisi tra le categorie
          original_title: data.original_title,
          language: this.languageFix(data.original_language),
          stars: data.vote_average,
          image: this.partialImgUrl + data.poster_path,
          overview: data.overview,
          cast: this.getCast(),
        };
        // dati differenti in base alla categoria
        switch (this.cardCategory) {
          case "movie":
            card.title = this.cardData.title;
            break;
          case "tv":
            card.title = this.cardData.name;
            break;
          default: console.log("computed:cardInfo default!");
        }

        // carta completata
        return card;

        },
        // gestione del testo alternativo della bandierina
        computedFlagAlt(){
          let language = this.cardData.original_language;
          languages.iso_codes.forEach((code,index) => {
            if(code == language){
              language = languages.languages_names[index];
            }
          })
          return language;
        },
    },
    methods: {
      // passaggio dal codice lingua a codice paese per la stampa flag
      languageFix(language) {
        language = language.toUpperCase();
          switch (language) {
            case "EN":
                return "GB";
            case "JA":
                return "JP";
            default:
                return language;
        }
      },
      // funzione che genera una stringa dei nomi del cast (max 5)
      getCast(){
        if(this.cardCastData){
          // copio i nomi in un array
          let cast = this.cardCastData.map(element => {
            return element.name
          });
          // prendo solo i primi 5
          cast = cast.filter((element,index)=> {
            return index<5
          });
          // unisco tutto in una stringa
          cast = cast.join(', ')
          return cast
        }
      },
    },
}
</script>

<style lang="scss" scoped>
@use '../styles/partials/mixins';
@use '../styles/partials/variables' as *;
  .card {
    width: 100%;
    aspect-ratio: 342/500;
    text-align: center;
    &.flip-card{
      @include mixins.flip-card();
    }
    .card-container {
      border: 1px solid white;
      height: 100%;
    }
    .cover-container img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
    .flag-container *{
      vertical-align: middle;
    }

    .text-container {
      height: 100%;
      overflow: auto;
      text-align: center;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      font-size: 1.2rem;

      .title {
        margin-bottom: 1rem;
        font-size: 2rem;
        color: $primary-color;
      }
      .original-title{
        margin-bottom: 0.5rem;
        font-size: 1.5rem;
      }
      .language {
        margin-bottom: 0.5rem;
      }
      .rating {
        margin-bottom: 1rem;
        & span {
          vertical-align: top;
        }
      }
      .overview-container {
        overflow-y: auto;
        margin: 0.5rem 0;
        padding: 0 0.5rem;
        min-height: 100px;
      } 
    }
  }
</style>