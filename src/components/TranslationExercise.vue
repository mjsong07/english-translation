<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import { CircleCheckFilled, Delete, Headset, Histogram, VideoPause, VideoPlay } from "@element-plus/icons-vue";
import { useI18n } from "../composables/useI18n";
import { evaluateAnswer } from "../services/text";
import type { AnswerFeedback, DisplayMode, ExerciseItem, MistakeHistoryEntry, SpeechSegment } from "../types/practice";

const props = defineProps<{
  lessonNumber: number;
  lessonTitle: string;
  lessonTitleZh: string;
  items: ExerciseItem[];
  answers: Record<string, string>;
  results: Record<string, AnswerFeedback>;
  completedIds: string[];
  displayMode: DisplayMode;
  mistakeHistory: MistakeHistoryEntry[];
  speechActive: boolean;
  speechPaused: boolean;
  activeSpeechItemId: string;
  autoAdvanceErrors: boolean;
  characterMatchPercent: number;
}>();

const { locale, t } = useI18n();

const emit = defineEmits<{
  "update:displayMode": [value: DisplayMode];
  "update:answer": [id: string, value: string];
  submit: [id: string];
  clear: [id: string];
  speak: [segments: SpeechSegment[], pauseAfterFirst?: boolean];
  "toggle-speech": [];
}>();

const editedIds = new Set<string>();
const errorAnchors = new Map<string, number>();
const historyVisible = ref(false);
const historyFocusItemId = ref("");
const completedSet = computed(() => new Set(props.completedIds));

const lessonSpeechSegments = computed<SpeechSegment[]>(() =>
  props.items.map((item) => ({ text: item.answer, itemId: item.id, speaker: item.speakerEn }))
);

type TextareaInput = { focus: () => void; textarea?: HTMLTextAreaElement };
const inputRefs = ref<Record<string, TextareaInput | null>>({});

function setInputRef(id: string, instance: unknown) {
  inputRefs.value[id] = instance as TextareaInput | null;
}

watch(() => props.lessonNumber, () => {
  editedIds.clear();
  errorAnchors.clear();
});

function focusItem(id?: string) {
  if (!id) return;
  inputRefs.value[id]?.focus();
}

function submitAndAdvance(item: ExerciseItem, input: HTMLTextAreaElement) {
  const answer = props.answers[item.id] || "";
  editedIds.delete(item.id);
  if (!answer.trim()) return;
  emit("submit", item.id);
  nextTick(() => {
    const result = props.results[item.id];
    if (result?.level === "correct") {
      errorAnchors.delete(item.id);
      const currentIndex = props.items.findIndex((candidate) => candidate.id === item.id);
      const nextItemId = props.items[currentIndex + 1]?.id;
      focusItem(nextItemId);
      return;
    }
    selectError(item.id, input, result);
  });
}

function selectError(itemId: string, input: HTMLTextAreaElement, result?: AnswerFeedback) {
  const start = result?.firstErrorOffset || 0;
  const end = Math.max(start, result?.firstErrorEnd || start);
  input.setSelectionRange(start, end);
  errorAnchors.set(itemId, start);
}

function onKeydown(event: KeyboardEvent, item: ExerciseItem) {
  if (event.key !== "Enter" || event.isComposing || event.shiftKey) return;
  event.preventDefault();
  submitAndAdvance(item, event.currentTarget as HTMLTextAreaElement);
}

function onAnswerInput(id: string, value: string) {
  editedIds.add(id);
  emit("update:answer", id, value);
  if (props.autoAdvanceErrors) selectNextError(id, value);
}

function selectNextError(id: string, value: string) {
  const anchor = errorAnchors.get(id);
  if (anchor === undefined) return;
  const item = props.items.find((candidate) => candidate.id === id);
  const input = inputRefs.value[id]?.textarea;
  if (!item || !input) return;
  const caret = input.selectionStart ?? value.length;
  if (!/\s/.test(value.slice(caret - 1, caret))) return;
  const result = evaluateAnswer(value, item.answer, locale.value, props.characterMatchPercent / 100);
  if (result.level === "correct") {
    errorAnchors.delete(id);
    return;
  }
  const start = result.firstErrorOffset;
  const end = Math.max(start, result.firstErrorEnd);
  if (start === anchor || (caret >= start && caret <= end)) return;
  errorAnchors.set(id, start);
  nextTick(() => input.setSelectionRange(start, end));
}

async function onBlurSubmit(item: ExerciseItem) {
  if (!editedIds.has(item.id)) return;
  editedIds.delete(item.id);
  if (!(props.answers[item.id] || "").trim()) return;
  emit("submit", item.id);
  await nextTick();
}

function rowState(item: ExerciseItem) {
  const result = props.results[item.id];
  if (result?.level === "correct" || (!result && completedSet.value.has(item.id))) return "is-correct";
  if (result && result.level !== "idle") return "is-wrong";
  return "";
}

function itemLabel(item: ExerciseItem, index: number) {
  if (item.kind === "title") return t("exercise.titleShort");
  if (item.kind === "question") return t("exercise.questionShort");
  return String(index - props.items.filter((candidate) => candidate.kind !== "sentence" && candidate.kind).length + 1);
}

function itemAriaLabel(item: ExerciseItem, index: number) {
  if (item.kind === "title") return t("exercise.title");
  if (item.kind === "question") return t("exercise.question");
  return t("exercise.sentence", { number: itemLabel(item, index) });
}

function openHistory(itemId = "") {
  historyFocusItemId.value = itemId;
  historyVisible.value = true;
}

function speakFromSentence(item: ExerciseItem) {
  emit("speak", [{ text: item.answer, itemId: item.id, speaker: item.speakerEn }], false);
}

const historyGroups = computed(() => {
  const entriesByItem = new Map<string, MistakeHistoryEntry[]>();
  props.mistakeHistory.forEach((entry) => {
    if (historyFocusItemId.value && entry.itemId !== historyFocusItemId.value) return;
    const entries = entriesByItem.get(entry.itemId) || [];
    entries.push(entry);
    entriesByItem.set(entry.itemId, entries);
  });
  return props.items.flatMap((item, index) => {
    const entries = entriesByItem.get(item.id);
    if (!entries?.length) return [];
    return [{ item, label: itemLabel(item, index), entries: [...entries].sort((left, right) => left.createdAt - right.createdAt) }];
  });
});

function formatTime(timestamp: number) {
  return new Intl.DateTimeFormat(locale.value, { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).format(timestamp);
}
</script>

<template>
  <main class="exercise-card lesson-practice">
    <div class="exercise-topline">
      <div>
        <span class="lesson-kicker">LESSON {{ lessonNumber }}</span>
        <h1>{{ lessonTitle }}</h1>
      </div>
      <div class="lesson-sentence-count">{{ t('exercise.count', { count: items.length }) }}</div>
    </div>

    <el-tabs class="display-tabs" :model-value="displayMode" stretch @update:model-value="emit('update:displayMode', $event as DisplayMode)">
      <el-tab-pane :label="t('exercise.translation')" name="translation">
        <div class="translation-toolbar">
          <span>{{ t('exercise.scopeHint') }}</span>
          <div>
            <el-button text :icon="Histogram" @click="openHistory()">{{ t('exercise.history') }}</el-button>
            <el-button plain :icon="Headset" @click="emit('speak', lessonSpeechSegments)">{{ t('exercise.fullText') }}</el-button>
            <el-button v-if="speechActive" plain :icon="speechPaused ? VideoPlay : VideoPause" @click="emit('toggle-speech')">{{ speechPaused ? t('exercise.resume') : t('exercise.pause') }}</el-button>
          </div>
        </div>
        <div class="sentence-list translation-list">
          <article v-for="(item, index) in items" :key="item.id" class="sentence-row" :class="[rowState(item), { 'is-speaking': activeSpeechItemId === item.id }]">
            <button class="sentence-number" :class="{ 'is-text-label': item.kind !== 'sentence' }" type="button" :aria-label="t('exercise.speakItem', { item: itemAriaLabel(item, index) })" @click="speakFromSentence(item)">{{ itemLabel(item, index) }}</button>
            <div class="sentence-content">
              <div class="sentence-prompt-row">
                <p class="sentence-chinese" role="button" tabindex="0" @click="speakFromSentence(item)" @keydown.enter.prevent="speakFromSentence(item)"><strong v-if="item.speakerZh">{{ item.speakerZh }}：</strong>{{ item.prompt }}</p>
                <el-button class="row-action-button" text circle size="small" :icon="Delete" :disabled="!answers[item.id]" :aria-label="t('exercise.clearRow')" @click="emit('clear', item.id)" />
                <el-button class="row-action-button" text circle size="small" :icon="Histogram" :aria-label="t('exercise.history')" @click="openHistory(item.id)" />
                <span v-if="results[item.id]" class="input-result-label">{{ results[item.id].level === 'correct' ? t('exercise.correct') : t('exercise.incorrect') }}</span>
                <el-icon v-if="rowState(item) === 'is-correct'" class="row-status-icon"><CircleCheckFilled /></el-icon>
              </div>

              <div v-if="results[item.id]" class="answer-comparison" :class="{ 'is-wrong': rowState(item) === 'is-wrong' }">
                <p class="comparison-line"><span v-for="(part, partIndex) in results[item.id].referenceParts" :key="`${item.id}-reference-${partIndex}`" class="diff-word" :class="[`is-${part.state}`]">{{ part.text }}</span></p>
              </div>

              <div class="sentence-answer-row">
                <el-input
                  :ref="(instance: unknown) => setInputRef(item.id, instance)"
                  :model-value="answers[item.id] || ''"
                  :class="{ 'is-empty': !(answers[item.id] || '').trim() }"
                  type="textarea"
                  :autosize="{ minRows: 1, maxRows: 5 }"
                  resize="none"
                  autocomplete="off"
                  :aria-label="t('exercise.answerLabel', { item: itemAriaLabel(item, index) })"
                  @update:model-value="onAnswerInput(item.id, $event)"
                  @keydown="onKeydown($event, item)"
                  @blur="onBlurSubmit(item)"
                />
              </div>
            </div>
          </article>
        </div>
      </el-tab-pane>

      <el-tab-pane :label="t('exercise.bilingual')" name="bilingual">
        <div class="translation-toolbar reading-toolbar">
          <div></div>
          <el-button plain :icon="Headset" @click="emit('speak', lessonSpeechSegments)">{{ t('exercise.fullText') }}</el-button>
        </div>
        <div class="sentence-list reading-list bilingual-list">
          <article v-for="(item, index) in items" :key="item.id" class="sentence-row">
            <button class="sentence-number" :class="{ 'is-text-label': item.kind !== 'sentence' }" type="button" @click="speakFromSentence(item)">{{ itemLabel(item, index) }}</button>
            <div class="sentence-content">
              <p class="sentence-chinese"><strong v-if="item.speakerZh">{{ item.speakerZh }}：</strong>{{ item.prompt }}</p>
              <p class="sentence-english"><strong v-if="item.speakerEn" class="speaker-inline">{{ item.speakerEn }}:</strong>{{ item.answer }}</p>
            </div>
          </article>
        </div>
      </el-tab-pane>

      <el-tab-pane :label="t('exercise.original')" name="original">
        <div class="translation-toolbar reading-toolbar">
          <div></div>
          <el-button plain :icon="Headset" @click="emit('speak', lessonSpeechSegments)">{{ t('exercise.fullText') }}</el-button>
        </div>
        <div class="sentence-list reading-list">
          <article v-for="(item, index) in items" :key="item.id" class="sentence-row">
            <button class="sentence-number" :class="{ 'is-text-label': item.kind !== 'sentence' }" type="button" @click="speakFromSentence(item)">{{ itemLabel(item, index) }}</button>
            <div class="sentence-content"><p class="sentence-english"><strong v-if="item.speakerEn" class="speaker-inline">{{ item.speakerEn }}:</strong>{{ item.answer }}</p></div>
          </article>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog v-model="historyVisible" class="mistake-history-dialog" :title="t('history.title')" width="min(680px, calc(100% - 24px))" append-to-body>
      <el-empty v-if="!historyGroups.length" :description="t('history.empty')" :image-size="80" />
      <template v-else>
        <section v-for="group in historyGroups" :key="group.item.id" class="mistake-line-group">
          <header class="mistake-line-source">
            <p><strong class="mistake-line-index">{{ group.label }}</strong>{{ group.item.prompt }}</p>
          </header>
          <div class="mistake-attempt-list">
            <article v-for="entry in group.entries" :key="entry.id" class="mistake-attempt-row">
              <p>{{ entry.input }}</p>
              <time>{{ formatTime(entry.createdAt) }}</time>
            </article>
          </div>
        </section>
      </template>
    </el-dialog>
  </main>
</template>
