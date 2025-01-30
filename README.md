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

## Storybookの起動方法
- GitHub Pagesに[Storybook](https://mysd33.github.io/sample-vue-tailwind/)をデプロイして見られるように対応していますが、ローカルで起動する場合は以下の通り。

```sh
npm run storybook
```

- ブラウザで[http://localhost:6006/](http://localhost:6006/)にアクセス

## Vitestによるユニットテストの実行方法

```sh
# ファイル変更待ちで継続的にテスト実行する場合
npm run test:unit

# 一回実行して終了する場合
npx vitest run
```


## 画面一覧
> [!WARNING]
> 現在、作成中です。Vue.jsとTailwind CSSを使ったSPAの画面は、まだモックアップレベルの実装なので、比較の際、ご注意ください。

> [!NOTE]
> 比較として、完全にHTML、CSSを一致させているわけではなく、だいたいのレイアウト、色が一致するようにしているだけです。ご注意ください。

- [src/views](src/views/)フォルダに入っています。
- 作成している画面は以下の通り。

- 現状、静的な画面は、GitHub Pagesに[Storybook](https://mysd33.github.io/sample-vue-tailwind/)をデプロイしてプレビュー見られます。
    - 今後、動的に表示するよう実装すると、Storybookだとうまく表示できないかもです。

| 画面名 | 説明 | 画面イメージ | Storybook | Vue+TailWindソースコード | （参考比較）Thymeleaf+Bootstrapソースコード |
| ---- | ---- | ---- | ---- | ---- |
| ログイン画面 | トップページの画面で、ユーザがログインするための画面。 | [画面](docs/img/screen/screen1.png) | [Storybook](https://mysd33.github.io/sample-vue-tailwind/?path=/docs/views-loginview--docs) | [ソースコード](src/views/LoginView.vue) | [ソースコード](https://github.com/mysd33/sample-bff/blob/main/src/main/resources/templates/login/login.html) |
| メニュー画面 | メニュー画面。ログインユーザのロールによって管理者メニューの表示有無が切り替わる。 | [画面](docs/img/screen/screen2.png) | [Storybook](https://mysd33.github.io/sample-vue-tailwind/?path=/docs/views-menuview--docs) | [ソースコード](src/views/MenuView.vue) | [ソースコード](https://github.com/mysd33/sample-bff/blob/main/src/main/resources/templates/menu/menu.html) |
| Todo管理画面 | Todoリストの一覧表示、登録、完了、削除といった操作を実施できる画面。 | [画面](docs/img/screen/screen3.png)  | [Storybook](https://mysd33.github.io/sample-vue-tailwind/?path=/docs/views-todolistview--docs) | [ソースコード](src/views/TodoListView.vue) | [ソースコード](https://github.com/mysd33/sample-bff/blob/main/src/main/resources/templates/todo/todoList.html) |
| Todo一括登録画面 | Todoリストを記載したCSVファイルをアップロードし、非同期でTodoリストを登録できる画面。 | [画面](docs/img/screen/screen4.png) | [Storybook](https://mysd33.github.io/sample-vue-tailwind/?path=/docs/views-todofileuploadview--docs) | [ソースコード](src/views/TodoFileUploadView.vue) | [ソースコード](https://github.com/mysd33/sample-bff/blob/main/src/main/resources/templates/todo/upload.html)  |
| ユーザ一覧画面 | 登録されているユーザを一覧表示&CSVファイルダウンロードできる画面。 | [画面](docs/img/screen/screen5.png) | [Storybook](https://mysd33.github.io/sample-vue-tailwind/?path=/docs/views-userlistview--docs) | [ソースコード](src/views/UserListView.vue) | [ソースコード](https://github.com/mysd33/sample-bff/blob/main/src/main/resources/templates/user/userList.html) |
| ユーザ登録画面 | ユーザを新規登録するための画面。 | [画面](docs/img/screen/screen6.png) | [Storybook](https://mysd33.github.io/sample-vue-tailwind/?path=/docs/views-userregisterview--docs) | [ソースコード](src/views/UserRegisterView.vue) | [ソースコード](https://github.com/mysd33/sample-bff/blob/main/src/main/resources/templates/user/regist.html) |
| ユーザ詳細画面 | ユーザの詳細情報の表示と情報更新するための画面。 | [画面](docs/img/screen/screen7.png) | [ソースコード](src/views/UserDetailView.vue) | [Storybook](https://mysd33.github.io/sample-vue-tailwind/?path=/docs/views-userregisterview--docs) | [ソースコード](https://github.com/mysd33/sample-bff/blob/main/src/main/resources/templates/user/userDetail.html) |

## 画面遷移図
- [src/router/index.ts](src/router/index.ts)に画面遷移の設定が記述されています。

![画面遷移図](docs/img/screen-flow.png)

## メッセージ表示
- 正常終了時やエラー時のメッセージおよびバナー等表示できるように対応しています。
- また、比較対象の「Spring Boot + Thymeleaf + Bootstrap」では実装してませんが、モーダルダイアログの表示も試しています。

> [!WARNING]
> 現在、作成中です。

| メッセージ種類 | 画面イメージ |
| ----------- | ----------- |
| 確認時モーダルダイアログ     | [画面](docs/img/screen/confirm-dialog.png) |
| 完了時情報モーダルダイアログ     | [画面](docs/img/screen/info-dialog.png) |
| 完了時情報メッセージ（バナー表示）     | [画面](docs/img/screen/info-message.png) |    
| クライアント入力エラーメッセージ（バナー・入力項目のエラー表示）    | [画面](docs/img/screen/client-validation-error.png) |
| サーバ入力エラー・業務エラーメッセージ（バナー表示）         | [画面](docs/img/screen/server-business-error.png) |
| サーバシステムエラー時エラーページ表示  | TBD |      

## 画面部品
- [src/components/](src/components/)フォルダに入っています。
- 作成している画面部品は以下の通り。

- GitHub Pagesに[Storybook](https://mysd33.github.io/sample-vue-tailwind/)をデプロイして見られるように対応しました。

| 画面部品 | 説明 | ソースコード | Storybook |
| ---- | ---- | ---- | ---- |
| ヘッダ領域 | 画面ヘッダー部分の表示領域| [ソースコード](src/components/layout/HeaderArea.vue) | TBD |
| メイン領域 | メインの表示領域 | [ソースコード](src/components/layout/MainContainer.vue) | TBD |
| フォーム領域  | フォームの表示領域 | [ソースコード](src/components/form/FormArea.vue) | TBD |
| 入力エラー用バナー | 入力エラー時のバナー表示領域 | [ソースコード](src/components/banner/ValidationErrorBanner.vue) | TBD |
| メッセージバナー | メッセージ表示用バナー表示領域 | [ソースコード](src/components/banner/MessageBanner.vue) | TBD |
| 入力項目領域  | フォームの入力項目表示領域 | [ソースコード](src/components/form/InputItem.vue) | TBD |
| 入力の基底部品 | 入力部品共通の基底のコンポーネント | [ソースコード](src/components/form/BaseInput.vue) | TBD |
| テキスト入力 | テキスト入力部品 | [ソースコード](src/components/form/InputText.vue) | TBD |
| テキスト入力（ログイン画面用） | ログイン画面のレイアウトに合わせたテキスト入力部品 | [ソースコード](src/components/form/LoginInputText.vue) | TBD |
| パスワード入力 | パスワード入力部品 | [ソースコード](src/components/form/InputPassword.vue) | TBD |
| パスワード入力（ログイン画面用） | ログイン画面のレイアウトに合わせたパスワード入力部品 | [ソースコード](src/components/form/LoginInputPassword.vue) | TBD |
| 日付入力 | 日付入力部品 | [ソースコード](src/components/form/InputDate.vue) | TBD |
| トグルスイッチ | トグルの入力部品　| [ソースコード](src/components/form/ToggleSwitch.vue) | TBD |
| ファイル入力 | ファイルアップロード入力部品 | [ソースコード](src/components/form/InputFile.vue) | TBD |
| ボタン領域 | ボタンを並べて表示する領域 | [ソースコード](src/components/button/ButtonArea.vue) | TBD |
| ボタンの基底部品 | ボタン共通の基底のコンポーネント| [ソースコード](src/components/button/BaseButton.vue) | TBD |
| メニューボタン | メニュー画面のレイアウトに合わせたリンクボタン | [ソースコード](src/components/button/MenuButton.vue) | TBD |
| リンクボタン | 画面遷移のリンクボタン | [ソースコード](src/components/button/LinkButton.vue) | TBD |
| 送信ボタン | フォームの送信ボタン | [ソースコード](src/components/button/SubmitButton.vue) | [Storybook](https://mysd33.github.io/sample-vue-tailwind/?path=/docs/components-button-submitbutton--docs) | TBD |
| テーブル | テーブルの表示領域、ヘッダー部、データ部 | [ソースコード](src/components/table/) | TBD |
| ページネーションリンク | ページネーションのリンクボタン | [ソースコード](src/components/pagination/PaginationLink.vue) | TBD |
| モーダルダイアログの基底部品 | ダイアログ共通の基底のコンポーネント | TBD | TBD |
| 確認用モーダルダイアログ | 確認ダイアログ | [ソースコード](src/components/dialog/ConfirmModalDialog.vue) | TBD |
| 情報モーダルダイアログ | 完了時等の情報ダイアログ | [ソースコード](src/components/dialog/ConfirmModalDialog.vue) | TBD |

## 追加したプラグイン・ライブラリ
- Vueライブラリ
    - [vue-router](https://router.vuejs.org/)
        - 画面遷移制御に使用
    - [pinia](https://pinia.vuejs.org/)        
        - 状態管理に使用
    - [Headless UI](https://headlessui.com/v1/vue)
        - モーダルダイアログに使用
    - [@heroicons/vue](https://github.com/tailwindlabs/heroicons?tab=readme-ov-file#vue)
        - アイコンに使用
    - [VeeValidate](https://vee-validate.logaretm.com/v4/)       
        - 入力チェックに使用
    - [@vee-validate/yup](https://vee-validate.logaretm.com/v4/guide/composition-api/getting-started/#validating-with-yup)
        - 入力チェックに使用。yupと連携してVeeValidateを使用        

- Storybook
    - [Storybook](https://storybook.js.org/)

- テストツール
    - [Vitest](https://vitest.dev/)
    - [Vue Test Utils](https://test-utils.vuejs.org/)
    - [Cypress](https://www.cypress.io/)

- TailWind CSSプラグイン
    - [@tailwindcss/forms](https://github.com/tailwindlabs/tailwindcss-forms)

## (参考) ブランクプロジェクトのセットアップ方法
- Vue.jsとTailwind CSSを使ったブランクプロジェクトの作成手順は以下の通り

### Vueのプロジェクト作成

- vue-cliを使ってプロジェクトを作成

```sh
npm create vue@latest

# 以下の通り選択
Project name: ... sample-vue-tailwind
Add TypeScript? ... Yes
Add JSX Support? ... No
Add Vue Router for Single Page Application development? ... Yes
Add Pinia for state management? ... Yes
Add Vitest for Unit Testing? ... Yes
Add an End-to-End Testing Solution? » Cypress
Add ESLint for code quality? » Yes
Add Prettier for code formatting? ... Yes
```

### Tailwind CSSの導入

- 以下のコマンド実行

```sh
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

### tailwindcss/formsのインストール

- 以下のコマンドを実行

```sh
npm install -D @tailwindcss/forms
```

- tailwind.config.jsのpluginsの設定に@tailwindcss/formsを追加

```js
/** @type {import('tailwindcss').Config} */
export default {
…
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

```

### Storybookのセットアップ
- 以下のコマンドを実行

```sh
# storybookの初期化
npx storybook@latest init
```

- 「stories」フォルダは、サンプルのコンポーネントとストーリーなので、学習後、不要になったら削除してよい

```sh
# TailwindCSSと統合するための設定を追加
npx storybook@latest add @storybook/addon-styling-webpack
```

- .storybook/preview.jsに、以下を追記

```js
import '@/style.css'
```

### Github Pagesを使ってStorybookを公開する設定
- Github Pagesを使ってStorybookを公開したい場合は、[Storybookのドキュメント](https://storybook.js.org/docs/sharing/publish-storybook#publish-storybook-to-other-services)や[Deploy Storybook to GitHub Pagesのドキュメント](https://github.com/bitovi/github-actions-storybook-to-github-pages)を参考に以下の設定を行う。

    - 「.github/workflows」フォルダにGitHub Actionsのワークフローを作成
        - [ワークフローの記載例（deploy-github-pages.yml）](.github/workflows/deploy-github-pages.yml)

    - GitHubのリポジトリの「Settings」の「Pages」にて、GitHub Pagesの設定を行う
        - 「Build and deployment」の「Source」を「GitHub Actions」に設定
        - ワークフローが正常に終了すると、「https://(ユーザ名).github.io/(リポジトリ名)」というURLでStorybookが公開される
            - 本サンプルでは「https://mysd33.github.io/sample-vue-tailwind」というURLで公開されている

### その他、ライブラリインストール
- 以下のコマンドで、上記の手順ではインストールされないライブラリをインストール
    
```sh
# Headlress UI
npm install @headlessui/vue

# Heroicons
npm install @heroicons/vue

# VeeValidate
npm install vee-validate
npm install @vee-validate/yup

# Vue Test Utils
npm install --save-dev @vue/test-utils
```


## (参考) インストールするとよいVSCodeの拡張機能

- [Vue - Official拡張機能](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
    - VSCodeで、vueファイルもインテリセンスが聞くようにsetting.jsonに以下を追記

    ```json
    "tailwindCSS.includeLanguages": {
      "vue": "html"
    },
    ```

- [Preitter - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

    - Prettierのプラグインとして、[Prettier plugin for Tailwind CSS](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)もインストールするとよい。

    - .prettierrc.jsに以下の設定を追加すると、Tailwind CSSのクラス名のフォーマットが適用される。
        - pluginsに"prettier-plugin-tailwindcss"を追加
        - プラグインと直接関係ないが、bracketSameLineをtrueに設定して、閉じタグが同じ行に表示されるようにもしておく。        

    ```json
    {
      …          
      "bracketSameLine": true,
      "plugins": ["prettier-plugin-tailwindcss"]
    }
    ```    

    - .prettierignoreを追加して、markdownファイルに対するPrettierによる自動フォーマットを無効化
    
    ```json
    *.md
    ```    

    - VSCodeでも自動保存時にPrettierでフォーマットされるように、settings.jsonに以下を追記

    ```json
    "[vue]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true
    },
    ```

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)