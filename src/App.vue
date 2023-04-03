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
      getData(firstQueryPath, secondQueryPath){
        this.store.categories.forEach(category => {
          axios(
            {
              method: 'get',
              url: `${firstQueryPath}/${category}${secondQueryPath}`,
              baseURL: 'https://api.themoviedb.org/3',
              headers: {
              'Authorization': `Bearer ${this.store.api_token}`,
              'Content-Type': 'application/json;charset=utf-8'
              },
              params : this.store.params,
            }
          ).then (response =>{
            this.store.data[`${category}Data`] = response.data.results;
            this.store.params.query = '';
          })
        })
      },
      getDataCheck(){
        let current_query = this.store.params.query.toLowerCase().trim();

        if(!current_query){
          console.log('void query value')
        } else if (this.store.last_query == current_query){
          console.log('Same request, different query value required');
        } else {
          this.store.last_query = current_query;
          this.getData('/search','');
        }
      },
      getTrendingData(){
        this.getData('/trending','/week')
      },
      getApiConfig(){
        axios.get(`https://api.themoviedb.org/3/configuration?api_key=${this.store.params.api_key}`)
        .then(response => {
          this.store.api_config = response.data;
        })
      }
    },
  }
</script>

<style lang="scss">
@use './styles/general.scss';

</style>