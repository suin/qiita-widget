# Qiita Widget

Qiitaの新着投稿をウェブサイトに埋め込むことができるウィジェットです。


→ [Qiita Widgetのデモ](https://qiita-widget.suin.io/)

## ウィジェットの設置方法

下記のコードの`suin`の部分を表示したいユーザ名に置換えてお使いください。

```html
<a href="https://qiita.com/suin" data-qiita-widget data-username="suin">suinのQiita投稿</a>
<script src="https://qiita-widget.suin.io/widget.js" defer></script>
```


### ウィジェットのカスタマイズ

`data-*`属性を設定することで、ウィジェットの表示をカスタマイズできます。

#### コンテンツのカスタマイズ

表示するコンテンツは「ユーザ投稿」「タグへの投稿」「キーワード検索結果」のいずれかを選択することができます。

属性 | 値 | 説明
----|----|----
`data-username="ユーザ名"` | ユーザ名: `string` | ユーザの新着投稿が表示される
`data-tag="タグ"` | タグ: `string` | タグへの新着投稿が表示される
`data-search="キーワード"` | キーワード: `string` | 検索キーワードに合致する新着投稿が表示される

#### 見た目のカスタマイズ

ウィジェットの大きさや表示件数といった見た目をカスタマイズすることができます。

属性 | 値 | 説明
----|----|----
`data-items` | 表示件数: `int` | 表示する投稿数
`data-width` | 幅: `string` | ウィジェットの幅。値はCSSの`width`で使用可能なもの。デフォルト: `100%`
`data-height` | 高さ: `string` | ウィジェットの高さ。値はCSSの`height`で使用可能なもの。デフォルト: `400px`
`data-hide-header` |  | Qiitaのロゴを非表示にする
`data-hide-footer` |  | Qiita Widgetへのリンクが非表示になる

## 開発

```
git clone git@github.com:suin/qiita-widget.git
cd qiita-widget
npm install
open demo.html
npm run watch
```

## ビルド

```
npm run build
```




## License

MIT License