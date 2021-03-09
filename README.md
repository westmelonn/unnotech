# unnotech

### 如何使用
```
點選左右鈕可以滑動書籍列表，小尺寸螢幕則是上下
點選書籍後可更改價格及數量
+/- ICON可以增減數字，長壓可已連續增減
確認修改後送出
```

### 專案架構、邏輯說明
```
專案架構:
public
  ⌞index.html
  ⌞favicon.ico
src
  ⌞router
    ⌞index.js
  ⌞views
    ⌞BookDetailPage.vue
    ⌞BookListPage.vue
App.vue
main.js

邏輯說明
切換URL須保持上方"Book List"不動，因此在router使用了children把下方Book Detail Page包起來，這樣就可以在Book List的component裡使用 router-view

在component初始化後先呼叫List Books API取得資料，點選書籍後呼叫Book Detail API取得書本詳細資訊並顯示在下方，修改資料完畢時再呼叫Book Detail API 把HTTP Method改成PATCH更新。
這邊須注意因為當前路由改變時，但是該component被重複使用而沒刷新，就須使用beforeRouteUpdate來重新取得資料並渲染。
```

### 你對於所有使用到的第三方 library 的理解，以及為何使用它
```
axios => 
一個基於promise、用來發送非同步請求的library，需要呼叫API時使用

fontawesome => 
用來顯示ICON的library，使用此library來產生一些ICON

Tailwind=>
一個CSS Framework，跟Bootstrap的不同是它沒有寫好的UI component，雖然Tailwind的style都拆的很細，但是可以更客製化，在刻版的時候可以更有彈性。
```

### 在這份專案中你遇到的困難、問題，以及解決的方法
```
最大的問題是使用Tailwind這個library，因為之前沒有使用過，
但上網爬些相關技術文章邊摸索邊實做，最後終於把它套進專案裡。

```