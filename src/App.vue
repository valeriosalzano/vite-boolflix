<template>
  <header>
    <div class="container">
      <TheHeader/>
      <SearchBar @clickOnSearch="getDataCheck"/>
    </div>
  </header>
  
  <main class="container">
    <div v-for="category in store.categories" :key="category">
      <CardList :cardListCategory="category"/>
    </div>
  </main>
  
</template>

<script>
  import axios from 'axios';
  import "@fontsource/open-sans-condensed";

  import { store } from './store/store.js';
  
  import TheHeader from './components/TheHeader.vue';
  import SearchBar from './components/SearchBar.vue';
  import CardList from './components/CardList.vue';

  export default {
    name: 'App',
    components: {
      TheHeader,
      SearchBar,
      CardList,
    },
    data() {
      return {
        store,
      }
    },
    mounted(){
      this.getApiConfig();
      this.getTrendingData();
      this.getGenresData();
    }
    ,
    methods: {
      // funzione che richiede i dati all'api, richiede la path prima e dopo "category"
      getData(firstQueryPath, secondQueryPath){
        let paramsObject = {...this.store.axiosGetObject};

        this.store.categories.forEach(category => {

          paramsObject.url = `${firstQueryPath}/${category}${secondQueryPath}`;
          this.store.query? paramsObject.params.query = this.store.query : '';

          axios(paramsObject)
          .then (response =>{

            this.store.data[`${category}Data`] = response.data.results;
            this.store.query = '';

            this.getCredits(category);
          })
        })
      },
      // funzione eseguita su input dell'user, previsto un check validità iniziale
      getDataCheck(){
        let current_query = this.store.query.toLowerCase().trim();

        if(!current_query){
          // CASO A: campo vuoto
          console.log('void query value')
          // CASO B: ricerca uguale a quella già fatta
        } else if (this.store.last_query == current_query){
          console.log('Same request, different query value required');
        } else {
          this.store.last_query = current_query;
          this.getData('/search','');
        }
      },
      // funzione che chiede all'api i trending della settimana
      getTrendingData(){
        this.getData('/trending','/week')
      },
      // funzione che chiede all'api le configurazioni, servirà al partialImgUrl di cardList
      getApiConfig(){
        let paramsObject = {...this.store.axiosGetObject};
        paramsObject.url = '/configuration';
        axios(paramsObject)
        .then(response => {
          this.store.api_config = response.data;
        })
      },
      // funzione che chiede all'api i generi
      getGenresData(){
        let paramsObject = {...this.store.axiosGetObject};
        ['movie','tv'].forEach(category => {
          paramsObject.url = `genre/${category}/list`;
          axios(paramsObject)
          .then(response => {
            this.store[`${category}Genres`] = response.data.genres;
          })
        })
      },
      // richiesta per ottenere il cast di un elemento
      getCredits(category){
        let paramsObject = {...this.store.axiosGetObject};
        
        this.store.data[`${category}Data`].forEach((element,index) => {
          paramsObject.url = `/${category}/${element.id}/credits`;
          axios(paramsObject)
          .then (answer => {
            // salvo i dati in un secondo array di oggetti assicurandomi che l'index sia giusto
            this.store.data[`${category}Credits`][index] = answer.data.cast;
          })
        })
      }
    },
  }
</script>

<style lang="scss">
@use './styles/general.scss';

</style>