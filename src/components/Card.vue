<template>
  <div class="card">

    <h3>{{ cardInfo.title }}</h3>
    <h5>{{ cardInfo.original_title }}</h5>
    <div> <img :src="`https://flagsapi.com/${cardInfo.language}/flat/64.png`" :alt="this.cardInfo.language"> </div>
    <div>Rating: 
      <CardStars v-if="cardData.vote_count" :vote_value="cardData.vote_average"/>
      <span v-else>No votes</span>
    </div> 

  </div>
</template>

<script>
import CardStars from './CardStars.vue';

  export default {
    name: "card",
    components: {
      CardStars,
    },
    props: {
        cardData: Object,
        cardCategory: String,
    },
    computed: {
      cardInfo() {
          let card = {};
          switch (this.cardCategory) {
            case "movie":
              return card = {
                  title: this.cardData.title,
                  original_title: this.cardData.original_title,
                  language: this.languageFix(this.cardData.original_language),
                  stars: this.cardData.vote_average,
              };
            case "tv":
              return card = {
                  title: this.cardData.name,
                  original_title: this.cardData.original_name,
                  language: this.languageFix(this.cardData.original_language),
                  stars: this.cardData.vote_average,
              };
            default: return console.log("computed:cardInfo default!");
          }
        }
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
        }
    },
    components: { CardStars }
}
</script>

<style lang="scss" scoped>
  .card {
    height: 100%;
    padding: 0.5rem 1rem;
    border: 1px solid white;
    border-radius: 0.5rem;

    * {
      margin-bottom: 0.5rem;
    }
  }
</style>