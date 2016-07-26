/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @providesModule GameBoard
 * @flow
 * @user jeozey@gmail.com 594485991@qq.com
 */
'use strict';

var MyLink = require('./MyLink');

var Tile = function (v ?  : number, r ?  : number, c ?  : number) {

	this.value = v;
	this.row = r;

	this.column = c;

	this.id = Tile.id++;

};

Tile.prototype.toRow = function () {
	return this.row;
};

Tile.prototype.toColumn = function () {
	return this.column;
};

Tile.id = 0;

var GameBoard = function () {
	this.snake = new MyLink();
	this.food = null;
	this.tiles = [];

	for (var i = 0; i < GameBoard.size; ++i) {

		for (var j = 0; j < GameBoard.size; ++j) {
			this.addTile(0, i, j);
		}

	}

	this.addSnakeHead();
	this.addFood();
	//this.setPositions();
	this.won = false;
	this.score = 0;
	this.lost = false;
};

GameBoard.prototype.addTile = function (value, row, column) {

	var res = new Tile(value, row, column);
	//Tile.apply(res, arguments);
	this.tiles.push(res);
	//console.log(this.tiles);
	return res;
};

GameBoard.size = 24;

GameBoard.fourProbability = 0.1;

GameBoard.prototype.addSnakeHead = function () {
	console.log('addSnakeHead');
	var emptyCells = [];
	for (var r = 0; r < GameBoard.size; ++r) {
		for (var c = 0; c < GameBoard.size; ++c) {

			if (this.tiles[24 * r + c].value === 0) {
				emptyCells.push({
					r : r,
					c : c
				});
			}
		}
	}

	var index = Math.floor(Math.random() * emptyCells.length);
	var cell = emptyCells[index];

	var t = this.tiles[24 * cell.r + cell.c];
	t.value = 2;
	t.row = cell.r;
	t.column = cell.c;

	this.snake.addFirst({
		r : cell.r,
		c : cell.c
	});

};

GameBoard.prototype.addFood = function () {

	var emptyCells = [];
	for (var r = 0; r < GameBoard.size; ++r) {
		for (var c = 0; c < GameBoard.size; ++c) {
			if (this.tiles[24 * r + c].value === 0) {
				emptyCells.push({
					r : r,
					c : c
				});
			} else {
				console.log('not empty:' + r + '@' + c);
			}
		}
	}
	console.log('emptyCells.length:' + emptyCells.length + '@' + this.snake.count);
	if (emptyCells.length == 0) {
		this.won = true;
		return;
	}

	var index = Math.floor(Math.random() * emptyCells.length);
	var cell = emptyCells[index];
	this.food = cell;

	var t = this.tiles[24 * (this.food.r) + this.food.c];
	if (t.value === 0) {

		t.value = 8;
		t.row = this.food.r;
		t.column = this.food.c;
	} else {
		console.log('value not correct');
	}

	console.log('food:' + this.tiles[24 * (this.food.r) + this.food.c].value + '-' + this.food.r + '@' + this.food.c);

}
GameBoard.lastDirection = -1;
GameBoard.prototype.move = function (direction) {
	if (GameBoard.lastDirection == 0 || GameBoard.lastDirection == 2) {
  		if (direction == 0 || direction == 2) {
  			direction = GameBoard.lastDirection;
  		}
  	} else if (GameBoard.lastDirection == 1 || GameBoard.lastDirection == 3) {
  		if (direction == 1 || direction == 3) {
  			direction = GameBoard.lastDirection;
  		}
  	}
	
	// 0 -> left, 1 -> up, 2 -> right, 3 -> down

	console.log('direction:' + direction);

	var firstNode = this.snake.getHead();
	var nr = firstNode.Value.r;
	var nc = firstNode.Value.c;

	var flg = true;
	var eatFood = false;
	console.log('firstNode:' + nr + '@' + nc + '  foodNode:' + this.food.r + '@' + this.food.c);
	//left
	if (direction == 0) {

		if (nc - 1 < 0) {
			this.lost = true;
		} else {
			if (nr == this.food.r && nc - 1 == this.food.c) {
				eatFood = true;
			}
			flg = this.snake.addFirst({
					c : nc - 1,
					r : nr
				});
		}
		//right
	} else if (direction == 2) {

		if (nc + 1 >= GameBoard.size) {
			this.lost = true;
		} else {
			if (nr == this.food.r && nc + 1 == this.food.c) {
				eatFood = true;
			}
			flg = this.snake.addFirst({
					c : nc + 1,
					r : nr
				});
		}
		//up
	} else if (direction == 1) {

		if (nr - 1 < 0) {
			this.lost = true;
		} else {
			if (nr - 1 == this.food.r && nc == this.food.c) {
				eatFood = true;
			}
			flg = this.snake.addFirst({
					c : nc,
					r : nr - 1
				});
		}
		//down
	} else if (direction == 3) {

		if (nr + 1 >= GameBoard.size) {
			this.lost = true;
		} else {
			if (nr + 1 == this.food.r && nc == this.food.c) {
				eatFood = true;
			}
			flg = this.snake.addFirst({
					c : nc,
					r : nr + 1
				});
		}
	}

	console.log('eatFood:' + eatFood + ' this.lost:' + this.lost);
	if (this.lost) {
		return this;
	}

	if (!eatFood) {
		this.snake.removeLast();
	} else {
		this.score++;
		this.addFood();
	}

	var node = null;
	var i = this.snake.root;
	while (Boolean(i = i.next)) {

		node = i;
		if (node && node.Value) {

			console.log('snake:' + node.Value.r + '@' + node.Value.c + '@');

		}

	}

	//撞到自己了
	if (!flg) {
		console.log('flg you are lost');
		this.lost = true;
		return this;
	}

	//清空
	var t = [];
	this.tiles.forEach(function (tile) {
		if (tile.value != 0) {
			console.log('old:' + tile.value + '@' + tile.row + '@' + tile.column);
			t.push(tile);
		}
	});
	t.forEach(function (tile) {
		tile.value = 0;
	});

	//重绘snake
	var node = null;
	var i = this.snake.root;
	var index = 0;
	while (Boolean(i = i.next)) {

		node = i;
		if (node && node.Value) {

			var t = this.tiles[24 * (node.Value.r) + node.Value.c];
			if (t) {
				if(index++==0){
					t.value = 2;
				}else{
					t.value = 4;
				}
				t.row = node.Value.r;
				t.column = node.Value.c;

			} else {
				console.log('error snake:' + node.Value.r + '@' + node.Value.c + '@' + 24 * (node.Value.r) + node.Value.c);
			}
		}

	}

	//重绘food
	var t = this.tiles[24 * (this.food.r) + this.food.c];
	if (t) {

		t.value = 8;
		t.row = this.food.r;
		t.column = this.food.c;
	}

	/*
	myDate = new Date();
	var str = myDate.toLocaleString(); //获取日期与时间
	console.log('move1:' + str + '@' + myDate.getMilliseconds());
	 */
	return this;
};

GameBoard.prototype.hasWon = function () {
	return this.won;
};

GameBoard.prototype.hasLost = function () {
	return this.lost;
};

module.exports = GameBoard;
