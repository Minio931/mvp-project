<template>
<div class="starting-notes">
  <span>E</span>
  <span>B</span>
  <span>G</span>
  <span>D</span>
  <span>A</span>
  <span>E</span>
</div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.starting-notes {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 2rem;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 1.5rem;
    color: var(--color-text-primary);
  }
}
</style>