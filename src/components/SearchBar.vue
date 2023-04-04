<template>
  <div class="search-bar">
    <div class="input-group">
      <button type="button" @click="$emit('clickOnSearch')"><i class="fa-solid fa-magnifying-glass"></i></button>
      <input type="text" placeholder="Scrivi qualcosa..." v-model="store.query" @keyup.enter="enterOnSearch">      
    </div>
    
  </div>
</template>

<script>
  import { store } from '../store/store.js';

  export default {
    name: 'search bar',
    emits: ['clickOnSearch'],
    data() {
      return {
        store,
      }
    },
    methods: {
      enterOnSearch(){
        this.$emit('clickOnSearch')
      }
    }
  }
</script>

<style lang="scss" scoped>
@use '../styles/partials/mixins';
.search-bar {
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
</style>