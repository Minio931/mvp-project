<template>
  <fretboard-wrapper ref="tabulatureDisplayRef" class="tabulature-display">
    <div class="tabulature-display__start">
      <starting-notes />
      <div class="vertical-divider"></div>
    </div>
    <tabulature-column v-for="i in numberOfTabulatureColumnsToRender" :key="i" :position="i" />
  </fretboard-wrapper>
</template>

<script setup lang="ts">
import TabulatureColumn from "./TabulatureColumn.vue";
import {onMounted, ref} from "vue";
import StartingNotes from "./shared/StartingNotes.vue";
import FretboardWrapper from "./shared/FretboardWrapper.vue";

const tabulatureDisplayRef = ref<HTMLDivElement | null>(null);
const numberOfTabulatureColumnsToRender = ref(0);

const calculateNumberOfTabulatureColumnsToRender = () => {
  if (tabulatureDisplayRef.value) {
    //@ts-ignore
    return (tabulatureDisplayRef.value.$el.clientWidth - 36) / (1.25 * 16);
  }
}

onMounted(() => {
  const numberToRender = calculateNumberOfTabulatureColumnsToRender() ?? 0;
  numberOfTabulatureColumnsToRender.value = Math.floor( numberToRender ) - 1;
})
</script>


<style lang="scss" scoped>
.tabulature-display {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 14rem;
  padding: 1rem 0.5rem;
  overflow: hidden;
  background-color: var(--color-background-primary);
  &__start {
    display: flex;
    height: 100%;
    width: 3rem;
    padding: 0.5rem;
  }
}

</style>