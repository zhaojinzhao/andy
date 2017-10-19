var Remote = function () {
	// 游戏对象
	var game;

	// 开始
	var start = function (type, dir) {
		var doms = {
			gameDiv: document.getElementById('remote_game'),
			nextDiv: document.getElementById('remote_next'),
			timeDiv: document.getElementById('remote_time'),
			scoreDiv: document.getElementById('remote_score'),
			resultDiv: document.getElementById('remote_gameover'),
		};
		game = new Game();
		game.init(doms, type, dir);
	};

	this.start = start;
};