import { TCourse } from "../types/types";

const getVoices = (lang: TCourse) => {

    if (lang === "regentish" as TCourse) return 'pt-BR';
    if (lang === "shatan" as TCourse) return 'he-IL';
    if (lang === "crvenagorski" as TCourse) {
        return 'bs-BA';
    };

    return 'en-US';
}

export const handleSpeech = (pronunciation: string, lang: TCourse) => {
    const utterance = new SpeechSynthesisUtterance(
        pronunciation ? pronunciation : ''
    );
    utterance.lang = getVoices(lang);

    speechSynthesis.speak(utterance);
};