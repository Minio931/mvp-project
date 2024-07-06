<template>
<div class="actions-panel">
  <action-button @click="playTabulatureHandler">  <IconPlayerPlay size="2rem" /> </action-button>
  <action-button @click="playFromBeginningHandler">  <IconRestore size="2rem" /> </action-button>
  <action-button @click="removeHandler"> <IconCircleMinus size="2rem" /> </action-button>
  <action-button @click="resetHandler"> <IconTrash size="2rem" /> </action-button>
  <action-button @click="generatePdfHandler"> <IconDownload size="2rem" /> </action-button>
 </div>
</template>

<script setup lang="ts">
import { IconCircleMinus } from '@tabler/icons-vue';
import { IconRestore } from '@tabler/icons-vue';
import { IconPlayerPlay } from '@tabler/icons-vue';
import { IconTrash } from '@tabler/icons-vue';
import { IconDownload } from '@tabler/icons-vue';
import ActionButton from "./ActionButton.vue";
import {useGuitarStore} from "../../store/guitar-store.ts";

const guitarStore = useGuitarStore();

const removeHandler = () => {
  guitarStore.removeFromPosition();
};

const resetHandler = () => {
  guitarStore.resetTabulature();
};

const playTabulatureHandler = () => {
  guitarStore.playTabulature();
}

const playFromBeginningHandler = () => {
  guitarStore.playFromBeginning();
}

const generatePdfHandler = () => {
  guitarStore.generatePdf();
}
</script>

<style scoped lang="scss">
.actions-panel {
  display: flex;
  gap: 1rem;
  position: absolute;
  top: -5rem;
  left: 50%;
  transform: translateX(-50%);
}

</style>