<template>
<button class="action-button">
  <slot>
  </slot>
</button>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.action-button {
  background-color: transparent;
  width: 3rem;
  height: 3rem;
  padding: 0.5rem;
  border-radius: 100%;
  font-size: 1.5rem;
  color: white;
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: black;
  }
  svg {
    width: 100%;
    height: 100%;
  }
}
</style>