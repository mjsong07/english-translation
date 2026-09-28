import { computed, ref, watch, type Ref } from "vue";
import { buildLessons } from "../data/practiceUnits";
import { peppaPdfChineseMap } from "../data/peppaPdfChineseMap";
import { evaluateAnswer } from "../services/text";
import { translateBatch } from "../services/translation";
import { useI18n } from "./useI18n";
import type {
  AnswerFeedback,
  ExerciseItem,
  Lesson,
  MistakeHistoryEntry,
  PracticeKind,
  StoredProgress
} from "../types/practice";

const storageKey = "new-concept-translation-progress-v3";
const selectedLessonStorageKey = "new-concept-selected-lesson-v3";

const allLessons: Lesson[] = buildLessons();

function withPeppaPdfChinese(chineseMap: Record<string, string>) {
  return { ...chineseMap, ...peppaPdfChineseMap };
}

function getLessonItems(lesson: Lesson, chineseMap: Record<string, string>): ExerciseItem[] {
  return lesson.items.map((item) => ({
      id: item.id,
      lesson: lesson.number,
      lessonTitle: lesson.title,
      kind: "sentence" as const,
      speakerZh: item.speakerZh || "",
      speakerEn: item.speakerEn || "",
      prompt: chineseMap[item.id] || "（翻译中...）",
      answer: item.english
    }));
}

function loadSelectedLesson() {
  try {
    const savedLesson = Number(localStorage.getItem(selectedLessonStorageKey));
    return allLessons.some((item) => item.number === savedLesson) ? savedLesson : allLessons[0].number;
  } catch {
    return allLessons[0].number;
  }
}

function loadProgress(): StoredProgress {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    return {
      completed: saved.completed || [],
      mistakes: saved.mistakes || {},
      attempts: saved.attempts || 0,
      correct: saved.correct || 0,
      answers: saved.answers || {},
      lastCorrectAt: saved.lastCorrectAt || {},
      mistakeHistory: saved.mistakeHistory || [],
      chineseMap: withPeppaPdfChinese(saved.chineseMap || {})
    };
  } catch {
    return {
      completed: [],
      mistakes: {},
      attempts: 0,
      correct: 0,
      answers: {},
      lastCorrectAt: {},
      mistakeHistory: [],
      chineseMap: { ...peppaPdfChineseMap }
    };
  }
}

export function useTranslationPractice(characterMatchPercent: Ref<number>) {
  const { locale } = useI18n();
  const selectedLesson = ref(loadSelectedLesson());
  const practiceKind = ref<PracticeKind>("famous-quotes");
  const progress = ref(loadProgress());
  const answers = ref<Record<string, string>>({ ...progress.value.answers });
  const results = ref<Record<string, AnswerFeedback>>({});

  const visibleLessons = computed(() => {
    let list = [...allLessons];
    if (practiceKind.value !== "all") list = list.filter((lesson) => lesson.kindTag === practiceKind.value);
    return list;
  });

  const lesson = computed(() => visibleLessons.value.find((item) => item.number === selectedLesson.value) || visibleLessons.value[0] || allLessons[0]);
  const lessonItems = computed(() => getLessonItems(lesson.value, progress.value.chineseMap));
  const lessonCompleted = computed(() => lessonItems.value.filter((item) => progress.value.completed.includes(item.id)).length);
  const lessonPercent = computed(() => Math.round((lessonCompleted.value / Math.max(lessonItems.value.length, 1)) * 100));
  const lessonMistakeHistory = computed(() => progress.value.mistakeHistory.filter((entry) => entry.lesson === lesson.value.number));

  restoreLessonResults();

  watch([selectedLesson, visibleLessons], async () => {
    if (!visibleLessons.value.some((it) => it.number === selectedLesson.value)) {
      selectedLesson.value = visibleLessons.value[0]?.number || allLessons[0].number;
    }
    restoreLessonResults();
    ensureLessonChinese();
    try {
      localStorage.setItem(selectedLessonStorageKey, String(selectedLesson.value));
    } catch {
      // ignore
    }
  }, { immediate: true });

  watch([locale, characterMatchPercent], restoreLessonResults);
  watch(progress, (value) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
      // ignore
    }
  }, { deep: true });

  async function ensureLessonChinese() {
    const pending = lesson.value.items.filter((item) => !progress.value.chineseMap[item.id] && !peppaPdfChineseMap[item.id]);
    if (!pending.length) return;
    const translated = await translateBatch(pending.map((item) => ({ id: item.id, english: item.english })));
    progress.value.chineseMap = withPeppaPdfChinese({ ...progress.value.chineseMap, ...translated });
  }

  function restoreLessonResults() {
    const restored: Record<string, AnswerFeedback> = {};
    getLessonItems(lesson.value, progress.value.chineseMap).forEach((item) => {
      const value = answers.value[item.id];
      if (value && (progress.value.mistakes[item.id] || 0) > 0) {
        const result = evaluateAnswer(value, item.answer, locale.value, characterMatchPercent.value / 100);
        if (result.level !== "correct") restored[item.id] = result;
      }
    });
    results.value = restored;
  }

  function updateAnswer(id: string, value: string) {
    answers.value[id] = value;
    progress.value.answers[id] = value;
    if (results.value[id]?.level === "correct") {
      const nextResults = { ...results.value };
      delete nextResults[id];
      results.value = nextResults;
    }
  }

  function clearAnswer(id: string) {
    delete answers.value[id];
    delete progress.value.answers[id];
    progress.value.completed = progress.value.completed.filter((itemId) => itemId !== id);
    const nextResults = { ...results.value };
    delete nextResults[id];
    results.value = nextResults;
  }

  function submit(id: string) {
    const item = lessonItems.value.find((candidate) => candidate.id === id);
    const value = answers.value[id] || "";
    if (!item || !value.trim()) return;
    const result = evaluateAnswer(value, item.answer, locale.value, characterMatchPercent.value / 100);
    const timestamp = Date.now();
    results.value = { ...results.value, [id]: result };
    progress.value.attempts += 1;
    if (result.level === "correct") {
      progress.value.correct += 1;
      progress.value.lastCorrectAt[item.id] = timestamp;
      if (!progress.value.completed.includes(item.id)) progress.value.completed.push(item.id);
    } else {
      progress.value.completed = progress.value.completed.filter((itemId) => itemId !== item.id);
      progress.value.mistakes[item.id] = (progress.value.mistakes[item.id] || 0) + 1;
      const historyEntry: MistakeHistoryEntry = {
        id: `${item.id}-${timestamp}-${progress.value.attempts}`,
        itemId: item.id,
        lesson: item.lesson,
        prompt: item.prompt,
        input: value,
        answer: item.answer,
        missing: result.missing,
        extra: result.extra,
        explanation: result.explanation,
        createdAt: timestamp
      };
      progress.value.mistakeHistory.unshift(historyEntry);
    }
  }

  function resetLesson() {
    const ids = new Set(lessonItems.value.map((item) => item.id));
    ids.forEach((id) => {
      delete answers.value[id];
      delete progress.value.answers[id];
      delete progress.value.mistakes[id];
      delete progress.value.lastCorrectAt[id];
    });
    progress.value.completed = progress.value.completed.filter((id) => !ids.has(id));
    progress.value.mistakeHistory = progress.value.mistakeHistory.filter((entry) => entry.lesson !== lesson.value.number);
    results.value = {};
  }

  return {
    lessons: allLessons,
    visibleLessons,
    selectedLesson,
    lesson,
    lessonItems,
    answers,
    results,
    progress,
    lessonCompleted,
    lessonPercent,
    lessonMistakeHistory,
    practiceKind,
    updateAnswer,
    clearAnswer,
    submit,
    resetLesson
  };
}
