<template>
  <div class="fretboard-wrapper">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.fretboard-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 14rem;
  padding: 1rem 0.5rem;
  background-color: var(--color-background-primary);
}

</style>