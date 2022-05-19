'use strict'

    var numArray = new Array(9);
	var numbase = Array(4).fill(Array(9));
	var divObjArray = new Array(9);
	for(var i = 0; i < divObjArray.length; i++) {
		numArray[i] = i + 1;
		divObjArray[i] = document.getElementById("index_" + i);
	}

	var startButton = document.getElementById("startButton");
	var timer;
	var moves = 0;
	var moveText = document.getElementById("moves");
	var curTime = 0;
	var timeText = document.getElementById("outputTime");
	var promptText = document.getElementById("promptText");

	startButton.onclick = function() {
		if(startButton.innerHTML == "in game...") {
			return;
		}

		// Chage the button after game start
		startButton.innerHTML = "in game...";
		startButton.style.backgroundColor = "#FF7575";

		// Set up the puzzle
		numbase=[[6,1,2,5,3,8,9,7,4],[6,1,2,5,9,3,8,7,4],[6,1,2,5,3,8,7,4,9], [6,1,9,2,5,3,8,7,4]];


		function random_item(items) {
			return items[Math.floor(Math.random()*items.length)];
		}
        numArray = random_item(numbase);

		for(var i = 0; i < divObjArray.length; i++) {
			if(numArray[i] == 9) {
				divObjArray[i].innerHTML = "";
				divObjArray[i].style.backgroundColor = "#6C6C6C";
				continue;
			}
			divObjArray[i].innerHTML = numArray[i];
			divObjArray[i].style.backgroundColor = "#FFA042";
		}


		// Start the timer
		setTimeout(timing, 1000);

		// Display the time
		curTime = 0;
		timeText.value = curTime;

		// Hile the top txt
		promptText.style.display = "none";

	}

	// Timer
	function timing() {
		curTime++;
		timeText.value = curTime;
		timer = setTimeout(timing, 1000);
	}

	
    //Use index 8 to repersent space block and use emptyIndex to store index
	var emptyIndex = 8;

	// Get the space block index 
	function updateEmptyFun() {
		emptyIndex = numArray.indexOf(9);
	}
	console.log (emptyIndex);

	 function reversePairs(nums) {
		let res = 0;
		const length = nums.length;
		for (let i = 0; i < length; i++) {
			for (let j = i + 1; j < length; ++j) {
				if (nums[i] > nums[j]){ 
					res++;
				}
			}
		}
		return res;
	};

		console.log(reversePairs(divObjArray));
	  
		console.log(divObjArray[2]>divObjArray[1]);

	function updatePositionFun(divIndex) {
		if(startButton.innerHTML == "Start") {
			return;
		}
		numArray[emptyIndex] = divObjArray[divIndex].innerHTML;
		numArray[divIndex] = 9;
		divObjArray[emptyIndex].innerHTML = divObjArray[divIndex].innerHTML;
		divObjArray[emptyIndex].style.backgroundColor = "#FFA042";
		divObjArray[divIndex].innerHTML = "";
		divObjArray[divIndex].style.backgroundColor = "#6C6C6C";
		if(divIndex == 8) {
			isGameOver();
		}
	}
	
	// Check if win
	function isGameOver() {
		for(var i = 0; i < numArray.length; i++) {
			if(numArray[i] != i + 1) {
				return;
			}
		}
		// Win then show thw time cost
		alert("Congratulation! time cost:" + timeText.value + "s");
		// Set back to start
		startButton.innerHTML = "Start";
		startButton.style.backgroundColor = "#97CBFF";
		// Reset the timer
		clearTimeout(timer);
		// Show the "Aim"
		promptText.style.display = "block";
	}

	// Response function for block index 0
	moveText.value=moves;
	divObjArray[0].onclick = function() {
		updateEmptyFun();
		if(emptyIndex == 1 || emptyIndex == 3) {
			updatePositionFun(0);
			moves++;
			moveText.value=moves;
		}
	}

	//  Response function for block index 2
	divObjArray[2].onclick = function() {
		updateEmptyFun();
		if(emptyIndex == 1 || emptyIndex == 5) {
			updatePositionFun(2);
			moves++;
			moveText.value=moves;
		}
	}

	//  Response function for block index 6
	divObjArray[6].onclick = function() {
		updateEmptyFun();
		if(emptyIndex == 3 || emptyIndex == 7) {
			updatePositionFun(6);
			moves++;
			moveText.value=moves;
		}
	}

	//  Response function for block index 8
	divObjArray[8].onclick = function() {
		updateEmptyFun();
		if(emptyIndex == 5 || emptyIndex == 7) {
			updatePositionFun(8);
			moves++;
			moveText.value=moves;
		}
	}

	//  Response function for other blocks
	function resFun() {
		var curIndex;
		for(var i = 1; i < divObjArray.length; i++) {
			if(i == 1 ) {
				divObjArray[i].onclick = function() {
					updateEmptyFun();
					curIndex = divObjArray.indexOf(this);
					if(emptyIndex == curIndex - 1 || emptyIndex == curIndex + 1 || emptyIndex == curIndex + 3) {
						updatePositionFun(curIndex);
						moves++;
						moveText.value=moves;
					}
				}
				continue;
			}
			if(i == 7) {
				divObjArray[i].onclick = function() {
					updateEmptyFun();
					curIndex = divObjArray.indexOf(this);
					if(emptyIndex == curIndex - 1 || emptyIndex == curIndex + 1 || emptyIndex == curIndex - 3) {
						updatePositionFun(curIndex);
						moves++;
						moveText.value=moves;
					}
				}
				continue;
			}
			if(i == 3) {
				divObjArray[i].onclick = function() {
					updateEmptyFun();
					curIndex = divObjArray.indexOf(this);
					if(emptyIndex == curIndex - 3 || emptyIndex == curIndex + 3 || emptyIndex == curIndex + 1) {
						updatePositionFun(curIndex);
						moves++;
						moveText.value=moves;
					}
				}
				continue;
			}
			if(i == 5) {
				divObjArray[i].onclick = function() {
					updateEmptyFun();
					curIndex = divObjArray.indexOf(this);
					if(emptyIndex == curIndex - 3 || emptyIndex == curIndex + 3 || emptyIndex == curIndex - 1) {
						updatePositionFun(curIndex);
						moves++;
						moveText.value=moves;
					}
				}
				continue;
			}
			divObjArray[i].onclick = function() {
				updateEmptyFun();
				curIndex = divObjArray.indexOf(this);
				if(emptyIndex == curIndex - 3 || emptyIndex == curIndex + 3 || emptyIndex == curIndex - 1 || emptyIndex == curIndex + 1) {
					updatePositionFun(curIndex);
					moves++;
					moveText.value=moves;
				}
			}

		}
	
	}
	resFun();


