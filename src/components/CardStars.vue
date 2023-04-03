<template>
  <div class="card-stars">
    <div class="stars-container">
      <div class="empty-stars">
        <i v-for="star in 5" class="fa-regular fa-star"></i>
      </div>
      <div class="solid-stars" :style="`width:${vote_value*10}%`">
        <i v-for="star in 5" class="fa-solid fa-star"></i>
      </div>
    </div>
    
  </div>
</template>

<script>
  export default {
    name: 'card stars',
    props: {
      vote_value: Number,
    }
  }
</script>

<style lang="scss" scoped>
.card-stars {
  display: inline-block;
}
.stars-container {
  position: relative;
  display: inline-block;
}
.solid-stars {
  overflow: hidden;
  white-space: nowrap;
}
.empty-stars {
  position: absolute;
  top: 0;
  left: 0;
}
i {
  color: crimson;
}
.empty-stars i {
  color: white;
}

</style>