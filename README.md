## 起動手順
Docker 2.0以上のバージョンをインストールした上で、実行してください。  
1. イメージのbuild
````bash
docker build -t article .
````
2. コンテナの立ち上げ
````bash
docker run --rm -p 4173:4173 article
````
必要に応じて、-dオプションでバックグラウンドで起動してください。  
http://localhost:4173/でアプリケーションを確認することが可能です。
## 使用技術・バージョン
- React 19.1
- daisyUI 5.0
- tailwindCSS 4.1
## ディレクトリ構成・設計意図
投稿用ページをPost、閲覧用をView、一覧表示をListとして、独立したpagesコンポーネントに切り出し、App.jsxに呼び出すことでSPAとして構成しています。
## 工夫した点
コンポーネントの切り出しと、tailwindcssを使用した装飾。
## 今後の改善ポイント
typescriptの導入と、検索機能の実装を行いたいです。
