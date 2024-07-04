<script setup lang="ts">
import TabulatureDisplay from "./components/TabulatureDisplay.vue";
import GuitarDisplay from "./components/GuitarDisplay.vue";
</script>

<template>
  <div class="app">
    <tabulature-display />
    <div class="guitar-display">
      <guitar-display />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100vdh;
}
.guitar-display {
  position: fixed;
  bottom: 10px;
  width: 60%;
  height: fit-content;
  background-color: #5c332f;
}

</style>
