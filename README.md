# 英语翻译打靶场

参考 `new-concept-translation-practice` 的交互思路实现，定位为“英语翻译打靶场”：

1. 输入一组英文名言/短句（每行一句）。
2. 自动生成中文提示。
3. 根据中文反向翻译成英文并实时判分，像打靶一样逐句命中。

## Features

- 单元式翻译打靶（一次显示整课）
- 点击中文可播放英文
- 实时判分（correct / close / wrong）
- 本地持久化练习记录（localStorage）
- 错误历史与自动跳错定位

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

## GitHub

- Repository: `https://github.com/mjsong07/english-translation`
- GitHub Pages: `https://mjsong07.github.io/english-translation/`

## Auto Push After Commit

项目内置了 `.githooks/post-commit`，每次本地 `git commit` 后会自动执行 `git push`。

首次使用请在仓库根目录执行：

```bash
git config core.hooksPath .githooks
chmod +x .githooks/post-commit
```
