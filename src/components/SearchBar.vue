<template>
  <div class="search-bar">
    <div class="input-group">
      <button type="button" @click="$emit('clickOnSearch')"><i class="fa-solid fa-magnifying-glass"></i></button>
      <input type="text" placeholder="Scrivi qualcosa..." v-model="store.query" @keyup.enter="enterOnSearch">      
    </div>
    <select v-model="store.mainSelected" @change="resetCategoryFilters">
      <option value=""> All </option>
      <option v-for="genre in allGenres" :value="genre.id">{{ genre.name }}</option>
    </select>
  </div>
</template>

<script>
  import { store } from '../store/store.js';

  export default {
    name: 'search bar',
    emits: ['clickOnSearch','click-on-search'],
    data() {
      return {
        store,
      }
    },
    computed: {
      allGenres(){
        let allGenres = [...this.store.movieGenres,...this.store.tvGenres];

        let mergedGenres = [];
        let uniqueIds = [];

        allGenres.forEach(genre => {
          if(!uniqueIds.includes(genre.id)){
            uniqueIds.push(genre.id);
            mergedGenres.push({...genre});
          }
        })
        return mergedGenres;
      }
    },
    methods: {
      enterOnSearch(){
        this.$emit('clickOnSearch')
      },
      resetCategoryFilters(){
        this.store.categories.forEach(category => {
          this.store[`${category}Selected`] = '';
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
@use '../styles/partials/mixins';
.search-bar {
  display: flex;
  align-content: center;
  gap: 1rem;
  height: 50px;
  margin-left: auto;
  min-width: 250px;
}
.input-group {
  @include mixins.input-group;
  width: 100%;

  & *{
    font-size: 1rem;
    background-color: black;
    color: white;
  }
}

select {
  @include mixins.select();
}
</style>