# 英语翻译打靶场 — Project Skill

这个 skill 面向本项目维护与扩展，目标是保持与 `new-concept-translation-practice` 同风格、同判分逻辑，并强化“打靶场”体验。

## 1) 目标与交互规范

- 主要模式：中文提示 -> 用户输入英文 -> 即时判分反馈。
- 单元化练习：每单元 10~15 条，默认一次展示整个单元。
- 点击中文可朗读对应英文。
- 设置项以移动端练习体验为核心（主题、语速、音量、容错比例等）。

## 2) 关键代码区域

- `src/composables/usePractice.ts`
  - 练习状态、答案缓存、提交逻辑、错题统计。
- `src/services/text.ts`
  - 核心匹配与判分（与参考项目同思路）。
- `src/services/speech.ts`
  - 朗读、暂停/继续、声音选择。
- `src/components/TranslationExercise.vue`
  - 主练习页面（列表、输入、反馈、历史）。
- `src/components/MobileSettings.vue`
  - 移动端设置弹层。
- `src/data/practiceUnits.ts`
  - 题库与单元数据。

## 3) 开发约束

- UI 风格优先对齐参考项目，避免引入无关信息层。
- 判分逻辑修改前，先确保 `text.spec.ts`（及相关测试）通过。
- 新增题库时保持字段稳定：`id / english / speakerZh / speakerEn`。
- 修改设置项时，确保本地持久化键名兼容。

## 4) 常用开发命令

- 安装依赖：`pnpm install`
- 本地开发：`pnpm dev`
- 单元测试：`pnpm test`
- 生产构建：`pnpm build`

## 5) 发布约定

- GitHub Pages 由 `.github/workflows/deploy-pages.yml` 自动发布。
- `vite.config.ts` 读取 `VITE_BASE_PATH`，用于 Pages 子路径部署。
