<template>
  <div class="card" :class="cardData.poster_path? 'flip-card' : 'only-text'">
    <div class="card-container">
      <div class="cover-container">
        <img v-show="cardData.poster_path" :src="cardInfo.image" :alt="'cover di '+cardInfo.title">
      </div>
      <div class="text-container">
        <h3 class="title">{{ cardInfo.title }}</h3>
        <h5 v-if="cardInfo.title != cardInfo.original_title" class="original-title">{{ cardInfo.original_title }}</h5>
        <div class="flag-container language"> <span>Language :</span> <img :src="`https://flagsapi.com/${cardInfo.language}/flat/64.png`" :alt="flagAlt"> </div>
        <div class="rating"> <span> Rating : </span> 
          <CardStars v-if="cardData.vote_count" :vote_value="cardData.vote_average"/>
          <span v-else>No votes</span>
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
        flagAlt: this.cardData.original_language,
      }
    },
    props: {
        cardData: Object,
        cardCategory: String,
        partialImgUrl: String,
    },
    computed: {
      cardInfo() {
          let card = {
            original_title: this.cardData.original_title,
            language: this.languageFix(this.cardData.original_language),
            stars: this.cardData.vote_average,
            image: this.partialImgUrl + this.cardData.poster_path,
            overview: this.cardData.overview,
          };

          switch (this.cardCategory) {
            case "movie":
              card.title = this.cardData.title;
              break;
            case "tv":
              card.title = this.cardData.name;
              break;
            default: console.log("computed:cardInfo default!");
          }
          return card;
        },
    },
    created(){
      this.altFlagFix();
    },
    methods: {
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
        altFlagFix(){
          languages.iso_codes.forEach((code,index) => {
            if (code == this.cardData.original_language){
              this.flagAlt = languages.languages_names[index];
            }
          });
        },
    },
    components: { CardStars }
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