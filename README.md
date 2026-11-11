# TakaCG Portfolio Web

CGアーティスト 長尾崇寛のポートフォリオサイト。
シネマティックな演出（イントロローダー・カーテン型ページ遷移・レターボックス・フィルムグレイン・スクロールリビール・カスタムカーソル）を、ビルド不要の素のHTML / CSS / JSで実装しています。

## ページ構成

| URL | 内容 |
| --- | --- |
| `#index` | Index：ヒーロー + Selected Works（ホバーで背景が切り替わるリスト）+ Statement |
| `#works` | Works：作品一覧（エディトリアル風グリッド） |
| `#work-<slug>` | 作品詳細：フルスクリーンヒーロー / 制作情報 / 解説 / ギャラリー（ライトボックス）/ Next Project |
| `#about` | About：プロフィール / Career / Tools / Likes |

ハッシュルーティングなので、GitHub Pages などの静的ホスティングにそのまま置けます。

## ファイル

```
index.html
assets/
  css/style.css   見た目・アニメーション
  js/data.js      作品・プロフィール・連絡先のデータ（編集はここ）
  js/app.js       ルーター・ページ遷移・各種インタラクション
  img/            作品画像（<name>.webp = 2000px / <name>-s.webp = 900px）
```

## 作品の追加・編集

1. 画像を `assets/img/` に `xxx.webp`（長辺2000px程度）と `xxx-s.webp`（長辺900px程度）の2サイズで置く
2. `assets/js/data.js` の `works` 配列に1件追加する（`cover` と `gallery` には拡張子なしのファイル名を書く）

連絡先は `data.js` の `contact` に入れると、フッターにリンクが表示されます（空欄のものは非表示）。

## ローカルで確認

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## 公開（GitHub Pages の場合）

リポジトリの Settings → Pages で、公開したいブランチとルート（`/`）を選ぶだけで公開できます。
