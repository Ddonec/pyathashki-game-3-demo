const gameNode = document.getElementById("game"),
   container = document.getElementById("game"),
   matrixItem = Array.from(container.querySelectorAll(".button")),
   countItems = 16;

const mixBtn = document.getElementById("mix-puzzles");
const lossBtn = document.getElementById("take-a-fall");
const gBG = document.querySelector(".grey-bg");
const popUpWin = document.querySelector(".popup-win");
const newBtns = document.querySelector(".button-area");
const goHomeBtn = document.getElementById("go-to-home-btn");
// if (16 !== itemNodes.length)
//   throw new Error(
//     `Ð”Ð¾Ð»Ð¶Ð½Ð¾ Ð±Ñ‹Ñ‚ÑŒ Ñ€Ð¾Ð²Ð½Ð¾ ${countItems} items in HTML`
//   );
// matrixItem[countItems - 1].style.display = "none";
let matrix = getMatrix(matrixItem.map((e) => Number(e.dataset.matrixId)));
setPositionItems(matrix);
const maxShuffles = 50,
   shuffleClass = "gameShuffle";
window.addEventListener("load", () => {
   let e,
      t = 0;
   clearInterval(e),
      gameNode.classList.add(shuffleClass),
      (e = setInterval(() => {
         randomSwap(matrix), setPositionItems(matrix), (t += 1), t >= maxShuffles && ((t = 0), clearInterval(e), gameNode.classList.remove(shuffleClass));
      }));
});
let blockedCoords = null;
function randomSwap(e) {
   var t = findCoordinatesByNumber(blankNumber, e),
      r = validCoords(e, blockedCoords);
   swap(t, r[Math.floor(Math.random() * r.length)], e), (blockedCoords = t);
}
const blankNumber = 16;
function getMatrix(t) {
   const r = [[], [], [], []];
   let n = 0,
      o = 0;
   for (let e = 0; e < t.length; e++) 4 <= o && (n++, (o = 0)), (r[n][o] = t[e]), o++;
   return r;
}
function setPositionItems(r) {
   for (let t = 0; t < r.length; t++)
      for (let e = 0; e < r[t].length; e++) {
         var n = r[t][e];
         setNodeStyles(matrixItem[n - 1], e, t);
      }
}
function setNodeStyles(e, t, r) {
   e.style.transform = `translate3D(${100 * t}%, ${100 * r}%, 0)`;
}
function shuffleArray(e) {
   return e
      .map((e) => ({ value: e, sort: Math.random() }))
      .sort((e, t) => e.sort - t.sort)
      .map(({ value: e }) => e);
}
function validCoords(r, n) {
   var o = findCoordinatesByNumber(blankNumber, r);
   const a = [];
   for (let t = 0; t < r.length; t++) for (let e = 0; e < r[t].length; e++) isValidForSwap(o, { x: e, y: t }) && ((n && n.x === e && n.y === t) || a.push({ x: e, y: t }));
   return a;
}
function findCoordinatesByNumber(r, n) {
   for (let t = 0; t < n.length; t++) for (let e = 0; e < n[t].length; e++) if (n[t][e] === r) return { x: e, y: t };
   return null;
}
function isValidForSwap(e, t) {
   var r = Math.abs(e.x - t.x),
      n = Math.abs(e.y - t.y);
   return !((1 !== r && 1 !== n) || (e.x !== t.x && e.y !== t.y));
}
function swap(e, t, r) {
   var n = r[e.y][e.x];
   (r[e.y][e.x] = r[t.y][t.x]), (r[t.y][t.x] = n), isWon(r) && addWonClass();
}
container.addEventListener("click", (e) => {
   var t = e.target.closest("button");
   !t || (isValidForSwap((e = findCoordinatesByNumber(Number(t.dataset.matrixId), matrix)), (t = findCoordinatesByNumber(blankNumber, matrix))) && (swap(t, e, matrix), setPositionItems(matrix)));
}),
   window.addEventListener("keydown", (e) => {
      if (e.key.includes("Arrow")) {
         var t = findCoordinatesByNumber(blankNumber, matrix);
         const n = { x: t.x, y: t.y };
         var r = e.key.split("Arrow")[1].toLowerCase(),
            e = matrix.length;
         switch (r) {
            case "up":
               n.y += 1;
               break;
            case "down":
               --n.y;
               break;
            case "left":
               n.x += 1;
               break;
            case "right":
               --n.x;
         }
         n.y >= e || n.y < 0 || n.x >= e || n.x < 0 || (swap(t, n, matrix), setPositionItems(matrix));
      }
   });
const winFlatArr = new Array(16).fill(0).map((e, t) => t + 1);
function isWon(e) {
   var t = e.flat();
   for (let e = 0; e < winFlatArr.length; e++) if (t[e] !== winFlatArr[e]) return !1;
   return !0;
}
const wonClass = "fifteenWon";

// Функция победы
function addWonClass() {
   setTimeout(() => {
      container.classList.add(wonClass);
      setTimeout(() => {
         container.classList.remove(wonClass);

         document.querySelector(".value16").classList.add("visible");
         setTimeout(() => {
            sendWinStatusToServer(true);
            popupToWin();
         }, 300);
      }, 10);
      console.log(true);
   }, 200);
}

mixBtn.addEventListener("click", function () {
   let e,
      t = 0;
   clearInterval(e),
      gameNode.classList.add(shuffleClass),
      (e = setInterval(() => {
         randomSwap(matrix), setPositionItems(matrix), (t += 1), t >= maxShuffles && ((t = 0), clearInterval(e), gameNode.classList.remove(shuffleClass));
      }));
});

// Функция появления pop-up
function popupToWin() {
   popUpWin.classList.remove("none");
   popUpWin.classList.add("active");
   gBG.classList.remove("none");
   gBG.classList.add("active");
   container.style.display = "none";
   newBtns.style.display = "none";
}

function popupToWinRemowe() {
   popUpWin.classList.add("none");
   popUpWin.classList.remove("active");
   gBG.classList.add("none");
   gBG.classList.remove("active");
   container.style.display = "block";
   newBtns.style.display = "flex";
   document.querySelector(".value16").classList.remove("visible");
}

lossBtn.addEventListener("click", function () {
   alert("Ты успешно сдался");
   sendWinStatusToServer(false);

   //Сюда надо пвесить функционал перехода на домашнюю страницу или в личный кабинет

   //  чтобы убрать победу с кнопки "сдаться" удали код между коментариями ниже

   // от сюда

   setTimeout(() => {
      container.classList.add(wonClass);
      setTimeout(() => {
         container.classList.remove(wonClass);

         document.querySelector(".value16").classList.add("visible");
         setTimeout(() => {
            sendWinStatusToServer(true);
            popupToWin();
         }, 300);
      }, 10);
      console.log(true);
   }, 200);

   // до сюда

});

goHomeBtn.addEventListener("click", function () {
   popupToWinRemowe();
});

function sendWinStatusToServer(status) {
   // Замените URL на ваш реальный URL сервера
   const serverURL = "www.URL";

   fetch(serverURL, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ winStatus: status }),
   })
      .then((response) => {
         if (!response.ok) {
            throw new Error("Network response was not ok");
         }
         return response.json();
      })
      .then((data) => {
         // Обработка ответа от сервера, если это необходимо
         console.log(data);
      })
      .catch((error) => {
         console.error("Error sending win status to the server:", error);
      });
}
