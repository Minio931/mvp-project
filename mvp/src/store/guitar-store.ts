import {defineStore} from "pinia";
import {ref} from "vue";
import {Tabulature} from "../types/tabulature.ts";


export const useGuitarStore = defineStore("useGuitarStore", () => {
    const tabulatureColumnChosenPosition = ref<number>(1);
    const tabulature = ref<Tabulature[]>([]);

    const addTabulatureItem = (item: Tabulature) => {
        tabulature.value.push(item);
        tabulatureColumnChosenPosition.value = tabulatureColumnChosenPosition.value + 1;
    }

    const chooseTabulatureColumn = (position: number) => {
        tabulatureColumnChosenPosition.value = position;
    }

    return {
        tabulature,
        tabulatureColumnChosenPosition,
        addTabulatureItem,
        chooseTabulatureColumn
    }

})