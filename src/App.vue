<template>
  <TheHeader/>
  <SearchBar @clickOnSearch="getData()"/>

  <CardList/>
</template>

<script>
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
      console.log('hai cercato '+this.store.searchKey)
    }
  }
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