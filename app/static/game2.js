'use strict'



    var numArray = new Array(9);
	var divObjArray = new Array(9);
	for(var i = 0; i < divObjArray.length; i++) {
		numArray[i] = i + 1;
		divObjArray[i] = document.getElementById("index_" + i);
	}

	var startButton = document.getElementById("startButton");
	var timer;
	var curTime = 0;
	var timeText = document.getElementById("outputTime");
	var promptText = document.getElementById("promptText");

	startButton.onclick = function() {
		if(startButton.innerHTML == "in game...") {
			return;
		}

		// 更改按钮显示字样，更改按钮颜色
		startButton.innerHTML = "in game...";
		startButton.style.backgroundColor = "#FF7575";

		// 随机分布1~25数字所在位置
		numArray.sort(function() {
			return Math.random() > 0.5 ? -1 : 1;
		});
		//console.log (numArray[1]);
		//console.log (numArray[3]);
		//console.log (divObjArray[1]);
		for(var i = 0; i < divObjArray.length; i++) {
			if(numArray[i] == 9) {
				divObjArray[i].innerHTML = "";
				divObjArray[i].style.backgroundColor = "#6C6C6C";
				continue;
			}
			divObjArray[i].innerHTML = numArray[i];
			divObjArray[i].style.backgroundColor = "#FFA042";
		}
		//console.log (numArray[1]);
		//console.log (numArray[3]);
		//console.log (divObjArray[1]);

		// 定时器开始计时
		setTimeout(timing, 1000);

		// 同步显示时间文本
		curTime = 0;
		timeText.value = curTime;

		// 将顶部的“目标图案”字样隐藏
		promptText.style.display = "none";

	}

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
	console.log (emptyIndex);

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
	
	// 判断游戏是否通关
	function isGameOver() {
		for(var i = 0; i < numArray.length; i++) {
			if(numArray[i] != i + 1) {
				return;
			}
		}
		// 游戏通关，弹框告知玩家游戏顺利通关，以及所用时间
		alert("Congratulation! time cost:" + timeText.value + "s");
		// 将“开始游戏”按钮复位
		startButton.innerHTML = "Start";
		startButton.style.backgroundColor = "#97CBFF";
		// 将计时器复位
		clearTimeout(timer);
		// 将顶部的“目标图案”字样设置为显示
		promptText.style.display = "block";
	}

	// 下标为0的格子的单击响应函数
	divObjArray[0].onclick = function() {
		updateEmptyFun();
		if(emptyIndex == 1 || emptyIndex == 3) {
			updatePositionFun(0);
		}
	}

	// 下标为2的格子的单击响应函数
	divObjArray[2].onclick = function() {
		updateEmptyFun();
		if(emptyIndex == 1 || emptyIndex == 5) {
			updatePositionFun(2);
		}
	}

	// 下标为6的格子的单击响应函数
	divObjArray[6].onclick = function() {
		updateEmptyFun();
		if(emptyIndex == 3 || emptyIndex == 7) {
			updatePositionFun(6);
		}
	}

	// 下标为8的格子的单击响应函数
	divObjArray[8].onclick = function() {
		updateEmptyFun();
		if(emptyIndex == 5 || emptyIndex == 7) {
			updatePositionFun(8);
		}
	}

	// 其他下标的格子的单击响应函数
	function resFun() {
		var curIndex;
		for(var i = 1; i < divObjArray.length; i++) {
			if(i == 1 ) {
				divObjArray[i].onclick = function() {
					updateEmptyFun();
					curIndex = divObjArray.indexOf(this);
					if(emptyIndex == curIndex - 1 || emptyIndex == curIndex + 1 || emptyIndex == curIndex + 3) {
						updatePositionFun(curIndex);
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
					}
				}
				continue;
			}
			divObjArray[i].onclick = function() {
				updateEmptyFun();
				curIndex = divObjArray.indexOf(this);
				if(emptyIndex == curIndex - 3 || emptyIndex == curIndex + 3 || emptyIndex == curIndex - 1 || emptyIndex == curIndex + 1) {
					updatePositionFun(curIndex);
				}
			}

		}
	}
	resFun();


