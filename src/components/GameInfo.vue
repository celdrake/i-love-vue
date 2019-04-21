<template>
  <div class="game-info">
    <button @click="restartGame">
      New game
    </button>
  </div>
</template>

<script>
  export default {
    name: 'GameInfo.vue',
    methods: {
      restartGame() {
        this.$eventHub.$emit('newGame');
      },
    },
  }
</script>

<style lang="scss">
  .game-info {
    border: 1px solid gray;
  }
</style>
