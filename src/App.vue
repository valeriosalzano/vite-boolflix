<template>
  <TheHeader/>
  <SearchBar @clickOnSearch="getData()"/>

  <CardList/>
</template>

<script>
  import axios from 'axios';
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
    methods: {
      getData(){
        axios.get(this.generateApiUrl())
        .then(response => {
          this.store.fullData = response.data.results;
        })
        
      },
      generateApiUrl(){
        let apiUrl = '';

        // path check
        Object.keys(this.store.search.path).forEach((key,index) => {
          if (key !== ''){
            apiUrl += index? `/${this.store.search.path[key]}` : this.store.search.path.api_link;
          }
        });
        
        
        // queries check
        let modifiedUrl = false;
        Object.keys(this.store.search.queries).forEach(key => {
          
          // se il valore della key è una stringa vuota non aggiungo filtri all'url
          if (this.store.search.queries[key] !== ''){
            // alla prima aggiunta inserisco il "?" poi "&" ai seguenti nell'url
            if (modifiedUrl == false){
              apiUrl += '?';
              modifiedUrl = true;
            } else {
              apiUrl += '&';
            }
            apiUrl += `${key}=${this.store.search.queries[key]}`;
          }
        });
        console.log('invocata generateApiUrl: '+apiUrl)
        return apiUrl;
      }
    },
  }
</script>

<style lang="scss">
@use './styles/general.scss';
@use './styles/partials/variables' as *;

body {
  background-color: $page-bg-color;
  color: $page-text-color;
}
  
</style>