import {defineStore} from "pinia";
import {ref} from "vue";
import {Tabulature} from "../types/tabulature.ts";
import {jsPDF} from "jspdf";
import {TabulaturePDF} from "../types/TabulaturePDF.ts";


export const useGuitarStore = defineStore("useGuitarStore", () => {
    const tabulatureColumnChosenPosition = ref<number>(1);
    const tabulature = ref<Tabulature[]>([]);
    const audio = ref<HTMLAudioElement>();

    const addTabulatureItem = (item: Tabulature) => {
        tabulature.value.push(item);
        tabulatureColumnChosenPosition.value = tabulatureColumnChosenPosition.value + 1;
    }

    const chooseTabulatureColumn = (position: number) => {
        tabulatureColumnChosenPosition.value = position;
    }

    const removeFromPosition = () => {
        tabulature.value = tabulature.value.filter((item) => {
            return item.position !== tabulatureColumnChosenPosition.value;
        });
        tabulatureColumnChosenPosition.value = tabulatureColumnChosenPosition.value - 1 > -1 ? tabulatureColumnChosenPosition.value - 1 : 1;
    }

    const resetTabulature = () => {
        tabulature.value = [];
        tabulatureColumnChosenPosition.value = 1;
    }

    const convertSignToAudioFileFormat = (sign: string) => {
        return sign.toLowerCase().replace("#", "-");
    }

    const calculateOctave = (fret: string) => {
        const fretNumber = parseInt(fret);
        switch (fretNumber) {
            case 0:
            case 1:
            case 2:
            case 5:
            case 6:
                return "3";
            case 3:
            case 4:
            case 7:
                return "4";
            default:
                return "5";
        }
    }

    const playTabulature = async () => {
        const tabulatureSorted = tabulature.value.sort((a, b) => a.position - b.position);
        const filteredTabulature = tabulatureSorted.filter((item: Tabulature) => item.position >= tabulatureColumnChosenPosition.value);

        for (const item of filteredTabulature) {
                let note = convertSignToAudioFileFormat(item.note);
                //@ts-ignore
                const octave = calculateOctave(item.fret);
                note = `${note}${octave}`;
                const url = `../assets/music-notes/${note}.mp3`;
                const audioModule = await import(url);
                audio.value = new Audio(audioModule.default);
                try {
                    await audio.value.play();
                    await new Promise(resolve => setTimeout(resolve, 500));
                } catch (e) {
                    console.error(e);
                }
                chooseTabulatureColumn(item.position + 1);
        }
    }

    const playFromBeginning = async () => {
        chooseTabulatureColumn(1);
        await playTabulature();
    }

    const generatePdf = async () => {
        const tabulatureSorted = tabulature.value.sort((a, b) => a.position - b.position);
        const firstString = tabulatureSorted.filter((item: Tabulature) => item.string === 0);
        const secondString = tabulatureSorted.filter((item: Tabulature) => item.string === 1);
        const thirdString = tabulatureSorted.filter((item: Tabulature) => item.string === 2);
        const fourthString = tabulatureSorted.filter((item: Tabulature) => item.string === 3);
        const fifthString = tabulatureSorted.filter((item: Tabulature) => item.string === 4);
        const sixthString = tabulatureSorted.filter((item: Tabulature) => item.string === 5);
        const pdf = new jsPDF();
        const array = generateArrayOfTabulature();
        let firstStringContent = generateStingPdfContent(array.firstString, firstString);
        let secondStringContent = generateStingPdfContent(array.secondString, secondString);
        let thirdStringContent = generateStingPdfContent(array.thirdString, thirdString);
        let fourthStringContent = generateStingPdfContent(array.fourthString, fourthString);
        let fifthStringContent = generateStingPdfContent(array.fifthString, fifthString);
        let sixthStringContent = generateStingPdfContent(array.sixthString, sixthString);

        pdf.text(firstStringContent, 10, 10);
        pdf.text(secondStringContent, 10, 20);
        pdf.text(thirdStringContent, 10, 30);
        pdf.text(fourthStringContent, 10, 40);
        pdf.text(fifthStringContent, 10, 50);
        pdf.text(sixthStringContent, 10, 60);
        pdf.save("tabulature.pdf");
    }

    const generateStingPdfContent = (array: any, stringArray: Tabulature[]) => {
        let pdfContent = "";
        let arrayToModify = array;
        stringArray.forEach((item:Tabulature ) => {
            arrayToModify[item.position - 1] = item.fret;
        });
        pdfContent = arrayToModify.join("");
        return pdfContent;
    }


    const findLastPosition = () => {
        const tabulatureSorted = tabulature.value.sort((a, b) => a.position - b.position);
        return tabulatureSorted[tabulatureSorted.length - 1].position;
    }

    const generateArrayOfTabulature = () => {
        const lastPosition = findLastPosition();
        const array: TabulaturePDF = {
            firstString: [],
            secondString: [],
            thirdString: [],
            fourthString: [],
            fifthString: [],
            sixthString: []
        };

        for (let i = 1; i <= lastPosition; i++) {
            array.firstString.push("-")
            array.secondString.push("-")
            array.thirdString.push("-")
            array.fourthString.push("-")
            array.fifthString.push("-")
            array.sixthString.push("-")
        }

        return array;
    }


    return {
        tabulature,
        tabulatureColumnChosenPosition,
        addTabulatureItem,
        chooseTabulatureColumn,
        removeFromPosition,
        resetTabulature,
        convertSignToAudioFileFormat,
        calculateOctave,
        playTabulature,
        playFromBeginning,
        generatePdf
    }

})