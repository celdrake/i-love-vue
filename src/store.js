import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const GAME_SIZE = 4;

const fillRandomPattern = (matrix, patternSize) => {
  const totalTiles = matrix.length * 2;
  let leftPatternTiles = patternSize;
  while (leftPatternTiles > 0) {
    const newRowRandom = Math.round(Math.random() * (totalTiles - 1));
    const newColumnRandom = Math.round(Math.random() * (totalTiles - 1));
    if (newRowRandom >= matrix.length ||
      newColumnRandom >= matrix.length) {
      // Avoid going above the matrix boundaries due to rounding
      continue; // eslint-disable-line no-continue
    }
    // Only update the count when the cell does not already have a pattern
    const cell = matrix[newRowRandom][newColumnRandom];
    if (cell.content !== 'pattern') {
      cell.content = 'pattern';
      leftPatternTiles -= 1;
    }
  }
};

const initMatrix = (gameSize) => {
  const matrix = [];
  for (let row = 0; row < gameSize; row += 1) {
    const rowColumns = [];
    for (let col = 0; col < gameSize; col += 1) {
      rowColumns.push({
        display: true,
        // values: empty / pattern / click-error / click-success
        content: 'empty',
      });
    }
    matrix.push(rowColumns);
  }
  fillRandomPattern(matrix, GAME_SIZE);
  return matrix;
};

const gameState = {
  gameSize: GAME_SIZE,
  revealedTiles: 0,
  successTiles: 0,
  matrix: initMatrix(GAME_SIZE),
};

export default new Vuex.Store({
  state: gameState,
  actions: {
    newGame(context) {
      const newMatrix = initMatrix(GAME_SIZE);
      context.commit('updateMatrix', newMatrix);
      context.commit('setRevealedTiles', {
        revealed: 0,
        success: 0,
      });

      setTimeout(() => {
        context.dispatch('togglePatternVisibility');
      }, 2500);
    },
    togglePatternVisibility(context, doShow) {
      // Opción 1: usando Array.map
      const updatedCell = (cell) => Object.assign({}, cell, { display: doShow });
      const updatedMatrix = context.state.matrix.map((row) => {
        return row.map(updatedCell);
      });

      // Opción 2: generando un nuevo array manualmente
      // const updatedMatrix = [];
      // state.matrix.forEach((matrixRow) => {
      //   const updatedRow = [];
      //   matrixRow.forEach((rowCell) => {
      //     updatedRow.push(updatedCell((rowCell)));
      //   });
      //   updatedMatrix.push(updatedRow);
      // });
      context.commit('updateMatrix', updatedMatrix);
    },
    revealTile(context, tile) {
      const state = context.state;
      if (state.revealedTiles === state.gameSize) {
        return;
      }
      const isSuccess = tile.content === 'pattern';
      const totalRevealed = state.revealedTiles + 1;
      // We mutate the state directly, so not using an action here
      tile.content = isSuccess ? 'click-success' : 'click-error';
      tile.display = true;
      context.commit('setRevealedTiles', {
        revealed: totalRevealed,
        success: state.successTiles + (isSuccess ? 1 : 0)
      });
    },
  },
  mutations: {
    updateMatrix(state, newMatrix) {
      state.matrix = newMatrix;
    },
    setRevealedTiles(state, result) {
      state.revealedTiles = result.revealed;
      state.successTiles = result.success;
    },
  },
})
