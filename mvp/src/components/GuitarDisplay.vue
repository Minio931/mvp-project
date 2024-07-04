<template>
<fretboard-wrapper >
  <starting-notes />
  <div class="vertical-divider"></div>
  <div class="guitar-strings">
    <div class="guitar-string-container">
      <div class="guitar-string"> </div>
    </div>
    <div class="guitar-string-container">
      <div class="guitar-string"> </div>
    </div>
    <div class="guitar-string-container">
      <div class="guitar-string"> </div>
    </div>
    <div class="guitar-string-container">
      <div class="guitar-string"> </div>
    </div>
    <div class="guitar-string-container">
      <div class="guitar-string"> </div>
    </div>
    <div class="guitar-string-container">
      <div class="guitar-string"> </div>
    </div>
  </div>
  <div class="guitar-fretboard-notes">
    <single-fret-item :length="fretNotesLength"  v-for="(fretNoteGroup, index) in fretNotes" :key="index" :fret="index" :notes="fretNoteGroup" />
  </div>
</fretboard-wrapper>
</template>

<script setup lang="ts">
import FretboardWrapper from "./shared/FretboardWrapper.vue";
import StartingNotes from "./shared/StartingNotes.vue";
import SingleFretItem from "./guitar/SingleFretItem.vue";
import { config } from "../config/config.ts"
import { computed } from "vue";

const fretNotes = computed(() => config.notes)
const fretNotesLength = computed(() => Object.keys(fretNotes.value).length)

</script>

<style lang="scss" scoped>
.guitar-strings {
  z-index: 0;
  position: absolute;
  left: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  gap: 0.75rem;
  width: 90%;
  height: 100%;
  .guitar-string {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 1px;
    border: 1px solid rgba(255, 255, 255, 0.58);
    border-radius: 50%;
    &-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 1.5rem;
    }
  }
}
.guitar-fretboard-notes {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  z-index: 1;
  padding-right: 0.75rem;
}

</style>