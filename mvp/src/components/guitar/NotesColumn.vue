<template>
  <div class="notes-column">
    <single-note  v-for="(note, index) in notes" :key="`${note}-${index}`" :sign="note" :fret="fret" :string="index" />
  </div>

</template>

<script setup lang="ts">
import SingleNote from "./SingleNote.vue";
defineProps<{
  notes: string[];
  fret: string;
}>();
</script>

<style scoped lang="scss">
.notes-column {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  padding: 0 0.5rem;
}
</style>