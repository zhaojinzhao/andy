var Local = function () {
	// 游戏对象
	var game;

	// 时间间隔
	var INTERVAL = 200;

	// 定时器
	var timer = null;

	// 时间计数器
	var timeCount = 0;

	// 时间
	var time = 0;

	// 移动
	var move = function () {
		timeFunc();
		if(!game.down()) {
			game.fixed();
			var line = game.checkClear();
			if(line) {
				game.addScore(line);
			}
			var gameOver = game.checkGameOver();
			if(gameOver) {
				game.gameOver(false);
				stop();
			} else {
				game.performNext(generateType(), generateDir());
			}
		}
	}

	// 计时函数
	var timeFunc = function() {
		timeCount++;
		if(timeCount === 5) {
			timeCount = 0;
			time++;
			game.setTime(time);

			if(time % 10 === 0) {
				game.addTailLines(generateBottomLine(1));
			}
		}
	};

	// 随机生成一个方块种类
	var generateType = function () {
		return Math.floor(Math.random() * 7);
	};

	// 随机生成一个方块旋转
	var generateDir = function () {
		return Math.floor(Math.random() * 4);
	};

	// 随机生成干扰行
	var generateBottomLine = function (lineNum) {
		var lines = [];
		for(var i = 0; i < lineNum; i++) {
			var line = [];
			for(var j = 0; j < 10; j++) {
				line.push(Math.floor(Math.random() * 2));
			}
			lines.push(line);
		}
		return lines;
	};

	// 绑定事件
	var bindEvent = function () {
		document.onkeydown = function (ev) {
			if(ev.keyCode === 37) {
				game.left();
			} else if(ev.keyCode === 38) {
				game.rotate();
			} else if(ev.keyCode === 39) {
				game.right();
			} else if(ev.keyCode === 40) {
				game.down();
			} else if(ev.keyCode === 32) {
				game.fall();
			}
		};
	};
	

	// 开始
	var start = function () {
		var doms = {
			gameDiv: document.getElementById('local_game'),
			nextDiv: document.getElementById('local_next'),
			timeDiv: document.getElementById('local_time'),
			scoreDiv: document.getElementById('local_score'),
			resultDiv: document.getElementById('local_gameover'),
		};
		game = new Game();
		game.init(doms, generateType(), generateDir());
		bindEvent();
		game.performNext(generateType(), generateDir());
		timer = setInterval(move, INTERVAL);
	};

	// 停止
	var stop = function () {
		if(timer) {
			clearInterval(timer);
			timer = null;
		}
		document.onkeydown = null;
	};
	

	// 导出API
	this.start = start;
};