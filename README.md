# Vue.jsとTailwind CSSを使ったSPAサンプルAP

> [!WARNING]
> 現在、作成中です。

- SPAのサンプルAPです。Vue.jsのプロジェクトを作成し、Tailwind CSSを導入しています。

- 比較のため、[Spring Boot + Thymeleaf + Bootstrap](https://github.com/mysd33/sample-bff/)のサンプルAPと同じ画面を作成しています。

## 画面一覧

- 作成している画面は以下の通り。

| 画面名 | 説明 | 画面イメージ |
| ---- | ---- | ---- |
| ログイン画面 | トップページの画面で、ユーザがログインするための画面。 | [画面](docs/img/screen/screen1.png) |
| メニュー画面 | メニュー画面。ログインユーザのロールによって管理者メニューの表示有無が切り替わる。 |  |
| Todo管理画面 | Todoリストの一覧表示、登録、完了、削除といった操作を実施できる画面。 |  |
| Todo一括登録画面 | Todoリストを記載したCSVファイルをアップロードし、非同期でTodoリストを登録できる画面。 |  |
| ユーザ一覧画面 | 登録されているユーザを一覧表示&CSVファイルダウンロードできる画面。 |  |
| ユーザ登録画面 | ユーザを新規登録するための画面。 |  |
| ユーザ詳細画面 | ユーザの詳細情報の表示と情報更新するための画面。 | |

## サンプルAPの動作確認方法

- 開発用サーバーの起動

```sh
npm run dev
```

- ブラウザで[http://localhost:5173/](http://localhost:5173/)アクセス

## 追加したプラグイン・ライブラリ
- Vueライブラリ
    - [vue-router](https://router.vuejs.org/)
    - [pinia](https://pinia.vuejs.org/)        
    - [@heroicons/vue](https://github.com/tailwindlabs/heroicons?tab=readme-ov-file#vue)

- テストツール
    - [Vitest](https://vitest.dev/)
    - [Cypress]()

- TailWind CSSプラグイン
    - [@tailwindcss/forms](https://www.cypress.io/)

## (参考)プロジェクトのセットアップ方法
- Vue.jsとTailwind CSSを使ったプロジェクトの作成手順は以下の通り

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

# tailwind.config.js、postcss.config.jsの作成
npx tailwindcss init -p
```

- tailwind.config.jsにコンテンツの指定を追加

```js
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
