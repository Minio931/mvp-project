<template>
  <div class="tabulature-display">
    <div class="tabulature-display__start">
      <span>E</span>
      <span>B</span>
      <span>G</span>
      <span>D</span>
      <span>A</span>
      <span>E</span>
    </div>
    <div class="vertical-divider"></div>
  </div>
</template>

<script setup lang="ts">

</script>


<style lang="scss" scoped>
.tabulature-display {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  background-color: var(--color-background-primary);
  &__start {
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
}

</style>