import { ref, watch } from "vue";
import type { AppLocale } from "../types/practice";

const storageKey = "new-concept-interface-language";

const messages: Record<AppLocale, Record<string, string>> = {
  "zh-CN": {
    "settings.open": "打开练习设置",
    "settings.lessonNavigation": "课程导航",
    "settings.previousLesson": "上一篇",
    "settings.nextLesson": "下一篇",
    "settings.title": "练习设置",
    "settings.language": "界面语言",
    "settings.selectLesson": "选择课程",
    "settings.lessonFilter": "课文范围",
    "settings.practiceKind": "练习类型",
    "filter.all": "全部",
    "filter.odd": "奇数课",
    "filter.even": "偶数课",
    "kind.all": "全部",
    "kind.famous-quotes": "名人名言",
    "kind.daily-dialog": "生活对话",
    "kind.interview-sentences": "面试句子",
    "settings.appearance": "外观",
    "settings.selectionThreshold": "精确选中阈值 {percent}%",
    "settings.selectionThresholdHint": "达到阈值时选中首段连续错误，否则整词选中；首尾匹配且中间仅一段错误时不受阈值限制。",
    "settings.errorNavigation": "错误定位",
    "settings.autoAdvanceErrors": "自动跳转下一处错误",
    "settings.pronunciation": "发音设置",
    "settings.voice": "发音人",
    "settings.systemVoice": "系统默认发音人",
    "settings.rate": "语速 {rate}×",
    "settings.volume": "音量 {volume}%",
    "settings.progress": "本课进度",
    "settings.redoLong": "重做本课（清空本课记录）",
    "settings.done": "完成设置",
    "settings.readAll": "全句朗读",
    "exercise.count": "共 {count} 题",
    "exercise.translation": "译文",
    "exercise.original": "原文",
    "exercise.bilingual": "译文+原文",
    "exercise.scopeHint": "点击中文可播放英文；按 Enter 校验并跳下一句",
    "exercise.history": "错误历史",
    "exercise.fullText": "全文",
    "exercise.titleShort": "标",
    "exercise.questionShort": "问",
    "exercise.title": "标题",
    "exercise.question": "问题",
    "exercise.sentence": "第 {number} 句",
    "exercise.answerLabel": "{item}英文译文",
    "exercise.correct": "正确",
    "exercise.incorrect": "有误",
    "exercise.errorHint": "错误提示",
    "exercise.viewError": "查看错误原因",
    "exercise.clearRow": "清空当前行",
    "exercise.redoLine": "重做",
    "exercise.speakTitle": "朗读课程标题",
    "exercise.speakItem": "从{item}开始朗读",
    "exercise.pause": "暂停",
    "exercise.resume": "继续",
    "history.title": "本课错误历史",
    "history.empty": "本课还没有错误记录",
    "history.missingGroup": "漏词：{words}",
    "history.extraGroup": "多余：{words}",
    "history.orderOnly": "主要是语序问题，请看明细。",
    "feedback.idleTitle": "先写下你的译文",
    "feedback.idleMessage": "输入英文后再检查答案。",
    "feedback.idleExplanation": "请先输入英文译文。",
    "feedback.correctTitle": "完全正确",
    "feedback.correctMessage": "大小写、标点和缩写形式不会影响判定。",
    "feedback.correctExplanation": "单词、语序和语法均匹配。",
    "feedback.closeTitle": "很接近了",
    "feedback.closeMissing": "检查遗漏的词、时态或语序。",
    "feedback.closeOrder": "单词基本齐全，再检查一下语序。",
    "feedback.wrongTitle": "还需要调整",
    "feedback.wrongMessage": "对照参考答案，先找主语、谓语，再补充其余成分。",
    "feedback.missing": "少了：{words}",
    "feedback.extra": "多了：{words}",
    "feedback.order": "检查单词顺序。",
    "feedback.fallback": "检查单词和顺序。"
  },
  en: {
    "settings.open": "Open practice settings",
    "settings.lessonNavigation": "Lesson navigation",
    "settings.previousLesson": "Previous lesson",
    "settings.nextLesson": "Next lesson",
    "settings.title": "Practice Settings",
    "settings.language": "Interface Language",
    "settings.selectLesson": "Select Lesson",
    "settings.lessonFilter": "Lesson Range",
    "settings.practiceKind": "Practice Type",
    "filter.all": "All",
    "filter.odd": "Odd",
    "filter.even": "Even",
    "kind.all": "All",
    "kind.famous-quotes": "Famous Quotes",
    "kind.daily-dialog": "Daily Dialog",
    "kind.interview-sentences": "Interview",
    "settings.appearance": "Appearance",
    "settings.selectionThreshold": "Precise selection threshold {percent}%",
    "settings.selectionThresholdHint": "At or above the threshold, select the first consecutive error; otherwise select the whole word. A single inner error with matching edges ignores the threshold.",
    "settings.errorNavigation": "Error Navigation",
    "settings.autoAdvanceErrors": "Jump to next error automatically",
    "settings.pronunciation": "Pronunciation",
    "settings.voice": "Voice",
    "settings.systemVoice": "System Default Voice",
    "settings.rate": "Speed {rate}×",
    "settings.volume": "Volume {volume}%",
    "settings.progress": "Lesson Progress",
    "settings.redoLong": "Redo Lesson",
    "settings.done": "Done",
    "settings.readAll": "Read all",
    "exercise.count": "{count} items",
    "exercise.translation": "Translation",
    "exercise.original": "Original",
    "exercise.bilingual": "Translation+Original",
    "exercise.scopeHint": "Click Chinese to speak English; press Enter to check",
    "exercise.history": "History",
    "exercise.fullText": "Read all",
    "exercise.titleShort": "T",
    "exercise.questionShort": "Q",
    "exercise.title": "Title",
    "exercise.question": "Question",
    "exercise.sentence": "Sentence {number}",
    "exercise.answerLabel": "English answer for {item}",
    "exercise.correct": "Correct",
    "exercise.incorrect": "Wrong",
    "exercise.errorHint": "Error Hint",
    "exercise.viewError": "View reason",
    "exercise.clearRow": "Clear row",
    "exercise.redoLine": "Redo",
    "exercise.speakTitle": "Speak title",
    "exercise.speakItem": "Speak from {item}",
    "exercise.pause": "Pause",
    "exercise.resume": "Resume",
    "history.title": "Mistake History",
    "history.empty": "No mistakes yet",
    "history.missingGroup": "Missing: {words}",
    "history.extraGroup": "Extra: {words}",
    "history.orderOnly": "Mostly order issues.",
    "feedback.idleTitle": "Enter your translation",
    "feedback.idleMessage": "Type English first.",
    "feedback.idleExplanation": "Please enter English.",
    "feedback.correctTitle": "Correct",
    "feedback.correctMessage": "Case, punctuation, contraction style are ignored.",
    "feedback.correctExplanation": "Words, order and grammar match.",
    "feedback.closeTitle": "Almost there",
    "feedback.closeMissing": "Check missing words, tense, or order.",
    "feedback.closeOrder": "Words are mostly right, check order.",
    "feedback.wrongTitle": "Needs revision",
    "feedback.wrongMessage": "Compare with the reference answer.",
    "feedback.missing": "Missing: {words}",
    "feedback.extra": "Extra: {words}",
    "feedback.order": "Check word order.",
    "feedback.fallback": "Check words and order."
  }
};

function loadLocale(): AppLocale {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved === "en" || saved === "zh-CN" ? saved : "zh-CN";
  } catch {
    return "zh-CN";
  }
}

const locale = ref<AppLocale>(loadLocale());

export function translate(currentLocale: AppLocale, key: string, params: Record<string, string | number> = {}) {
  const template = messages[currentLocale][key] || messages["zh-CN"][key] || key;
  return Object.entries(params).reduce((result, [name, value]) => result.split(`{${name}}`).join(String(value)), template);
}

export function useI18n() {
  const t = (key: string, params?: Record<string, string | number>) => translate(locale.value, key, params);
  return { locale, t };
}

watch(locale, (value) => {
  if (typeof document !== "undefined") document.documentElement.lang = value;
  try {
    localStorage.setItem(storageKey, value);
  } catch {
    // ignore
  }
}, { immediate: true });
