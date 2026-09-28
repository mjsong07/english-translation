<script setup lang="ts">
import { computed, ref } from "vue";
import { ArrowLeft, ArrowRight, Document, Setting } from "@element-plus/icons-vue";
import { useI18n } from "../composables/useI18n";
import type { AppLocale, ColorSchemeMode, Lesson, PracticeKind } from "../types/practice";

const { locale, t } = useI18n();

const props = defineProps<{
  lessons: Lesson[];
  lessonNumber: number;
  lessonTitle: string;
  lessonCompleted: number;
  lessonCount: number;
  colorScheme: ColorSchemeMode;
  voiceUri: string;
  speechRate: number;
  speechVolume: number;
  voices: SpeechSynthesisVoice[];
  characterMatchPercent: number;
  autoAdvanceErrors: boolean;
  practiceKind: PracticeKind;
}>();

const emit = defineEmits<{
  "update:lessonNumber": [value: number];
  "update:practiceKind": [value: PracticeKind];
  "update:colorScheme": [value: ColorSchemeMode];
  "update:voiceUri": [value: string];
  "update:speechRate": [value: number];
  "update:speechVolume": [value: number];
  "update:characterMatchPercent": [value: number];
  "update:autoAdvanceErrors": [value: boolean];
  "read-all": [];
  reset: [];
}>();

const visible = ref(false);
const currentLessonIndex = computed(() => props.lessons.findIndex((lesson) => lesson.number === props.lessonNumber));

function selectAdjacentLesson(offset: number) {
  const total = props.lessons.length;
  if (!total) return;
  const nextIndex = (currentLessonIndex.value + offset + total) % total;
  const lesson = props.lessons[nextIndex];
  if (!lesson) return;
  emit("update:lessonNumber", lesson.number);
  requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function resetLesson() {
  visible.value = false;
  emit("reset");
}
</script>

<template>
  <div class="mobile-settings">
    <div class="mobile-settings-summary">
      <strong>Lesson {{ lessonNumber }} · {{ lessonTitle }}</strong>
      <div class="mobile-settings-summary-bottom">
        <small>{{ lessonCompleted }}/{{ lessonCount }}</small>
        <div class="mobile-lesson-actions" role="group" :aria-label="t('settings.lessonNavigation')">
          <button class="mobile-nav-button" type="button" :title="t('settings.readAll')" @click="emit('read-all')"><el-icon><Document /></el-icon></button>
          <button class="mobile-nav-button" type="button" :title="t('settings.previousLesson')" @click="selectAdjacentLesson(-1)"><el-icon><ArrowLeft /></el-icon></button>
          <button class="mobile-nav-button" type="button" :title="t('settings.nextLesson')" @click="selectAdjacentLesson(1)"><el-icon><ArrowRight /></el-icon></button>
          <button class="mobile-nav-button is-settings" type="button" :title="t('settings.open')" @click="visible = true"><el-icon><Setting /></el-icon></button>
        </div>
      </div>
    </div>

    <el-dialog v-model="visible" class="mobile-settings-dialog" :title="t('settings.title')" width="calc(100% - 28px)" append-to-body align-center>
      <template #header>
        <div class="mobile-settings-header">
          <div class="mobile-settings-header-top">
            <span class="mobile-settings-title">{{ t('settings.title') }}</span>
            <el-button class="mobile-settings-done" type="primary" @click="visible = false">{{ t('settings.done') }}</el-button>
          </div>

          <section class="lesson-filter-section">
            <label>{{ t('settings.practiceKind') }}</label>
            <el-segmented
              :model-value="practiceKind"
              :options="[
                { label: t('kind.all'), value: 'all' },
                { label: t('kind.famous-quotes'), value: 'famous-quotes' },
                { label: t('kind.daily-dialog'), value: 'daily-dialog' },
                { label: t('kind.interview-sentences'), value: 'interview-sentences' }
              ]"
              @update:model-value="emit('update:practiceKind', $event as PracticeKind)"
            />
          </section>

          <section class="lesson-select-section">
            <label>{{ t('settings.selectLesson') }}</label>
            <el-select :model-value="lessonNumber" size="large" @update:model-value="emit('update:lessonNumber', Number($event))">
              <el-option v-for="lesson in lessons" :key="lesson.number" :label="`Lesson ${lesson.number} · ${lesson.title}`" :value="lesson.number" />
            </el-select>
          </section>
        </div>
      </template>

      <div class="mobile-settings-form">
        <section>
          <label>{{ t('settings.language') }}</label>
          <el-segmented
            :model-value="locale"
            :options="[{ label: '中文', value: 'zh-CN' }, { label: 'English', value: 'en' }]"
            @update:model-value="locale = $event as AppLocale"
          />
        </section>

        <section>
          <label>{{ t('settings.appearance') }}</label>
          <el-segmented
            :model-value="colorScheme"
            :options="[
              { label: '跟随系统', value: 'system' },
              { label: '浅色', value: 'light' },
              { label: '深色', value: 'dark' }
            ]"
            @update:model-value="emit('update:colorScheme', $event as ColorSchemeMode)"
          />
        </section>

        <section class="mobile-selection-threshold">
          <label>{{ t('settings.selectionThreshold', { percent: characterMatchPercent }) }}</label>
          <el-slider :model-value="characterMatchPercent" :min="0" :max="100" :step="5" @update:model-value="emit('update:characterMatchPercent', Number($event))" />
          <small>{{ t('settings.selectionThresholdHint') }}</small>
        </section>

        <section>
          <label>{{ t('settings.errorNavigation') }}</label>
          <el-switch :model-value="autoAdvanceErrors" :active-text="t('settings.autoAdvanceErrors')" @update:model-value="emit('update:autoAdvanceErrors', $event)" />
        </section>

        <section>
          <label>{{ t('settings.voice') }}</label>
          <el-select :model-value="voiceUri" size="large" :placeholder="t('settings.systemVoice')" @update:model-value="emit('update:voiceUri', String($event))">
            <el-option v-for="voice in voices" :key="voice.voiceURI" :label="`${voice.name} · ${voice.lang}`" :value="voice.voiceURI" />
          </el-select>
        </section>

        <section>
          <label>{{ t('settings.rate', { rate: speechRate.toFixed(2) }) }}</label>
          <el-slider :model-value="speechRate" :min="0.1" :max="1.5" :step="0.05" @update:model-value="emit('update:speechRate', Number($event))" />
        </section>

        <section>
          <label>{{ t('settings.volume', { volume: Math.round(speechVolume * 100) }) }}</label>
          <el-slider :model-value="speechVolume" :min="0" :max="1" :step="0.05" @update:model-value="emit('update:speechVolume', Number($event))" />
        </section>

        <el-button class="mobile-reset-button" plain type="danger" @click="resetLesson">{{ t('settings.redoLong') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
