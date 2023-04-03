<template>
  <div class="card" :class="cardData.poster_path? 'flip-card' : 'only-text'">
    <div class="card-container">
      <div class="cover-container">
        <img v-show="cardData.poster_path" :src="cardInfo.image" :alt="'cover di '+cardInfo.title">
      </div>
      <div class="text-container">
        <h3>{{ cardInfo.title }}</h3>
        <h5 v-if="cardInfo.title != cardInfo.original_title">{{ cardInfo.original_title }}</h5>
        <div class="flag-container"> Language: <img :src="`https://flagsapi.com/${cardInfo.language}/flat/64.png`" :alt="flagAlt" @error="altFlagFix" > </div>
        <div>Rating: 
          <CardStars v-if="cardData.vote_count" :vote_value="cardData.vote_average"/>
          <span v-else>No votes</span>
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
          };

          switch (this.cardCategory) {
            case "movie":
              card.title = this.cardData.title;
              return card;
            case "tv":
              card.title = this.cardData.name;
              return card;
            default: return console.log("computed:cardInfo default!");
          }
        },
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
  .card {
    width: 100%;
    aspect-ratio: 342/500;
    text-align: center;

    &.flip-card{
      @include mixins.flip-card();
    }
    .cover-container img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
    .flag-container *{
      vertical-align: middle;
    }
  }
</style>