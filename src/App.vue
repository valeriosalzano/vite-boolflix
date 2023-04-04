<template>
  <header>
    <div class="container">
      <TheHeader/>
      <SearchBar @clickOnSearch="getDataCheck()"/>
    </div>
  </header>
  
  <main class="container">
    <div v-for="category in store.categories">
      <CardList :cardListCategory="category"/>
    </div>
  </main>
  
</template>

<script>
  import axios from 'axios';
  import "@fontsource/open-sans-condensed";
  // store.js
  import { store } from './store/store.js';
  // components
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
    }
    ,
    methods: {
      // funzione che richiede i dati all'api, richiede la path prima e dopo "category"
      getData(firstQueryPath, secondQueryPath){
        // per ogni categoria sarà generata una chiamata
        this.store.categories.forEach(category => {
          axios(
            {
              method: 'get',
              baseURL : this.store.api_url,
              url: `${firstQueryPath}/${category}${secondQueryPath}`,
              params : this.store.params,
            }
          ).then (response =>{
            // salvo i risultati in store e azzero il campo nella searchbar
            this.store.data[`${category}Data`] = response.data.results;
            this.store.params.query = '';

            // inoltro le successive richieste per ottenere il cast
            this.getCredits(category);
          })
        })
      },
      // funzione eseguita su input dell'user, previsto un check validità iniziale
      getDataCheck(){
        // elimino gli spazi e rendo i caratteri minuscoli
        let current_query = this.store.params.query.toLowerCase().trim();

        if(!current_query){
          // CASO A: campo vuoto
          console.log('void query value')
          // CASO B: ricerca uguale a quella già fatta
        } else if (this.store.last_query == current_query){
          console.log('Same request, different query value required');
        } else {
          // check passato, salvo l'ultima chiave di ricerca e invoco getData
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
        axios.get(`https://api.themoviedb.org/3/configuration?api_key=${this.store.params.api_key}`)
        .then(response => {
          this.store.api_config = response.data;
        })
      },
      // richiesta per ottenere il cast di un elemento
      getCredits(category){
        // scorro i dati della categoria passata
        this.store.data[`${category}Data`].forEach((element,index) => {
          // per ogni elemento chiedo all'api di restituirmi il cast
          axios({
            method: 'get',
            baseURL: this.store.api_url,
            url: `/${category}/${element.id}/credits`,
            params: {
              api_key: this.store.params.api_key,
            }
          }).then (answer => {
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