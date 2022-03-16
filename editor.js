//constants
const SPACE = ' ';
const WALL = '#';
const PLAYER = 'p';
const GOAL = 'g';
const COIN = 'c';
const ENEMY = 'e';

const ERASE_MODE = "R - Erase";
const WALL_MODE  = "W - Wall";
const PLAYER_MODE= "P - Player";
const GOAL_MODE  = "G - Goal";
const COIN_MODE  = "C - Coin";
const ENEMY_MODE = "E - Enemy";

var sel;
var scl;
var cWidth;
var cHeight;
cWidth = 900;
cHeight = 600;
scl = 20;
MAX_SIZE = 30;
placementMode = WALL_MODE;
enemy_num = 1;
curr_Width = 10;
curr_Height = 10;
//generates a 50x50 grid, not all will always be used
tiles = [];
for (var i = 0; i < MAX_SIZE; i++) {
	tiles[i] = []
	for (var j = 0; j < MAX_SIZE; j++){
		tiles[i][j] = SPACE;
	}
}


function setup() {
	canvas = createCanvas(cWidth, cHeight);
	canvas.mousePressed(mapClicked)
	// WIDTH OF MAP
	let textX = createElement('h5', 'X:');
	textX.size(100,0);
	textX.position(8,612);
	let inpX = createInput(str(10),type="number");
	inpX.size(50);
	inpX.input(xInput);
	inpX.position(30,630)

	// HEIGHT OF MAP
	let textY = createElement('h5', 'Y:');
	textY.size(100,0);
	textY.position(8,632);
	let inpY = createInput(str(10),type="number");
	inpY.size(50);
	inpY.input(yInput);
	inpY.position(30,650)

	//TYPE OF PLACEMENT SELECTION
	let textM = createElement('h5', 'Mode:');
	textM.size(100,0);
	textM.position(8,654);
	sel = createSelect();
	sel.position(50, 674);
	sel.option(ERASE_MODE);
	sel.option(WALL_MODE);
	sel.option(PLAYER_MODE);
	sel.option(ENEMY_MODE);
	sel.option(COIN_MODE);
	sel.option(GOAL_MODE);
	sel.selected(WALL_MODE);
	sel.changed(selectionEvent);

	//OBJECTIVE SELECTION
	let textO = createElement('h5', 'Objective:');
	textO.size(100,0);
	textO.position(8,674);
	sel2 = createSelect();
	sel2.position(76,694);
	sel2.option("Reach Goal");
	sel2.option("Eliminate Enemies");
	sel2.option("Collect Coins");
	sel2.selected("Reach Goal");
}


function draw() {
	colorMode(HSB, 360, 100, 100);
	background(0, 0, 100);

	for (var i = 0; i < curr_Width; i++){
		for (var j=0; j<curr_Height;j++){
			if (tiles[i][j] == SPACE){
				fill(0,0,92);
			} else if (tiles[i][j] == WALL){
				fill(0,0,30);
			} else if (tiles[i][j] == PLAYER){
				fill(145,100,80);
			} else if (tiles[i][j] == COIN){
				fill(55,100,95);
			} else if (tiles[i][j] == GOAL){
				fill(204,100,92);
			} else if (tiles[i][j] == ENEMY){
				fill(0,100,92);
			}
			
			rect(i*scl,j*scl,scl,scl);
		}
		
	}
	
}

function mapClicked() {
	x_clicked = floor(mouseX/scl);
	y_clicked = floor(mouseY/scl)
  	console.log("Clicked:",x_clicked,y_clicked)

  	//within bounds...
  	if(x_clicked < curr_Width && y_clicked < curr_Height){
  		if(placementMode==ERASE_MODE){
  			tiles[x_clicked][y_clicked] = SPACE;
  		}
  		else if(placementMode==WALL_MODE){
  			tiles[x_clicked][y_clicked] = (tiles[x_clicked][y_clicked] == WALL ? SPACE : WALL);
		}
		else if(placementMode==PLAYER_MODE){
  			tiles[x_clicked][y_clicked] = (tiles[x_clicked][y_clicked] == PLAYER ? SPACE : PLAYER);
		}
		else if(placementMode==COIN_MODE){
  			tiles[x_clicked][y_clicked] = (tiles[x_clicked][y_clicked] == COIN ? SPACE : COIN);
		}
		else if(placementMode==GOAL_MODE){
  			tiles[x_clicked][y_clicked] = (tiles[x_clicked][y_clicked] == GOAL ? SPACE : GOAL);
		}
		else if(placementMode==ENEMY_MODE){
  			tiles[x_clicked][y_clicked] = (tiles[x_clicked][y_clicked] == ENEMY ? SPACE : ENEMY);
		}
  	}
	
	// prevent default
	return false;
}

function mouseDragged() {
	x_clicked = floor(mouseX/scl);
	y_clicked = floor(mouseY/scl)

	if(x_clicked < curr_Width && y_clicked < curr_Height){
		if(placementMode==ERASE_MODE){
  			tiles[x_clicked][y_clicked] = SPACE;
  		}
  		else if(placementMode==WALL_MODE){
  			tiles[x_clicked][y_clicked] = WALL;
		}
  	}
	// prevent default
	return false;
}
function xInput() {
	console.log('X: ', this.value());
	curr_Width = this.value();
}

function yInput() {
	console.log('Y: ', this.value());
	curr_Height = this.value();
}
function selectionEvent() {
  placementMode = sel.value();
  console.log("Mode Selected:",placementMode);
}

//hotkeys for switching modes
function keyPressed() {
  if (keyCode === 82) { //82 = R key
  	placementMode = ERASE_MODE;
  } 
  else if (keyCode === 87) {//87 = W key
  	placementMode = WALL_MODE;
  }
  else if (keyCode === 80) {//80 = P key
  	placementMode = PLAYER_MODE;
  }
  else if (keyCode === 67) {//67 = C key
  	placementMode = COIN_MODE;
  }
  else if (keyCode === 71) {//71 = G key
  	placementMode = GOAL_MODE;
  }
  else if (keyCode === 69) {//69 = E key
  	placementMode = ENEMY_MODE;
  }

  console.log("Mode Selected:",placementMode);
  sel.selected(placementMode);
}