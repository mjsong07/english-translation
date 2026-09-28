<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import MobileSettings from "./components/MobileSettings.vue";
import TranslationExercise from "./components/TranslationExercise.vue";
import { useColorScheme } from "./composables/useColorScheme";
import { useTranslationPractice } from "./composables/usePractice";
import { getEnglishVoices, speakEnglishSequence, stopSpeech, toggleSpeechPause } from "./services/speech";
import type { PracticeKind, SpeechSegment } from "./types/practice";

const colorScheme = useColorScheme();
const savedCharacterMatchPercentValue = localStorage.getItem("new-concept-character-match-percent");
const savedCharacterMatchPercent = savedCharacterMatchPercentValue === null ? Number.NaN : Number(savedCharacterMatchPercentValue);
const characterMatchPercent = ref(Number.isFinite(savedCharacterMatchPercent) && savedCharacterMatchPercent >= 0 && savedCharacterMatchPercent <= 100
  ? savedCharacterMatchPercent
  : 50);
const savedAutoAdvanceErrors = localStorage.getItem("new-concept-auto-advance-errors");
const autoAdvanceErrors = ref(savedAutoAdvanceErrors !== "false");

const practice = useTranslationPractice(characterMatchPercent);

const savedPracticeKind = localStorage.getItem("new-concept-practice-kind");
const practiceKind = ref<PracticeKind>(savedPracticeKind === "famous-quotes" || savedPracticeKind === "daily-dialog" || savedPracticeKind === "interview-sentences" ? savedPracticeKind : "all");

watch(practiceKind, (value) => {
  practice.practiceKind.value = value;
  localStorage.setItem("new-concept-practice-kind", value);
}, { immediate: true });

const voices = ref<SpeechSynthesisVoice[]>([]);
const voiceUri = ref(localStorage.getItem("new-concept-speech-voice") || "");
const savedSpeechRate = Number(localStorage.getItem("new-concept-speech-rate"));
const speechRate = ref(Number.isFinite(savedSpeechRate) && savedSpeechRate >= 0.1 && savedSpeechRate <= 1.5 ? savedSpeechRate : 0.85);
const savedSpeechVolumeValue = localStorage.getItem("new-concept-speech-volume");
const savedSpeechVolume = savedSpeechVolumeValue === null ? Number.NaN : Number(savedSpeechVolumeValue);
const speechVolume = ref(Number.isFinite(savedSpeechVolume) && savedSpeechVolume >= 0 && savedSpeechVolume <= 1 ? savedSpeechVolume : 0.6);
const speechActive = ref(false);
const speechPaused = ref(false);
const activeSpeechItemId = ref("");
const displayMode = ref<"translation" | "bilingual" | "original">("translation");

function refreshVoices() {
  voices.value = getEnglishVoices();
  if (voices.value.length && !voices.value.some((voice) => voice.voiceURI === voiceUri.value)) {
    voiceUri.value = voices.value.find((voice) => /\bKaren\b/i.test(voice.name))?.voiceURI || voices.value[0].voiceURI;
  }
}

const lessonSpeechSegments = computed<SpeechSegment[]>(() =>
  practice.lessonItems.value.map((item) => ({ text: item.answer, itemId: item.id, speaker: item.speakerEn }))
);

function speak(segments: SpeechSegment[]) {
  activeSpeechItemId.value = "";
  speechPaused.value = false;
  speakEnglishSequence(segments, { voiceURI: voiceUri.value, rate: speechRate.value, volume: speechVolume.value }, {
    onStart: () => { speechActive.value = true; },
    onSegmentStart: (segment) => { activeSpeechItemId.value = segment.itemId || ""; },
    onEnd: () => {
      speechActive.value = false;
      speechPaused.value = false;
      activeSpeechItemId.value = "";
    }
  });
}

function readAll() {
  speak(lessonSpeechSegments.value);
}

function toggleSpeech() {
  speechPaused.value = toggleSpeechPause(!speechPaused.value);
}

watch(voiceUri, (value) => localStorage.setItem("new-concept-speech-voice", value));
watch(speechRate, (value) => localStorage.setItem("new-concept-speech-rate", String(value)));
watch(speechVolume, (value) => localStorage.setItem("new-concept-speech-volume", String(value)));
watch(characterMatchPercent, (value) => localStorage.setItem("new-concept-character-match-percent", String(value)));
watch(autoAdvanceErrors, (value) => localStorage.setItem("new-concept-auto-advance-errors", String(value)));

onMounted(() => {
  refreshVoices();
  window.speechSynthesis?.addEventListener("voiceschanged", refreshVoices);
});

onUnmounted(() => {
  window.speechSynthesis?.removeEventListener("voiceschanged", refreshVoices);
  stopSpeech();
});
</script>

<template>
  <div class="app-shell">
    <div class="workspace">
      <MobileSettings
        :lessons="practice.visibleLessons.value"
        :lesson-number="practice.selectedLesson.value"
        :lesson-title="practice.lesson.value.title"
        :lesson-completed="practice.lessonCompleted.value"
        :lesson-count="practice.lessonItems.value.length"
        :color-scheme="colorScheme.mode.value"
        :voice-uri="voiceUri"
        :speech-rate="speechRate"
        :speech-volume="speechVolume"
        :voices="voices"
        :character-match-percent="characterMatchPercent"
        :auto-advance-errors="autoAdvanceErrors"
        :practice-kind="practiceKind"
        @update:lesson-number="practice.selectedLesson.value = $event"
        @update:practice-kind="practiceKind = $event"
        @update:color-scheme="colorScheme.mode.value = $event"
        @update:voice-uri="voiceUri = $event"
        @update:speech-rate="speechRate = $event"
        @update:speech-volume="speechVolume = $event"
        @update:character-match-percent="characterMatchPercent = $event"
        @update:auto-advance-errors="autoAdvanceErrors = $event"
        @read-all="readAll"
        @reset="practice.resetLesson"
      />

      <TranslationExercise
        :lesson-number="practice.lesson.value.number"
        :lesson-title="practice.lesson.value.title"
        :lesson-title-zh="practice.lesson.value.titleZh"
        :items="practice.lessonItems.value"
        :answers="practice.answers.value"
        :results="practice.results.value"
        :completed-ids="practice.progress.value.completed"
        :display-mode="displayMode"
        :mistake-history="practice.lessonMistakeHistory.value"
        :speech-active="speechActive"
        :speech-paused="speechPaused"
        :active-speech-item-id="activeSpeechItemId"
        :auto-advance-errors="autoAdvanceErrors"
        :character-match-percent="characterMatchPercent"
        @update:display-mode="displayMode = $event"
        @update:answer="practice.updateAnswer"
        @submit="practice.submit"
        @clear="practice.clearAnswer"
        @speak="speak"
        @toggle-speech="toggleSpeech"
      />
    </div>
  </div>
</template>
