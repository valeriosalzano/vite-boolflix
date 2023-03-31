<template>
  <div class="card">

    <h3>{{ cardInfo.title }}</h3>
    <h5>{{ cardInfo.original_title }}</h5>
    <div> <img :src="`https://flagsapi.com/${this.cardInfo.language.toUpperCase()}/flat/64.png`" :alt="this.cardInfo.language"> </div>
    <div>{{ cardInfo.stars }}</div>

  </div>
</template>

<script>
  export default {
    name: 'card',
    props: {
      cardData: Object,
      chose: String,
    },
    computed:{
      cardInfo()
      {
        let card = {};
        switch(this.chose) {
          case 'movie':
            return card = {
              title : this.cardData.title,
              original_title : this.cardData.original_title,
              language : this.languageFix(this.cardData.original_language),
              stars : this.voteFix(this.cardData.vote_average),
            };

          default: return console.log('computed:cardInfo !')
        }
      }
    },
    methods: {
      voteFix(vote){
        return Math.ceil(vote/2);
      },
      languageFix(language){
        switch(language){
          case 'en':
            return 'gb';
          case 'ja':
            return 'jp';
          default:
            return language;
        }
      }
    }
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