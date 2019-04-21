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
  export default {
    name: 'GameBox.vue',
    data() {
      return {
        matrix: this.initMatrix(4),
      };
    },
    methods: {
      resetMatrix() {
        const newMatrix = this.initMatrix(4);
        this.matrix = newMatrix;
      },
      initMatrix(gameSize) {
        const matrix = [];
        for (let row = 0; row < gameSize; row += 1) {
          const rowColumns = [];
          for (let col = 0; col < gameSize; col += 1) {
            rowColumns.push({
              display: true,
              content: Date.now() % 1000,
            });
          }
          matrix.push(rowColumns);
        }
        return matrix;
      },
    },
    created() {
      this.$eventHub.$on('newGame', this.resetMatrix);
    },
    destroyed() {
      this.$eventHub.$off('newGame', this.resetMatrix);
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
