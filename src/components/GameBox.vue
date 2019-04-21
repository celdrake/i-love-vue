<template>
  <div class="game-box">
    <div class="game-box__row" v-for="(row, rowIndex) in matrix" :key="rowIndex">
      <div class="game-box__tile" v-for="(cell, cellIndex) in row" :key="cellIndex">
        {{ cell.content }}
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: 'GameBox.vue',
    computed: {
      ...mapState({
        matrix: (state) => state.matrix,
      }),
    },
    methods: {

    },
  };
</script>

<style lang="scss">
  .game-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-direction: column;
    &__row {
      display: flex;
      flex-wrap: nowrap;
      overflow: hidden;
      transition: all .2s ease-out;
    }
    &__tile {
      padding: 1.5em;
      background: #3a2a25;
      color: white;
      margin: 0;
      border: 2px solid gray;
      border-collapse: collapse;
    }
  }
</style>
