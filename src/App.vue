<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";
import MobileSettings from "./components/MobileSettings.vue";
import TranslationExercise from "./components/TranslationExercise.vue";
import { useColorScheme } from "./composables/useColorScheme";
import { useI18n } from "./composables/useI18n";
import { useTranslationPractice } from "./composables/usePractice";
import { getPeppaNotesPage } from "./data/peppaNotesPageMap";
import { getPeppaNotesPages } from "./data/peppaNotesPageGroups";
import { getEnglishVoices, speakEnglishSequence, stopSpeech, toggleSpeechPause } from "./services/speech";
import type { PracticeKind, SpeechSegment } from "./types/practice";

const colorScheme = useColorScheme();
const { t } = useI18n();
const savedCharacterMatchPercentValue = localStorage.getItem("new-concept-character-match-percent");
const savedCharacterMatchPercent = savedCharacterMatchPercentValue === null ? Number.NaN : Number(savedCharacterMatchPercentValue);
const characterMatchPercent = ref(Number.isFinite(savedCharacterMatchPercent) && savedCharacterMatchPercent >= 0 && savedCharacterMatchPercent <= 100
  ? savedCharacterMatchPercent
  : 50);
const savedAutoAdvanceErrors = localStorage.getItem("new-concept-auto-advance-errors");
const autoAdvanceErrors = ref(savedAutoAdvanceErrors !== "false");

const practice = useTranslationPractice(characterMatchPercent);

const savedPracticeKind = localStorage.getItem("new-concept-practice-kind");
const practiceKind = ref<PracticeKind>(savedPracticeKind === "famous-quotes" || savedPracticeKind === "daily-dialog" || savedPracticeKind === "interview-sentences" ? savedPracticeKind : "famous-quotes");

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
const notesVisible = ref(false);
const activeNotesSource = ref<"primary" | "secondary">("primary");

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

function extractPeppaEpisodeNumber(title: string, firstItemId?: string) {
  const titleMatch = title.match(/S\d+E(\d{1,2})/i);
  if (titleMatch) return Number(titleMatch[1]);
  const itemMatch = firstItemId?.match(/s\d+e(\d{1,2})/i);
  if (itemMatch) return Number(itemMatch[1]);
  return 1;
}

const currentLessonIndex = computed(() =>
  practice.visibleLessons.value.findIndex((lesson) => lesson.number === practice.selectedLesson.value)
);

const peppaEpisodeNumber = computed(() =>
  extractPeppaEpisodeNumber(practice.lesson.value.title, practice.lesson.value.items[0]?.id)
);

const notesPages = computed<number[]>(() =>
  activeNotesSource.value === "secondary"
    ? getPeppaNotesPages(peppaEpisodeNumber.value, activeNotesSource.value)
    : [getPeppaNotesPage(peppaEpisodeNumber.value)]
);

const notesHasContent = computed(() => notesPages.value.length > 0);

const notesViewerKey = computed(() => `${activeNotesSource.value}-${practice.selectedLesson.value}-${peppaEpisodeNumber.value}-${notesPages.value.join("-") || "none"}`);

const notesImageUrls = computed(() =>
  activeNotesSource.value === "secondary"
    ? notesPages.value.map((_, index) =>
      `/peppa-notes-snaps-alt/s1e${String(peppaEpisodeNumber.value).padStart(2, "0")}-p${String(index + 1).padStart(2, "0")}.jpg?v=${notesViewerKey.value}`
    )
    : [`/peppa-notes-snaps/s1e${String(peppaEpisodeNumber.value).padStart(2, "0")}.jpg?v=${notesViewerKey.value}`]
);

const notesSourceLabel = computed(() =>
  activeNotesSource.value === "primary" ? t("notesDialog.sourcePrimary") : t("notesDialog.sourceSecondary")
);

function openNotes() {
  activeNotesSource.value = "primary";
  notesVisible.value = true;
}

function openAltNotes() {
  activeNotesSource.value = "secondary";
  notesVisible.value = true;
}

function switchNotesLesson(offset: number) {
  const total = practice.visibleLessons.value.length;
  if (!total) return;
  const nextIndex = (currentLessonIndex.value + offset + total) % total;
  const nextLesson = practice.visibleLessons.value[nextIndex];
  if (!nextLesson) return;
  practice.selectedLesson.value = nextLesson.number;
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
        @open-notes="openNotes"
        @open-alt-notes="openAltNotes"
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

      <el-dialog
        v-model="notesVisible"
        class="lesson-notes-dialog"
        width="calc(100% - 20px)"
        append-to-body
        destroy-on-close
        align-center
      >
        <template #header>
          <div class="lesson-notes-header">
            <div class="lesson-notes-header-main">
              <strong>{{ practice.lesson.value.title }}</strong>
              <small>
                {{ t("notesDialog.episode", { episode: peppaEpisodeNumber }) }} · {{ notesSourceLabel }}
                <template v-if="notesHasContent"> · {{ t("notesDialog.page", { page: notesPages[0] }) }} · {{ t("notesDialog.pageCount", { count: notesPages.length }) }}</template>
              </small>
            </div>
            <div class="lesson-notes-header-actions">
              <button class="mobile-nav-button" type="button" :title="t('notesDialog.prev')" @click="switchNotesLesson(-1)">
                <el-icon><ArrowLeft /></el-icon>
              </button>
              <button class="mobile-nav-button" type="button" :title="t('notesDialog.next')" @click="switchNotesLesson(1)">
                <el-icon><ArrowRight /></el-icon>
              </button>
            </div>
          </div>
        </template>

        <div class="lesson-notes-body">
          <div v-if="notesHasContent" class="lesson-notes-pages">
            <img
              v-for="(url, index) in notesImageUrls"
              :key="`${notesViewerKey}-${index}`"
              :src="url"
              :alt="`${practice.lesson.value.title} - ${index + 1}`"
              class="lesson-notes-image"
              loading="lazy"
            />
          </div>
          <div v-else class="lesson-notes-empty">{{ t("notesDialog.empty") }}</div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
