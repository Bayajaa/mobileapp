"use strict";

// flag が"pen-flag"のときpenguinsのターン, "bear-flag"のときBearのターン
let flag = "pen-flag";

// ターン数カウンター
let counter = 9;

// class squaresの要素を取得
const squares = document.getElementsByClassName("square");

// Array　に変換
// https:// developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/from
const squaresArray = Array.from(squares);

// squaresの要素を取得
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

// NewGameボタンを取得
const newgamebtn_display = document.getElementById("newgame-btn");
const newgamebtn = document.getElementById("btn90");

// Win or Lose Jugment Line
const line1 = JudgLine(squaresArray, ["a_1", "a_2", "a_3"]);
const line2 = JudgLine(squaresArray, ["b_1", "b_2", "b_3"]);
const line3 = JudgLine(squaresArray, ["c_1", "c_2", "c_3"]);
const line4 = JudgLine(squaresArray, ["a_1", "b_1", "c_1"]);
const line5 = JudgLine(squaresArray, ["a_2", "b_2", "c_2"]);
const line6 = JudgLine(squaresArray, ["a_3", "b_3", "c_3"]);
const line7 = JudgLine(squaresArray, ["a_1", "b_2", "c_3"]);
const line8 = JudgLine(squaresArray, ["a_3", "b_2", "c_1"]);


const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];

let winningLine = null;
// メッセージ
const msgtxt1 = '<p class="image"><img src = "img/penguins.jpg" width=61px height=61px></p><p class="text">Penguins Attack</p>';
const msgtxt2 = '<p class="image"><img src = "img/whitebear.jpg" width=61px height=61px></p><p class="text">WhiteBear Attack</p>';
const msgtxt3 = '<p class="image"><img src = "img/penguins.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInRight">Penguins Win!!</p>';
const msgtxt4 = '<p class="image"><img src = "img/whitebear.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInLeft">WhiteBear Win!!</p>';
const msgtxt5 = '<p class="image"><img src = "img/penguins.jpg" width=61px height=61px><img src ="img/whitebear.jpg" width=61px height=61px</p><p class="text animate__animated animate__bounceIn">Draw!!</p>';

// サウンド
let gameSound = ["sound/click_sound1.mp3", "sound/click_sound2.mp3", "sound/penwin_sound.mp3", "sound/bearwin_sound.mp3", "sound/draw_sound.mp3"];


// ***************************************
// ページ本体が読み込まれたタイミングで実行するコード
// ****************************************
window.addEventListener("DOMContentLoaded",
     function () {
          // メッセージ(最初はpenguinsのターンから)
          setMessage("pen-turn");
     }, false
);

// ****************************************
// Win or Lose Judgment Lineを配列化
// ****************************************
// JavaScript でfilterを使う方法 :https://techacademy.jp/magazine/15575
function JudgLine(targetArray, idArray) {
     return targetArray.filter(function (e) {
          return (e.id === idArray[0] || e.id === idArray[1]|| e.id === idArray[2]);
     });
}

// ****************************************
//squareをクリックしたときにエベント発火
//　*************************************** 
// クリックしたsquareに,penguinsかbearを表示。画像を表示したsquareはクリックできないようにする, win or lose Judgementの呼ぶ出し
a_1.addEventListener("click",
     function () {
          isSelect(a_1);
     }, false
);
// 上記のコーティングと下記のコーティングは同じ意味
a_2.addEventListener("click", () => {
     isSelect(a_2);
});

a_3.addEventListener("click", () => {
     isSelect(a_3);
});

b_1.addEventListener("click", () => {
     isSelect(b_1);
});

b_2.addEventListener("click", () => {
     isSelect(b_2);
});

b_3.addEventListener("click", () => {
     isSelect(b_3);
});

c_1.addEventListener("click", () => {
     isSelect(c_1);
});

c_2.addEventListener("click", () => {
     isSelect(c_2);
});

c_3.addEventListener("click", () => {
     isSelect(c_3);
});

// *******************************************
// クリックしたsquare にはpenguinsかbearを表示。
// win or lose 判定の呼び出し。
//   表示したところはクリックできないようにする。
// ******************************************
function isSelect(selectSquare) {

     if (flag === "pen-flag") {
          // クリックサウンド
          let music = new Audio(gameSound[0]);
          music.currentTime = 0;
          music.play(); //再生

          selectSquare.classList.add("js-pen-checked");
          selectSquare.classList.add("js-unclickable");

          // penguins win
          if (isWinner("penguins")) {
               setMessage("pen-win");
               gameOver("penguins");
               return;
          }
          setMessage("bear-turn");
          flag = "bear-flag";

     } else {
          // クリックサウンド
          let music = new Audio(gameSound[1]);
          music.currentTime = 0;
          music.play(); //再生

          selectSquare.classList.add("js-bear-checked");
          selectSquare.classList.add("js-unclickable");

          // white-bear win
          if (isWinner("bear")) {
               setMessage("bear-win");
               gameOver("bear");
               return;
          }

          setMessage("pen-turn");
          flag = "pen-flag";
     }

     //   ターン数カウンターをー1する
     counter--;

     // ターン数 = 0 になったらDRAW
     if (counter === 0) {
          setMessage("draw");
          gameOver("draw");
     }

}
// ********************************************************
// 勝敗判定
// *********************************************************
// classListの使う方法まとめ://giita.com/tomokichi_ruby/items/2460c5902d19b81cace5
function isWinner(symbol) {
     // some: 1つでも条件を満たしていればTrueを返す
     const result = lineArray.some(function (line) {
          // every: 全て条件を満たしていればTrueを返す
          const subResult = line.every(function (square) {
               if (symbol === "penguins") {
                    return square.classList.contains("js-pen-checked");
               }
               if (symbol === "bear") {
                    return square.classList.contains("js-bear-checked");
               }
          });
          //  trueを返すしたlineをwinningLineに代入
          if (subResult) { winningLine = line }

          return subResult;
     });
     return result;
}

// **********************************************************
// メッセージ切り替え関数
// **********************************************************

function setMessage(id) {
     switch (id) {
          case "pen-turn":
               document.getElementById("msgtext").innerHTML = msgtxt1;
               break;
          case "bear-turn":
               document.getElementById("msgtext").innerHTML = msgtxt2;
               break;
          case "pen-win":
               document.getElementById("msgtext").innerHTML = msgtxt3;
               break;
          case "bear-win":
               document.getElementById("msgtext").innerHTML = msgtxt4;
               break;
          case "draw":
               document.getElementById("msgtext").innerHTML = msgtxt5;
               break;
          default:
               document.getElementById("msgtext").innerHTML = msgtxt1;
     }
}

// *****************************************************
// ゲーム終了時の処理
// ******************************************************

function gameOver(status) {
     //Game Over サウンド
     let w_sound // wk サウンドの種類
     switch (status) {
          case "penguins":
               w_sound = gameSound[2];
               break;
          case "bear":
               w_sound = gameSound[3];
               break;
          case "draw":
               w_sound = gameSound[4];
               break;
     }

     let music = new Audio(w_sound);
     music.currentTime = 0;
     music.play();  //再生
     // all square unclickable
     squaresArray.forEach(function (square) {
          square.classList.add("js-unclickable");
     });

     // display New Game button: display
     newgamebtn_display.classList.remove("js-hidden");

     // winEffect
     if (status === "penguins") {
          // winner-line penguins high-light
          if (winningLine) {
               winningLine.forEach(function (square) {
                    square.classList.add("js-pen_highLight");
               });
          }
          // penguins win!! ===>snow color is pink
          $(document).snowfall({
               flakeColor: "rgb(255,240,245)", // 雪の色
               maxSpeed: 3, //最大速度
               minSpeed: 1, //最小速度
               maxSize: 20, //最大サイズ
               minSize: 10, //最小サイズ
               round: true //雪の形を丸にする
          });
     } else if (status === "bear") {
          // winner-line bear high-light
          if (winningLine) {
               winningLine.forEach(function (square) {
                    square.classList.add("js-bear_highLight");
               });
          }
          // whitebear win!! ===>snow color is blue
          $(document).snowfall({
               flakeColor: "rgb(175,238,238)", // 雪の色
               maxSpeed: 3, //最大速度
               minSpeed: 1, //最小速度
               maxSize: 20, //最大サイズ
               minSize: 10, //最小サイズ
               round: true //雪の形を丸にする
          });
     }
}



// Newgameボタン　クリック時、ゲーム初期化
// ****************************************************
// classListの使い方まとめ: https://giitacom/tomokichi_ruby/items/2460c5902d19b81cace5
newgamebtn.addEventListener("click", function () {
     // penguinsのポタン
     flag = "pen-flag";
     // ターン数カウンター
     counter = 9;
     winningLine = null;
     squaresArray.forEach(function (square) {
          square.classList.remove("js-pen-checked");
          square.classList.remove("js-bear-checked");
          square.classList.remove("js-unclickable");
          square.classList.remove("js-pen_highLight");
          square.classList.remove("js-bear_hihLight");
     });

     setMessage("pen-turn");
     newgamebtn_display.classList.add("js-hidden");

     // snowfall stop
     $(document).snowfall("clear");
});