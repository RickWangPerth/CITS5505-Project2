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
    // Change the button after start
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

    // Start timer
    setTimeout(timing, 1000);

    // Dispaly the time
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

// Timer
function timing() {
  curTime++;
  timeText.value = curTime;
  timer = setTimeout(timing, 1000);
}


// Set 9 to repersent space block store in emptyIndex
var emptyIndex = 8;

// Get the space index
function updateEmptyFun() {
  emptyIndex = numArray.indexOf(9);
}
console.log(emptyIndex);


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

// Check if pass
function isGameOver() {
  for (var i = 0; i < numArray.length; i++) {
    if (numArray[i] != i + 1) {
      return;
    }
  }
  // Pass and send message
  const answer = document.getElementById('answer');
  answer.innerHTML= "Congratulation! time cost:" + timeText.value + "s" + " moves:" + moveText.value 
  // Reset the button
  startButton.innerHTML = "Try Tomorrow";
  startButton.style.backgroundColor = "#ffffff";
  startButton.disabled = "disabled";
  resetButton.disabled = "disabled";
  // Resent the timer
  clearTimeout(timer);
  // Display the top test
  promptText.style.display = "block";
}

// Index 0 response function
moveText.value = moves;
divObjArray[0].onclick = function () {
  updateEmptyFun();
  if (emptyIndex == 1 || emptyIndex == 3) {
    updatePositionFun(0);
    moves++;
    moveText.value = moves;
  }
};

// Index 2 response function
divObjArray[2].onclick = function () {
  updateEmptyFun();
  if (emptyIndex == 1 || emptyIndex == 5) {
    updatePositionFun(2);
    moves++;
    moveText.value = moves;
  }
};

// Index 6 response function
divObjArray[6].onclick = function () {
  updateEmptyFun();
  if (emptyIndex == 3 || emptyIndex == 7) {
    updatePositionFun(6);
    moves++;
    moveText.value = moves;
  }
};

// Index 8 response function
divObjArray[8].onclick = function () {
  updateEmptyFun();
  if (emptyIndex == 5 || emptyIndex == 7) {
    updatePositionFun(8);
    moves++;
    moveText.value = moves;
  }
};

// Other index response function
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
