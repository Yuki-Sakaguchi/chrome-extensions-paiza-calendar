<p align="center">
  <img src="https://raw.githubusercontent.com/Yuki-Sakaguchi/chrome-extensions-paiza-calendar/main/icons/extension_icon.png" alt="" />
</p>

# chrome-extensions-paiza-support（未公開）
現状、この拡張機能は公開していません。  
気が向いらたら公開するかもしれませんが、もし使いたい方がいればファイルをローカルに落として「パッケージ化されていない拡張機能を読み込む」をしてもらえれば動くと思います。  

- Google カレンダーに予定を追加する機能
- マイページにて、応募中の会社名を全てコピーする機能
- マイページにて、応募中の会社に順位をつけて順位をつけた会社名だけをコピーする機能

## 💡 Google カレンダーに予定を追加する機能
Paiza の日程調整完了時に Google カレンダーに予定を追加するボタンを表示します。  
エントリーページに以下のようなボタンが追加されます。（※個人情報は黒塗りにしてあります）    

企業名、開催時間、会議概要などが自動でセットされます。  
会議時間は全て1時間として追加されるので、会議時間が異なる場合には自分で時間を変更してください。

<p align="center">
  <img src="https://github.com/Yuki-Sakaguchi/chrome-extensions-paiza-calendar/assets/16290220/b4a31404-5480-45fb-b2ba-5d3253b0ea9e" alt="" width="600" />
</p>

## 💡 会社名をコピーする機能
マイページに以下のようなボタンが表示されます。  
「会社名をコピーする」をクリックすると応募中の会社名が全てクリップボードにコピーされます。

結果イメージ
```
株式会社　A社
株式会社　B社
株式会社　C社
```

<p align="center">
  <img src="https://github.com/Yuki-Sakaguchi/chrome-extensions-paiza-calendar/assets/16290220/4845ee16-e728-43fe-8d93-a110c491c586" alt="" width="600" />
</p>

## 💡 会社に順位をつけて、順位をつけた会社名のみをコピーする機能
マイページに以下のようなボタンが表示されます。  
「順位をつける」をクリックすると会社名の左側に順位を入力するフォームが表示されます。  
ここに数字を入れて「会社名をコピーする」をクリックすると、数字を入れた会社名のみが順位でソートされてクリップボードにコピーされます。

これは面談後のフィードバックなどで応募中の会社や順位を聞かれるので作った機能になります。  
数値が入力されていないものや数値がおかしいものは除外されます。  
また、順位は重複しても良いので同率2位などの表記も問題ありません。

結果イメージ
```
1位 株式会社　A社
2位 株式会社　B社
```

<p align="center">
  <img src="https://github.com/Yuki-Sakaguchi/chrome-extensions-paiza-calendar/assets/16290220/e0c04b1d-0a34-49b3-9dec-a9485ba6acb0" alt="" width="600" />
</p>
