<template>
  <div class="game-tile" :class="tileClasses" @click="tileClick" />
</template>

<script>
  export default {
    name: 'GameTile.vue',
    props: {
      tile: {
        type: Object,
        required: true,
      },
    },
    computed: {
      tileClasses() {
        return {
          ['is-revealed']: this.tile.display,
          [`has-${this.tile.content}`]: true,
        };
      }
    },
    methods: {
      tileClick() {
        this.$store.dispatch('revealTile', this.tile);
      },
    },
  };
</script>

<style lang="scss">
  .game-tile {
    padding: 1.5em;
    background: #3a2a25;
    color: white;
    margin: 0;
    border: 2px solid gray;
    border-collapse: collapse;

    &.is-revealed {
      &.has-pattern {
        background-color: blue;
      }
      &.has-click-success {
        background-color: limegreen;
      }
      &.has-click-error {
        background-color: crimson;
      }
    }
  }
</style>
