// 'use strict'

var numArray = new Array(9);
var initialArray = new Array(9);
var is_play_today = false;
// var numbase = Array(4).fill(Array(9));
var divObjArray = new Array(9);
for (var i = 0; i < divObjArray.length; i++) {
  //   numArray[i] = i + 1;
  divObjArray[i] = document.getElementById("index_" + i);
}

var startButton = document.getElementById("startButton");
var resetButton = document.getElementById("resetButton");
var timer;
var moves = 0;
var moveText = document.getElementById("moves");
var curTime = 0;
var timeText = document.getElementById("outputTime");
var counter = 0;
const numbase = [
  [6, 1, 2, 5, 3, 8, 9, 7, 4],
  [6, 1, 2, 5, 9, 3, 8, 7, 4],
  [6, 1, 2, 5, 3, 8, 7, 4, 9],
  [6, 1, 9, 2, 5, 3, 8, 7, 4],
];

const random = () => {
  const date = new Date();
  return (
    (date.getFullYear() * date.getDate() * (date.getMonth() + 1)) %
    numbase.length
  );
};

function generateRandomNum() {
  return numbase[random()];
}

function check_rank_today() {
  $.get("/is_play_today/", function (data) {
    //   const rank_today = JSON.parse(data);
    console.log(data, "data");
    if (data === "True") {
      is_play_today = true;
	  alert("You alreay played today, please come back tomorrow!");
      startButton.disabled = "disabled";
      resetButton.disabled = "disabled";
    }
  });
}

check_rank_today();

startButton.onclick = function () {
  if (startButton.innerHTML == "In Game...") {
    return;
  }



    // 更改按钮显示字样，更改按钮颜色
    startButton.innerHTML = "In Game...";
    startButton.style.backgroundColor = "#FF7575";

    numArray = generateRandomNum();
    initialArray = [...numArray];
    for (var i = 0; i < divObjArray.length; i++) {
      if (numArray[i] == 9) {
        divObjArray[i].innerHTML = "";
        divObjArray[i].style.backgroundColor = "#6C6C6C";
        continue;
      }
      divObjArray[i].innerHTML = numArray[i];
      divObjArray[i].style.backgroundColor = "#FFA042";
    }

    // 定时器开始计时
    setTimeout(timing, 1000);

    // 同步显示时间文本
    curTime = 0;
    timeText.value = curTime;
    moves = 0;
    moveText.value = moves;
};

resetButton.onclick = function () {
  if (startButton.innerHTML == "Start") {
    return;
  }

  startButton.innerHTML = "In Game...";
  startButton.style.backgroundColor = "#FF7575";

  numArray = [...initialArray];
  for (var i = 0; i < divObjArray.length; i++) {
    if (initialArray[i] == 9) {
      divObjArray[i].innerHTML = "";
      divObjArray[i].style.backgroundColor = "#6C6C6C";
      continue;
    }
    divObjArray[i].innerHTML = initialArray[i];
    divObjArray[i].style.backgroundColor = "#FFA042";
  }

  clearTimeout(timer);
  curTime = 0;
  timeText.value = curTime;
  moves = 0;
  moveText.value = moves;
  setTimeout(timing, 1000);
};

// 计时器
function timing() {
  curTime++;
  timeText.value = curTime;
  timer = setTimeout(timing, 1000);
}

/**
 * 使用9代表空白格，通过变量emptyIndex存储该值所在格子的下标
 * 并声明更新9空白格位置的函数updateEmptyFun
 */
var emptyIndex = 8;

// 获取空白格所在下标
function updateEmptyFun() {
  emptyIndex = numArray.indexOf(9);
}
console.log(emptyIndex);

/**
 * 为每一个格子绑定单击响应函数
 * 		这些格子按照点击移动时，是否有规律、规律是否一致，可以分为6组
 * 		第1组，没有统一规律的一组，下标分别为0,2,6,8的格子
 * 		第2组，移动规律为可以移动左、下、右，下标分别为1的格子
 * 		第3组，移动规律为可以移动左、上、右，下标分别为7的格子
 * 		第4组，移动规律为可以移动上、下、右，下标分别为3的格子
 * 		第5组，移动规律为可以移动上、下、左，下标分别为5的格子
 * 		第6组，移动规律为可以移动上、下、左、右，下标分别为4的格子
 *
 * 将绑定单击响应函数公共部分抽取出来，作为公共函数updatePositionFun，减少冗余代码
 * 		公共函数部分包含更新25(即空白格子)在数组numArray中的位置，同时更新格子交换后的颜色、数值
 *
 * 在每次位置更新结束之后，需要判断是否已经完成数字排序；方法为isGameOver
 * 		若当前空白格未在最后一位，则可直接认为游戏为通关
 * 		若当前空白格已经在最后一位，则判断前面的所有数字均按照升序排序
 */

function reversePairs(nums) {
  let res = 0;
  const length = nums.length;
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; ++j) {
      if (nums[i] > nums[j]) {
        res++;
      }
    }
  }
  return res;
}

console.log(reversePairs(divObjArray));

console.log(divObjArray[2] > divObjArray[1]);

function updatePositionFun(divIndex) {
  if (startButton.innerHTML == "Start") {
    return;
  }
  numArray[emptyIndex] = parseInt(divObjArray[divIndex].innerHTML);
  numArray[divIndex] = 9;
  divObjArray[emptyIndex].innerHTML = divObjArray[divIndex].innerHTML;
  divObjArray[emptyIndex].style.backgroundColor = "#FFA042";
  divObjArray[divIndex].innerHTML = "";
  divObjArray[divIndex].style.backgroundColor = "#6C6C6C";
  if (divIndex == 8) {
    isGameOver();
  }
}

// 判断游戏是否通关
function isGameOver() {
  for (var i = 0; i < numArray.length; i++) {
    if (numArray[i] != i + 1) {
      return;
    }
  }
  // 游戏通关，弹框告知玩家游戏顺利通关，以及所用时间
  alert("Congratulation! time cost:" + timeText.value + "s");

  $.ajax({
    url:"/rank",
    type:"POST",
    data:JSON.stringify({moves: moves, seconds: timeText.value}),
    contentType:"application/json; charset=utf-8",
    dataType:"json",
    success: function(data){
      console.log(data)
    }
  })

 
  // 将“开始游戏”按钮复位
  startButton.innerHTML = "Try Tomorrow";
  startButton.style.backgroundColor = "#ffffff";
  startButton.disabled = "disabled";
  resetButton.disabled = "disabled";
  // 将计时器复位
  clearTimeout(timer);
  // 将顶部的“目标图案”字样设置为显示
  promptText.style.display = "block";
}

// 下标为0的格子的单击响应函数
moveText.value = moves;
divObjArray[0].onclick = function () {
  updateEmptyFun();
  if (emptyIndex == 1 || emptyIndex == 3) {
    updatePositionFun(0);
    moves++;
    moveText.value = moves;
  }
};

// 下标为2的格子的单击响应函数
divObjArray[2].onclick = function () {
  updateEmptyFun();
  if (emptyIndex == 1 || emptyIndex == 5) {
    updatePositionFun(2);
    moves++;
    moveText.value = moves;
  }
};

// 下标为6的格子的单击响应函数
divObjArray[6].onclick = function () {
  updateEmptyFun();
  if (emptyIndex == 3 || emptyIndex == 7) {
    updatePositionFun(6);
    moves++;
    moveText.value = moves;
  }
};

// 下标为8的格子的单击响应函数
divObjArray[8].onclick = function () {
  updateEmptyFun();
  if (emptyIndex == 5 || emptyIndex == 7) {
    updatePositionFun(8);
    moves++;
    moveText.value = moves;
  }
};

// 其他下标的格子的单击响应函数
function resFun() {
  var curIndex;
  for (var i = 1; i < divObjArray.length; i++) {
    if (i == 1) {
      divObjArray[i].onclick = function () {
        updateEmptyFun();
        curIndex = divObjArray.indexOf(this);
        if (
          emptyIndex == curIndex - 1 ||
          emptyIndex == curIndex + 1 ||
          emptyIndex == curIndex + 3
        ) {
          updatePositionFun(curIndex);
          moves++;
          moveText.value = moves;
        }
      };
      continue;
    }
    if (i == 7) {
      divObjArray[i].onclick = function () {
        updateEmptyFun();
        curIndex = divObjArray.indexOf(this);
        if (
          emptyIndex == curIndex - 1 ||
          emptyIndex == curIndex + 1 ||
          emptyIndex == curIndex - 3
        ) {
          updatePositionFun(curIndex);
          moves++;
          moveText.value = moves;
        }
      };
      continue;
    }
    if (i == 3) {
      divObjArray[i].onclick = function () {
        updateEmptyFun();
        curIndex = divObjArray.indexOf(this);
        if (
          emptyIndex == curIndex - 3 ||
          emptyIndex == curIndex + 3 ||
          emptyIndex == curIndex + 1
        ) {
          updatePositionFun(curIndex);
          moves++;
          moveText.value = moves;
        }
      };
      continue;
    }
    if (i == 5) {
      divObjArray[i].onclick = function () {
        updateEmptyFun();
        curIndex = divObjArray.indexOf(this);
        if (
          emptyIndex == curIndex - 3 ||
          emptyIndex == curIndex + 3 ||
          emptyIndex == curIndex - 1
        ) {
          updatePositionFun(curIndex);
          moves++;
          moveText.value = moves;
        }
      };
      continue;
    }
    divObjArray[i].onclick = function () {
      updateEmptyFun();
      curIndex = divObjArray.indexOf(this);
      if (
        emptyIndex == curIndex - 3 ||
        emptyIndex == curIndex + 3 ||
        emptyIndex == curIndex - 1 ||
        emptyIndex == curIndex + 1
      ) {
        updatePositionFun(curIndex);
        moves++;
        moveText.value = moves;
      }
    };
  }
}
resFun();
