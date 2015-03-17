# 概要
gulpを利用した開発用のプロジェクトテンプレートです。  
このテンプレートは下記の言語、フレームワークを内包しています。

- 言語  
HTML/CSS/Sass/JavaScript/TypeScript
- フレームワーク  
jQuery/Bootstrap/AngularJS

---------------------------------------
# 必要な環境
このプロジェクトテンプレートを使用するには下記の環境が必要です。  
下記コマンドでインストールされているか確認して頂き、
必要であればインストールしてください。

####node.js & npm
- Node.js  ```node -v```
- npm  ```npm -v```  

[本家](https://nodejs.org/)からインストールするか任意の方法でインストールしてください。

####npm module
- Gulp ```gulp -v```
- Bower ``` bower -v```

```npm install -g gulp bower```でインストールできます。

####ruby(sass)
- Ruby ```ruby -v```
- Sass ```sass -v```
- scss-lint ```scss-lint -v```

[本家](http://rubyinstaller.org/)等からRubyを入手後、  
```gem install sass scss-lint``` でインストールできます。

---------------------------------------
# 始め方
- セットアップ  
templateフォルダ内で```npm install```と```gulp bower```を実行してください。  
その後```gulp```コマンドを実行し```http://localhost:8000```へアクセスします。

- 開発フォルダとプレビューフォルダ  
_devフォルダ内で開発を行い、基本的には_appフォルダは触りません。  
gulpコマンドを使用することにより、ファイルの更新監視状態になるため、  
各devフォルダ内でファイルを更新すると自動的にビルドされ、ブラウザも更新されます。

- ファイルの圧縮  
ライブリロードの高速化のため、appフォルダ内のファイルは圧縮されていません。  
リリース用に圧縮が必要な場合は```gulp compress```コマンドを実行してください。  
_appフォルダ内の各ファイルが圧縮されます。

---------------------------------------
# 基本コマンド一覧
- ```gulp```  
_appフォルダをルートとしたローカルサーバーを作成し、  
_devフォルダ内の各ファイルの監視を開始します。  
[http://localhost:8000](http://localhost:8000)へアクセスすることで確認できます。

- ```gulp compress```  
  _appフォルダ内の各ファイルを圧縮します。

- ```gulp build```  
_devフォルダ内の各ファイルをビルドします。  
css関連ファイルはscssファイルをビルド後、cssファイルと共に結合され、  
_app/styles/styles.css に出力されます。  
js関連ファイルはtsファイルをビルド後、jsファイル、ライブラリ（bower）と共に結合され、  
_app/scripts/main.jsへ出力されます。  
_dev/js/head 内のjsファイルはhead.jsとして出力されます。  
html関連ファイルは各スクリプト名のテンプレート名が変換(```<%= mainjs %>```が```main.js```へ変換等）  
され、_app/views フォルダへ出力されます。  
_dev/index.htmlのみ_app/index.htmlへと出力されます。

- ```gulp build:run```  
```build```コマンド実行後に```gulp```（ファイル監視とローカルサーバーを起動）を実行します。  

- ```gulp build:clean```  
_appフォルダ内のすべてのファイルと_devフォルダ内のbuild（ts、scssのビルド後のファイル）  
を全て削除した後に、```build```コマンドを実行します。

- ```gulp build:clean:run```  
```build:clean```コマンド実行後に```gulp```コマンドを実行します。