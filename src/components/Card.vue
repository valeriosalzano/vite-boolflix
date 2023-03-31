<template>
  <div class="card">

    <h3>{{ cardInfo.title }}</h3>
    <h5>{{ cardInfo.original_title }}</h5>
    <p>{{ cardInfo.language }}</p>
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
              language : this.cardData.original_language,
              stars : this.voteFix(this.cardData.vote_average),
            };

          default: return console.log('computed:cardInfo !')
        }
      }
    },
    methods: {
      voteFix(vote){
        return Math.ceil(vote/2);
      }
    }
  }
</script>

<style lang="scss" scoped>
  
</style>

<!-- 
1. Titolo
2. Titolo Originale
3. Lingua
4. Voto
 -->