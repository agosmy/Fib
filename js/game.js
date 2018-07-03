var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var width = 500;
var height = 500;

var dot = {x:0, y:0, dir: 0}
var number = {x:0, y:0, num: 0}
var food = [];
var segmentSize = 20;

var sequence = ["Sequence:" , 0, 1];

var loop;

var btn = document.getElementById('btnstart');
btn.addEventListener("click", function () {
        init();
    });

addEventListener("keydown", function(e){
	if (e.keyCode == 37) //left
	{
		dot.dir = 1;
	}
	if (e.keyCode == 38) //up
	{
		dot.dir = 2;
	}
	if (e.keyCode == 39) //right
	{
		dot.dir = 3;
	}
	if (e.keyCode == 40) //down
	{
		dot.dir = 4;
	}
});


function init(){
	document.getElementById( 'startscreen' ).style.display = 'none';
	dot.x = (width/2);
	dot.y = (height/2);
	dot.dir = 0;
	setFood();
	sequence = ["Sequence:" , 0, 1]
	loop = setInterval(main, 10);
}

function setFood(){
	food = [];
	var fib = fib_nr();
	
	food.push({x:Math.floor((Math.random() * 450)+20), 
			y:Math.floor((Math.random() * 450)+20),
			num:fib});	
			
	for (var i = 1; i<4; i++){
		food.push({x:Math.floor((Math.random() * 450) + 20), 
		y:Math.floor((Math.random() * 450) + 20),
		num:Math.abs(Math.floor((Math.random() * Math.min(fib*10, 150) + fib - 10)))});
	}
}

function draw(){
	ctx.fillStyle="white";
	ctx.fillRect(0,0,width,height);
	
	if (dot.dir == 1) {
			dot.x--;
		} else if (dot.dir == 2) {
			dot.y--;
		} else if (dot.dir == 3) {
			dot.x++;
		} else if (dot.dir == 4) {
			dot.y++;
		}
	
	ctx.fillStyle = "#660066";
	ctx.fillRect(dot.x, dot.y, segmentSize, segmentSize);
	
	ctx.font="20px Verdana";
	
	for (var i=0; i<4; i++)
	{
		
		ctx.fillText(""+food[i].num, food[i].x, food[i].y);
	}
	
	ctx.font="10px Verdana";
	ctx.fillText(buildStrFromArr(sequence), 10, height-20);
}


function fib_nr(){
	var nr = sequence[sequence.length-1] + sequence[sequence.length-2];
	return nr;
}

function checkCollision(){
	if (dot.x < 0 || dot.x > (width-segmentSize) || dot.y < 0 || dot.y > (height-segmentSize))
		end("Przegrana!");
	
	if (dot.x + segmentSize/2 >= food[0].x 
		&& dot.x + segmentSize/2 < (food[0].x + 10) 
		&& dot.y + segmentSize/2 >= food[0].y 
		&& dot.y + segmentSize/2 < (food[0].y + 10)){
			if (food[0].num == 144){
				end("Brawo!");
			}
			else{
				sequence.push(food[0].num);
				setFood();
			}
	}
	else{
		
		for (var i=1; i<4;i++){
			if (dot.x + segmentSize/2 >= food[i].x 
				&& dot.x + segmentSize/2 < (food[i].x + 10) 
				&& dot.y + segmentSize/2 >= food[i].y 
				&& dot.y + segmentSize/2 < (food[i].y + 10)
				&& food[i].num != food[0].num)
				end("Przegrana!");
			if (dot.x + segmentSize/2 >= food[i].x 
				&& dot.y + segmentSize/2 >= food[i].y 
				&& food[i].num == food[0].num)
			{
				sequence.push(food[0].num);
				setFood();
			}
		}
	}
}

function end(msg){
	clearInterval(loop);
	if (confirm(msg + " Jeszcze raz?"))
		init();
}

function buildStrFromArr(arr){
	var str ="";
	for (var i = 0; i< arr.length; i++){
		str += arr[i];
	}
	
	return str;
}

var main = function(){
	draw();
	checkCollision();
}
