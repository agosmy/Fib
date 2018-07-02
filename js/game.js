var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var width = 500;
var height = 500;

var dot = {x:0, y:0, dir: 0}
var number = {x:0, y:0, num: 0}
var food = [];
var segmentSize = 10;

var sequence = ["Seqence:" , 0, 1]

addEventListener("keydown", function(e){
	if (e.keyCode == 37)
	{
		dot.dir = 1;
	}
	if (e.keyCode == 38)
	{
		dot.dir = 2;
	}
	if (e.keyCode == 39)
	{
		dot.dir = 3;
	}
	if (e.keyCode == 40)
	{
		dot.dir = 4;
	}
});

var loop;

function init(){
	setDot();
	setFood();
	loop.setInterval(main, 90);
}

function setDot(x,y){
	ctx.fillStyle = "#660066";
	ctx.fllRect(x, y, segmentSize, segmentSize);
}

function setFood(){
	food.push({x:Math.floor(Math.random() * 49), 
			y:Math.floor(Math.random() * 49),
			nr:fib_nr()});	
			
	for (var i = 1; i<4; i++){
		food.push({x:Math.floor((Math.random() * 25) + 1), 
		y:Math.floor((Math.random() * 25) + 1),
		nr:Math.floor((Math.random() * 150) + 1)});
	}
}

function update(){

}


function fib_nr(){
	var nr = sequence[sequence.length-1] + sequence[sequence.length-2];
	return nr;
}

function checkCollision(){
	if (dot.x == numbers[0].x && dot.y == numbers[0].y) {
			if (numbers[0].num == 144){
				alert("Brawo!");
				clearInterval(loop);
			}
			else{
				sequence.push(number[0].num);
			}
	}
	else{
		
		for (var i=1; i<4;i++){
			if (dot.x == numbers[i].x && dot.y == numbers[i].y && numbers[i].num != numbers[0].num)
	}
}

function buildStrFromArr(array){
	var str ="";
	for (var i = 0; i< arr.length; i++){
		str += arr[i];
	}
	
	return str;
}

