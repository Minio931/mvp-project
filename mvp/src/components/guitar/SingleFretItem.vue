<template>
    <div class="fret-item">
      <span>{{ fret }}</span>
      <notes-column :notes="notes" :fret="fret" />
    </div>
    <div v-if="fret != '12'" class="vertical-divider"></div>
</template>

<script setup lang="ts">
import NotesColumn from "./NotesColumn.vue";
defineProps<{
  fret: string;
  notes: string[];
  length?: number;
}>();

</script>

<style scoped lang="scss">
.fret-wrapper {
  display: flex;
  gap: 0.65rem;
  position: relative;
  width: 100%;
}
.fret-item {
  display: flex;
  position: relative;
  span {
    position: absolute;
    top: -1.25rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.25rem;
    color: var(--primary-color);
    font-weight: bold;
  }
}

</style>