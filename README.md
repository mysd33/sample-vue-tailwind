# Vue.jsとTailwind CSSを使ったSPAサンプルAP

> [!WARNING]
> 現在、作成中です。

- SPAのサンプルAPです。Vue.jsのプロジェクトを作成し、Tailwind CSSを導入しています。

- Vue.jsやReactのようなSPAのフレームワークを使ったコンポーネント指向の開発は、従来のサーバレンダリング・MPAの開発とは異なります。

- また、CSSは従来セマンティックなクラス名を使ってスタイリングを行っており、CSSフレームワークのBootstrapもどちらかというとセマンティックな考え方がメインですが、セマンティックな設計アプローチへの課題感から、Tailwind CSSは「ユーティリティファースト」という考え方にもとづき、ユーティリティクラスを使ってスタイリングを行い、コンポーネントレベルの画面の抽象化、共通部品化は、Vue.jsやReactのコンポーネントで行うという考え方になって来ています。

- このサンプルAPでは、2つの考え方の違いによる実装を比較するため、[Spring Boot + Thymeleaf + BootstrapのサンプルAP](https://github.com/mysd33/sample-bff/)と同じ画面を作成して、ソースコードを比較できるようにしてみようと思います。

## サンプルAPの動作確認方法

- 必要なパッケージをインストール

```
npm install
```

- 開発用サーバーの起動

```sh
npm run dev
```

- ブラウザで[http://localhost:5173/](http://localhost:5173/)アクセス

## 画面一覧
> [!WARNING]
> 現在、作成中です。Vue.jsとTailwind CSSを使ったSPAの画面は、まだモックアップレベルの実装なので、比較の際、ご注意ください。

> [!NOTE]
> 比較として、完全にHTML、CSSを一致させているわけではなく、だいたいのレイアウト、色が一致するようにしているだけです。ご注意ください。

- [src/views](src/views/)フォルダに入っています。
- 作成している画面は以下の通り。

| 画面名 | 説明 | 画面イメージ | Vue+TailWindソースコード | （参考比較）Thymeleaf+Bootstrapソースコード |
| ---- | ---- | ---- | ---- | ---- |
| ログイン画面 | トップページの画面で、ユーザがログインするための画面。 | [画面](docs/img/screen/screen1.png) | [ソースコード](src/views/LoginView.vue) | [ソースコード](https://github.com/mysd33/sample-bff/blob/main/src/main/resources/templates/login/login.html) |
| メニュー画面 | メニュー画面。ログインユーザのロールによって管理者メニューの表示有無が切り替わる。 | [画面](docs/img/screen/screen2.png) | [ソースコード](src/views/MenuView.vue) | [ソースコード](https://github.com/mysd33/sample-bff/blob/main/src/main/resources/templates/menu/menu.html) |
| Todo管理画面 | Todoリストの一覧表示、登録、完了、削除といった操作を実施できる画面。 | [画面](docs/img/screen/screen3.png)  | [ソースコード](src/views/TodoListView.vue) | [ソースコード](https://github.com/mysd33/sample-bff/blob/main/src/main/resources/templates/todo/todoList.html) |
| Todo一括登録画面 | Todoリストを記載したCSVファイルをアップロードし、非同期でTodoリストを登録できる画面。 | [画面](docs/img/screen/screen4.png) | [ソースコード](src/views/TodoFileUploadView.vue) | [ソースコード](https://github.com/mysd33/sample-bff/blob/main/src/main/resources/templates/todo/upload.html)  |
| ユーザ一覧画面 | 登録されているユーザを一覧表示&CSVファイルダウンロードできる画面。 | [画面](docs/img/screen/screen5.png) | [ソースコード](src/views/UserListView.vue) | [ソースコード](https://github.com/mysd33/sample-bff/blob/main/src/main/resources/templates/user/userList.html) |
| ユーザ登録画面 | ユーザを新規登録するための画面。 | [画面](docs/img/screen/screen6.png) | [ソースコード](src/views/UserRegisterView.vue) | [ソースコード](https://github.com/mysd33/sample-bff/blob/main/src/main/resources/templates/user/regist.html) |
| ユーザ詳細画面 | ユーザの詳細情報の表示と情報更新するための画面。 | [画面](docs/img/screen/screen7.png) | [ソースコード](src/views/UserDetailView.vue) | [ソースコード](https://github.com/mysd33/sample-bff/blob/main/src/main/resources/templates/user/userDetail.html) |

## 画面遷移図
- [src/router/index.ts](src/router/index.ts)に画面遷移の設定が記述されています。

![画面遷移図](docs/img/screen-flow.png)

## メッセージ
- 確認時のダイアログ、正常終了時やエラー時のメッセージおよびバナー等表示できるように対応しています。

> [!WARNING]
> 現在、作成中です。

| メッセージ種類 | 画面イメージ |
| ----------- | ----------- |
| 確認時ダイアログメッセージ     | |
| 正常完了時情報メッセージ     | |    
| クライアント入力エラーメッセージ    | [画面](docs/img/screen/client-validation-error.png) |
| サーバ入力エラーメッセージ         | |
| サーバ業務エラーメッセージ         |
| サーバシステムエラーメッセージ     |        

## 画面部品
- [src/components/](src/components/)フォルダに入っています。
- 作成している画面部品は以下の通り。

| 画面部品 | 説明 | ソースコード |
| ---- | ---- | ---- |
| ヘッダ領域 | 画面ヘッダー部分の表示領域| [ソースコード](src/components/layout/HeaderArea.vue) |
| メイン領域 | メインの表示領域 | [ソースコード](src/components/layout/MainContainer.vue) |
| フォーム領域  | フォームの表示領域 | [ソースコード](src/components/form/FormArea.vue) |
| 入力エラー用バナー | 入力エラー時のバナー表示領域 | [ソースコード](src/components/banner/ValidationErrorBanner.vue) |
| 入力項目領域  | フォームの入力項目表示領域 | [ソースコード](src/components/form/InputItem.vue) |
| 入力の基底部品 | 入力部品共通の基底のコンポーネント | [ソースコード](src/components/form/BaseInput.vue) |
| テキスト入力 | テキスト入力部品 | [ソースコード](src/components/form/InputText.vue) |
| テキスト入力（ログイン画面用） | ログイン画面のレイアウトに合わせたテキスト入力部品 | [ソースコード](src/components/form/LoginInputText.vue) |
| パスワード入力 | パスワード入力部品 | [ソースコード](src/components/form/InputPassword.vue) |
| パスワード入力（ログイン画面用） | ログイン画面のレイアウトに合わせたパスワード入力部品 | [ソースコード](src/components/form/LoginInputPassword.vue) |
| 日付入力 | 日付入力部品 | [ソースコード](src/components/form/InputDate.vue) |
| トグルスイッチ | トグルの入力部品　| [ソースコード](src/components/form/ToggleSwitch.vue) |
| ファイル入力 | ファイルアップロード入力部品 | [ソースコード](src/components/form/InputFile.vue) |
| ボタン領域 | ボタンを並べて表示する領域 | [ソースコード](src/components/button/ButtonArea.vue) |
| ボタンの基底部品 | ボタン共通の基底のコンポーネント| [ソースコード](src/components/button/BaseButton.vue) |
| メニューボタン | メニュー画面のレイアウトに合わせたリンクボタン | [ソースコード](src/components/button/MenuButton.vue) |
| リンクボタン | 画面遷移のリンクボタン | [ソースコード](src/components/button/LinkButton.vue) |
| 送信ボタン | フォームの送信ボタン | [ソースコード](src/components/button/SubmitButton.vue) |
| テーブル | テーブルの表示領域、ヘッダー部、データ部 | [ソースコード](src/components/table/) |
| ページネーションリンク | ページネーションのリンクボタン | [ソースコード](src/components/pagination/PaginationLink.vue) |

## 追加したプラグイン・ライブラリ
- Vueライブラリ
    - [vue-router](https://router.vuejs.org/)
    - [pinia](https://pinia.vuejs.org/)        
    - [Headless UI](https://headlessui.com/v1/vue)
    - [@heroicons/vue](https://github.com/tailwindlabs/heroicons?tab=readme-ov-file#vue)    

- テストツール
    - [Vitest](https://vitest.dev/)
    - [Cypress](https://www.cypress.io/)

- TailWind CSSプラグイン
    - [@tailwindcss/forms](https://www.cypress.io/)

## (参考) ブランクプロジェクトのセットアップ方法
- Vue.jsとTailwind CSSを使ったブランクプロジェクトの作成手順は以下の通り

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
