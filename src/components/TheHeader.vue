<template>
  <div class="the-header">
    <h1>Boolflix</h1>
  </div>
</template>

<script>
  export default {
  name: 'the header'
  }
</script>

<style lang="scss" scoped>
@use '../styles/partials/variables' as *;

h1 {
  font-size: 3rem;
  color: $primary-color;
  margin-bottom: 1rem;
}
// tablet view
@media screen and (min-width: 768px) {
  h1 {
    font-size: 4rem;
  }
}

// desktop view
@media screen and (min-width: 1200px) {
  h1 {
    font-size: calc(4rem + 0.5vw);
  }
}
</style>