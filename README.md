# Family video share app

家族で音楽や動画を共有するための静的Webアプリです。

## 使い方

1. 動画ファイルを `assets/videos/` に配置します。
2. `app.js` の `videos` 配列にファイル名を追加または変更します。
3. ローカルで確認する場合は次のコマンドを実行します。

```bash
cd src
python -m http.server 8000
```

ブラウザで `http://localhost:8000` を開きます。

## GitHub Pages への公開

このアプリはバックエンドなしの静的サイトで構成されているため、GitHub Pages へそのまま公開しやすいです。

- `index.html`、`styles.css`、`app.js`、`assets/` を GitHub のリポジトリにそのまま配置
- GitHub の Settings > Pages から `main` ブランチまたは `docs` フォルダを公開先に設定
- 公開URLは `https://<ユーザー名>.github.io/<リポジトリ名>/` の形式になります

## メモ

- 画像やサムネイルがない場合でも、タイトルの頭文字を使って一覧表示できます。
- ファイル名にスペースが含まれる場合は、`app.js` で URL エンコードしたパスを使います。
- GitHub Pages はサーバーサイド処理が使えないため、動画管理は静的なファイル一覧で実装しています。
