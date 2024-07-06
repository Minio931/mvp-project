
<template>
<div class="note" @click="addTabulatureItem">
  <span class="note__sign">{{ sign }}</span>
</div>
</template>

<script setup lang="ts">
import {useGuitarStore} from "../../store/guitar-store.ts";
import {computed, onMounted, ref} from "vue";
import {storeToRefs} from "pinia";
import {Tabulature} from "../../types/tabulature.ts";

const props =defineProps<{
  sign: string,
  fret: string,
  string: number
}>();

const audio = ref<HTMLAudioElement>();
const audioUrl = ref("");
const audioModule = ref<unknown>();
const guitarStore = useGuitarStore();
const { tabulatureColumnChosenPosition } = storeToRefs(guitarStore);

const tabulatureItem = computed(() => {
  return {
    fret: props.fret,
    string: props.string,
    note: props.sign,
    position: tabulatureColumnChosenPosition.value
  }
})

const addTabulatureItem = () => {
  //@ts-ignore
  guitarStore.addTabulatureItem(tabulatureItem.value as Tabulature);
  playNote();
}

const playNote =  () => {
  if (audio.value) {
    audio.value.play();
  }
}


onMounted(async () => {
  let note = guitarStore.convertSignToAudioFileFormat(props.sign);
  const octave = guitarStore.calculateOctave(props.fret);
  note = `${note}${octave}`;
  const url = `../../assets/music-notes/${note}.mp3`;
  audioModule.value = await import(url);
  //@ts-ignore
  audioUrl.value = audioModule.value.default;
  audio.value = new Audio(audioUrl.value);
})

</script>

<style lang="scss" scoped>
.note {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid white;
  border-radius: 50%;
  background-color:  #5c332f;
  cursor: pointer;
  &:hover {
    background-color:  white;
    color: #5c332f;
  }
  &__sign {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 1.15rem;
    font-weight: bold;
    color: var(--color-text-primary);
  }
}
</style>