<template>
  <TheHeader/>
  <SearchBar @clickOnSearch="getData()"/>
  
  <div v-for="category in store.categories" class="container">
    <CardList :cardListCategory="category"/>
  </div>
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
    mounted(){
      this.getApiConfig();
    }
    ,
    methods: {
      getData(){
        if(!this.getDataCheck()){
          console.log('Check not passed')
          return;
        }

        this.store.categories.forEach(category => {
          axios(
            {
              method: 'get',
              url: `https://api.themoviedb.org/3/search/${category}`,
            
              headers: {
              'Authorization': `Bearer ${this.store.api_token}`,
              'Content-Type': 'application/json;charset=utf-8'
              },
              params : this.store.params,
            }
          ).then (response =>{
            this.store.data[`${category}Data`] = response.data.results;
          })
        })
      },
      getDataCheck(){
        let current_query = this.store.params.query.toLowerCase().trim();
        if(!current_query){
          console.log('void query value')
          return false;
        }
        if(this.store.last_query == current_query){
          console.log('Same request, different query value required');
          return false;
        } else {
          this.store.last_query = current_query;
          return true;
        }
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
@use './styles/partials/variables' as *;

body {
  background-color: $page-bg-color;
  color: $page-text-color;
}
  
</style>