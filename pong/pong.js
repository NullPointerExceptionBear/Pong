/* eslint-env browser */
/* eslint no-console: 0*/
'use strict';
var btnSgle = document.getElementById('single');
var btnDble = document.getElementById('double');

//player constructor
function player(x, y, w, h, xv, yv) {
	this.xPos = x;
	this.yPos = y;
	this.width = w;
	this.height = h;
	this.xVel = xv;
	this.yVel = yv;
	this.score = 0;
}

//puck constructor
function puck(x, y, w, h, xv, yv) {
	this.xPos = x;
	this.yPos = y;
	this.width = w;
	this.height = h;
	this.xVel = xv;
	this.yVel = yv;
}

var plyr1 = new player(30, 200, 20, 60, 0, 0);
	
var plyr2 = new player(550, 200, 20, 60, 0, 0);

var plyr3 = new player(550, 200, 20, 60, 0, 0);

var x = -1 + (Math.random() * 2);
var y = -1 + (Math.random() * 2);
var puckIt = new puck(275, 200, 20, 20, x, y);

//get player movements
function dblAnim(evt) {
	switch (evt.keyCode) {
	case 65:
		if (plyr1.yPos > 0) {
			plyr1.yVel = -10;
			plyr1.yPos += plyr1.yVel;
		}
		break;
	case 90:
		if (plyr1.yPos < 340) {
			plyr1.yVel = 10;
			plyr1.yPos += plyr1.yVel;
		}
		break;
	case 38:
		if (plyr2.yPos > 0) {
			plyr2.yVel = -10;
			plyr2.yPos += plyr2.yVel;
		}
		break;
	case 40:
		if (plyr2.yPos < 340) {
			plyr2.yVel = 10;
			plyr2.yPos += plyr2.yVel;
		}
		break;
	}
	switch(this.id) {
	case 'plyr1Up':
		plyr1.yVel = -10;
		plyr1.yPos += plyr1.yVel;
		break;
	case 'plyr1Down':
		plyr1.yVel = 10;
		plyr1.yPos += plyr1.yVel;
		break;
	case 'plyr2Up':
		plyr2.yVel = -10;
		plyr2.yPos += plyr2.yVel;
		break;
	case 'plyr2Down':
		plyr2.yVel = 10;
		plyr2.yPos += plyr2.yVel;
		break;
	}
}

//moves puck
function movePuck(puck1, cvs) {
	puck1.xPos += puck1.xVel;
	puck1.yPos += puck1.yVel;
	
	cvs.fillStyle = 'black';
	cvs.fillRect(puck1.xPos, puck1.yPos, puck1.width, puck1.height);
	cvs.stroke();
}

//checks puck conditionals
function checkPuck(puck1, ply1, ply2) {
	
	if (puck1.yPos < 0) {
		puck1.yVel *= -1;
	}
	
	if (puck1.yPos > 390) {
		puck1.yVel *= -1;
	}
	
	if (puck1.yPos >= ply2.yPos - 10 && puck1.yPos <= ply2.yPos + 50) {
		if (puck1.xPos >= ply2.xPos) {
			puck1.xVel = -1;
			puck1.yVel = -1 + (Math.random() * 3);
		}
	}
	if (puck1.yPos >= ply1.yPos - 10 && puck1.yPos <= ply1.yPos + 50) {
		if (puck1.xPos <= ply1.xPos) {
			puck1.xVel = 1;
			puck1.yVel = -1 + (Math.random() * 3);
		}
	}
	
	//passes left side
	if (puck1.xPos < 0) {
		puck1.xPos = 275;
		puck1.yPos = 200;
		puck1.xVel = -1 + (Math.random() * 2);
		puck1.yVel = -1 + (Math.random() * 2);
		plyr2.score++;
		plyr3.score++;
	}
	//passes right side
	if (puck1.xPos > 600) {
		puck1.xPos = 275;
		puck1.yPos = 200;
		puck1.xVel = -1 + (Math.random() * 2);
		puck1.yVel = -1 + (Math.random() * 2);
		plyr1.score++;
	}
	
}

//moves the computer player
function moveComp(myPuck, myComp) {
	if (myPuck.yPos > myComp.yPos) {
		myComp.yVel = 10;
		myComp.yPos += myComp.yVel;
	}
	if (myPuck.yPos < myComp.yPos) {
		myComp.yVel = -10;
		myComp.yPos += myComp.yVel;
	}
}

//draws objects on canvas
function drwPaddle_2(cnv, play1, play2) {
	var ctx = cnv.getContext('2d');
	ctx.clearRect(0, 0, cnv.width, cnv.height);
	ctx.beginPath();
	ctx.fillStyle = 'blue';
	ctx.fillRect(play1.xPos, play1.yPos, play1.width, play1.height);
	ctx.stroke();
	ctx.fillStyle = 'red';
	ctx.fillRect(play2.xPos, play2.yPos, play2.width, play2.height);
	ctx.stroke();
	checkPuck(puckIt, play1, play2);
	movePuck(puckIt, ctx);
	ctx.closePath();
	
	var text = 'Player 1: ' + plyr1.score + '&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Player 2: ' + plyr2.score;
	
	document.getElementById('scrBrd').innerHTML = text;
}

function drwPaddle(cnv, play1, play3) {
	var ctx = cnv.getContext('2d');
	ctx.clearRect(0, 0, cnv.width, cnv.height);
	ctx.beginPath();
	ctx.fillStyle = 'blue';
	ctx.fillRect(play1.xPos, play1.yPos, play1.width, play1.height);
	ctx.stroke();
	ctx.fillStyle = 'green';
	ctx.fillRect(play3.xPos, play3.yPos, play3.width, play3.height);
	ctx.stroke();
	checkPuck(puckIt, play1, play3);
	moveComp(puckIt, play3);
	movePuck(puckIt, ctx);
	ctx.closePath();
	
	var text = 'Player 1: ' + plyr1.score + '&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Computer: ' + plyr3.score;
	
	document.getElementById('scrBrd').innerHTML = text;
}

//runs singleplayer
function playSingle() {
	var cnv = document.getElementById('cvs');
	
	document.addEventListener('keydown', dblAnim);
	
	setInterval(drwPaddle, 1000 / 60, cnv, plyr1, plyr3);
}

//runs the multiplayer
function playMulti() {
	var cnv = document.getElementById('cvs');
	
	/*var plyr1 = new player(30, 10, 20, 60, 0, 0);
	
	var plyr2 = new player(550, 10, 20, 60, 0, 0);*/
	document.addEventListener('keydown', dblAnim);
	
	//drwPaddle_2(cnv, plyr1, plyr2);
	setInterval(drwPaddle_2, 1000 / 60, cnv, plyr1, plyr2);
}

//sets up single player
function singlePlyr() {
	var can = document.createElement('canvas');
	can.setAttribute('id', 'cvs');
	can.setAttribute('width', 600);
	can.setAttribute('height', 400);
	
	var upIcon = document.createElement('span');
	upIcon.setAttribute('class', 'glyphicon glyphicon-arrow-up');
	
	var dwnIcon = document.createElement('span');
	dwnIcon.setAttribute('class', 'glyphicon glyphicon-arrow-down');
	
	var btnPlyr1Up = document.createElement('button');
	btnPlyr1Up.setAttribute('id', 'plyr1Up');
	btnPlyr1Up.setAttribute('class', 'btn btn-default btn-lg');
	btnPlyr1Up.setAttribute('value', upIcon);
	
	var btnPlyr1Down = document.createElement('button');
	btnPlyr1Down.setAttribute('id', 'plyr1Down');
	btnPlyr1Down.setAttribute('class', 'btn btn-default btn-lg');
	btnPlyr1Down.setAttribute('value', dwnIcon);
	
	var text = 'Player 1: ' + plyr1.score + '&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Computer: ' + plyr3.score;
	
	var scoreBoard = document.createElement('div');
	scoreBoard.setAttribute('id', 'scrBrd');
	scoreBoard.innerHTML = text;
	document.getElementById('main').removeChild(btnSgle);
	document.getElementById('main').removeChild(btnDble);
	
	document.getElementById('main').appendChild(can);
	document.getElementById('main').appendChild(btnPlyr1Up);
	
	document.getElementById('plyr1Up').appendChild(upIcon);
	
	document.getElementById('main').appendChild(btnPlyr1Down);
	
	document.getElementById('plyr1Down').appendChild(dwnIcon);
	
	document.getElementById('main').appendChild(scoreBoard);
	
	document.getElementById('plyr1Up').addEventListener('click', dblAnim);
	
	document.getElementById('plyr1Down').addEventListener('click', dblAnim);
	
	playSingle();
	
}

//sets up multiplayer
function multiPlyr() {
	var can = document.createElement('canvas');
	can.setAttribute('id', 'cvs');
	can.setAttribute('width', 600);
	can.setAttribute('height', 400);
	
	var upIcon = document.createElement('span');
	upIcon.setAttribute('class', 'glyphicon glyphicon-arrow-up');
	
	var dwnIcon = document.createElement('span');
	dwnIcon.setAttribute('class', 'glyphicon glyphicon-arrow-down');
	
	var upIcon2 = document.createElement('span');
	upIcon2.setAttribute('class', 'glyphicon glyphicon-arrow-up');
	
	var dwnIcon2 = document.createElement('span');
	dwnIcon2.setAttribute('class', 'glyphicon glyphicon-arrow-down');
	
	var btnPlyr1Up = document.createElement('button');
	btnPlyr1Up.setAttribute('id', 'plyr1Up');
	btnPlyr1Up.setAttribute('class', 'btn btn-default btn-lg');
	btnPlyr1Up.setAttribute('value', upIcon);
	
	var btnPlyr1Down = document.createElement('button');
	btnPlyr1Down.setAttribute('id', 'plyr1Down');
	btnPlyr1Down.setAttribute('class', 'btn btn-default btn-lg');
	btnPlyr1Down.setAttribute('value', dwnIcon);
	
	var btnPlyr2Up = document.createElement('button');
	btnPlyr2Up.setAttribute('id', 'plyr2Up');
	btnPlyr2Up.setAttribute('class', 'btn btn-default btn-lg');
	btnPlyr2Up.setAttribute('value', upIcon);
	
	var btnPlyr2Down = document.createElement('button');
	btnPlyr2Down.setAttribute('id', 'plyr2Down');
	btnPlyr2Down.setAttribute('class', 'btn btn-default btn-lg');
	btnPlyr2Down.setAttribute('value', dwnIcon);
	
	var text = 'Player 1: ' + plyr1.score + '&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Computer: ' + plyr2.score;
	
	var scoreBoard = document.createElement('div');
	scoreBoard.setAttribute('id', 'scrBrd');
	scoreBoard.innerHTML = text;
	
	document.getElementById('main').removeChild(btnSgle);
	document.getElementById('main').removeChild(btnDble);
	document.getElementById('main').appendChild(can);
	
	document.getElementById('main').appendChild(btnPlyr1Up);
	
	document.getElementById('plyr1Up').appendChild(upIcon);
	
	document.getElementById('main').appendChild(btnPlyr1Down);
	
	document.getElementById('plyr1Down').appendChild(dwnIcon);
	
	document.getElementById('main').appendChild(btnPlyr2Up);
	
	document.getElementById('plyr2Up').appendChild(upIcon2);
	
	document.getElementById('main').appendChild(btnPlyr2Down);
	
	document.getElementById('plyr2Down').appendChild(dwnIcon2);
	
	document.getElementById('main').appendChild(scoreBoard);
	
	document.getElementById('plyr1Up').addEventListener('click', dblAnim);
	
	document.getElementById('plyr1Down').addEventListener('click', dblAnim);
	
	document.getElementById('plyr2Up').addEventListener('click', dblAnim);
	
	document.getElementById('plyr2Down').addEventListener('click', dblAnim);
	
	playMulti();
}

btnSgle.addEventListener('click', singlePlyr);
btnDble.addEventListener('click', multiPlyr);