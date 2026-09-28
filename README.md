# English → Chinese Reverse Translation Practice

参考 `new-concept-translation-practice` 的交互思路实现：

1. 输入一组英文名言/短句（每行一句）。
2. 自动生成中文提示。
3. 根据中文反向翻译成英文并实时判分。

## Features

- 批量输入英文句子
- 自动生成中文（优先内置词典，兜底在线翻译）
- 实时判分（correct / close / wrong）
- 本地持久化练习记录（localStorage）
- 显示统计（总句数、已作答、正确数、平均相似度）

## Run

```bash
pnpm install
pnpm dev
```

## Test

```bash
pnpm test
```

## Build

```bash
pnpm build
```
