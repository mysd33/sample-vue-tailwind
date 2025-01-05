# Vue.jsとTailwind CSSを使ったSPAサンプルAP

- SPAのサンプルAPです。
  - Vue.jsのプロジェクトを作成し、Tailwind CSSを導入しています。

## TBD: サンプルAPの説明

## APの動作確認方法

- 開発用サーバーの起動

```sh
npm run dev
```

## (参考)プロジェクトのセットアップ方法

- プロジェクトの作成

```sh
# vue-cliを使ってプロジェクトを作成
npm create vue@latest

Project name: ... sample-vue-tailwind
Add TypeScript? ... Yes
Add JSX Support? ... No
Add Vue Router for Single Page Application development? ... Yes
Add Pinia for state management? ... Yes
Add Vitest for Unit Testing? ... Yes
Add an End-to-End Testing Solution? » Cypress
Add ESLint for code quality? » Yes
Add Prettier for code formatting? ... Yes

# プロジェクトのディレクトリに移動
cd sample-vue-tailwind

# Tailwind CSS等のインストール
npm install -D tailwindcss postcss autoprefixer

# tailwind.config.ts、postcss.config.jsの作成
npx tailwindcss init -p --ts
```

- tailwind.config.tsにコンテンツの指定を追加

```ts
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- style.cssを追加
  - ./src/style.cssを追加

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- ./src/main.tsにstyle.cssを読み込む処理を追加

```ts
import './assets/main.css'
…
// 追加
import '@/style.css'

const app = createApp(App)
…
```
