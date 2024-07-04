<template>
  <div class="tabulature-column" :class="{
    'highlighted': isHighlighted
  }"  @click="chooseTabulatureColumn">
    <span v-for="(item, index) in tabulatureColumnDisplay" :key="`${item}-${index}${Math.random()}`">{{ item }}</span>
  </div>
</template>

<script setup lang="ts">
import {useGuitarStore} from "../store/guitar-store.ts";
import {computed, ref, watch} from "vue";
import {storeToRefs} from "pinia";

const props = defineProps<{
  position: number
}>()

const INITIAL_TABULATURE_STATE = [
    "-",
    "-",
    "-",
    "-",
    "-",
    "-"
]

const guitarStore = useGuitarStore()
const { tabulatureColumnChosenPosition, tabulature } = storeToRefs(guitarStore);
const tabulatureColumnDisplay = ref<[]>(INITIAL_TABULATURE_STATE);


const isHighlighted = computed(() => {
  return tabulatureColumnChosenPosition.value === props.position;
})

const chooseTabulatureColumn = () => {
  guitarStore.chooseTabulatureColumn(props.position);
}

watch(tabulature, (newVal) => {
  if (!newVal.some(item => item.position === props.position)) {
    tabulatureColumnDisplay.value = [...INITIAL_TABULATURE_STATE];
  } else {
    newVal.forEach((item) => {
      if (item.position === props.position) {
        tabulatureColumnDisplay.value[item.string] = item.fret;
      }
    });
  }
}, {deep: true});

</script>

<style scoped>
.tabulature-column {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  cursor: pointer;
  padding:  0.2rem;
  &:hover {
    background-color: rgba(255, 255, 255, 0.12);
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.87);
  }
}
.highlighted {
  background-color: rgba(255, 255, 255, 0.12);
}

</style>