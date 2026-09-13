# Music Share

家族や友人と音楽・動画・プレイリストを共有する静的フロントエンドアプリです。Supabase Auth / Database と Cloudinary を利用し、未設定時はローカル保存を使う local-first 構成で動作します。

## 使い方

1. `config.js` に Supabase と Cloudinary の公開設定を入力します。未設定の場合は匿名・ローカル保存モードで起動します。
2. ローカルで確認する場合は次のコマンドを実行します。

```bash
cd src
python -m http.server 8000
```

ブラウザで `http://localhost:8000` を開きます。

Windowsでは `run-local-server.bat` から起動することもできます。

## 主な機能

- Supabase Auth による Google / GitHub ログイン
- 音楽・動画のアップロードと Cloudinary 配信
- プレイリストの作成、編集、公開、共有
- 公開プレイリストと曲のお気に入り管理
- 再生キュー、シャッフル、リピート、再生履歴
- モバイル用の下部キュードロワー
- モバイルでのプレイリスト折りたたみとアップロード済み音楽一覧

## GitHub Pages への公開

フロントエンドは静的サイトとして GitHub Pages に公開できます。認証・データ保存・メディア配信には Supabase と Cloudinary の設定が必要です。

- `index.html`、`styles.css`、`app.js`、`config.js` を GitHub のリポジトリに配置
- GitHub の Settings > Pages から `main` ブランチまたは `docs` フォルダを公開先に設定
- 公開URLは `https://<ユーザー名>.github.io/<リポジトリ名>/` の形式になります

## 設定と注意

- `config.js` には Supabase の anon key や Cloudinary の unsigned upload preset など、フロントエンドで公開可能な値だけを設定します。
- Supabase の service-role key やその他の秘密情報は、ブラウザへ配信するファイルに書かないでください。
- Supabaseを利用する場合は `supabase-schema.sql` を適用し、RLSポリシーを有効にしてください。
- サムネイルがない曲は、音符アイコンのプレースホルダーで表示されます。
- 認証・クラウド設定がない環境では、利用可能な機能が匿名・ローカル保存モードに制限されます。

### OAuthのリダイレクト設定

GitHub PagesでOAuthログインする場合は、Supabase Dashboardの **Authentication > URL Configuration** に次のURLを登録してください。

- Site URL: `https://<ユーザー名>.github.io/<リポジトリ名>/`
- Redirect URLs: `https://<ユーザー名>.github.io/<リポジトリ名>/` と `http://localhost:8000/`

アプリはログイン開始時の現在ページURLを `redirectTo` として渡します。GitHub Pagesをリポジトリ配下で公開する場合は、末尾の `/リポジトリ名/` まで含めて登録してください。未登録の場合、SupabaseのSite URLへフォールバックし、localhostへ戻ることがあります。

LINE内ブラウザでは、Googleが埋め込みWebViewからのOAuthを拒否することがあります。アプリはLINE内ブラウザを検出するとOAuth画面を別ウィンドウで開きます。認証できない場合は、LINEのメニューから「外部ブラウザで開く」を選択してください。
