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
    methods: {
      getData(){
        this.store.categories.forEach(category => {
          axios(
            {
              method: 'get',
              url: `https://api.themoviedb.org/3/search/${category}`,
            
              headers: {
              'Authorization': `Bearer ${this.store.api_token}`
              },
              params : this.store.params,
            }
          ).then (response =>{
            this.store.data[`${category}Data`] = response.data.results;
          })
        })
      },
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