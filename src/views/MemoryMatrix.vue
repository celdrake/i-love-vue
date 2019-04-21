<template>
  <div class="memory-matrix">
    <game-info />
    <game-box />
  </div>
</template>

<script>
  import GameBox from '@/components/GameBox.vue'
  import GameInfo from '@/components/GameInfo.vue'

  export default {
    name: 'MemoryMatrix',
    components: {
      GameBox,
      GameInfo,
    },
  };
</script>
