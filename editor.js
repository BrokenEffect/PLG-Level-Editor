//constants
const SPACE = '.';
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
MAX_SIZE = 20;
placementMode = WALL_MODE;
enemy_num = 1;
curr_Width = 10;
curr_Height = 10;
filename = "level.txt";
allowed_move_blocks = -1;
allowed_if_blocks = -1;
allowed_loop_blocks = -1;
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
	textX.position(8,592);
	let inpX = createInput(str(10),type="number");
	inpX.size(50);
	inpX.input(xInput);
	inpX.position(30,610)

	// HEIGHT OF MAP
	let textY = createElement('h5', 'Y:');
	textY.size(100,0);
	textY.position(8,612);
	let inpY = createInput(str(10),type="number");
	inpY.size(50);
	inpY.input(yInput);
	inpY.position(30,630)

	//TYPE OF PLACEMENT SELECTION
	let textM = createElement('h5', 'Mode:');
	textM.size(100,0);
	textM.position(8,634);
	sel = createSelect();
	sel.position(50, 654);
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
	textO.position(8,654);
	sel2 = createSelect();
	sel2.position(76,674);
	sel2.option("Reach Goal");
	sel2.option("Collect Coins");
	sel2.option("Eliminate Enemies");
	sel2.selected("Reach Goal");

	//CODE BLOCK ALLOWANCES
	let descriptiontest = createElement('h5','# of allowed code blocks (-1 for infinite):');
	descriptiontest.size(150,0);
	descriptiontest.position(8,684);

	let movestext = createElement('h5', 'Move: ');
	movestext.size(100,0);
	movestext.position(8,720);
	let moves_input = createInput(-1,type="number");
	moves_input.size(50);
	moves_input.input(movesInput);
	moves_input.position(50,740);

	let ifstext = createElement('h5', 'If: ');
	ifstext.size(100,0);
	ifstext.position(30,740);
	let ifs_input = createInput(-1,type="number");
	ifs_input.size(50);
	ifs_input.input(ifsInput);
	ifs_input.position(50,760);

	let loopstext = createElement('h5', 'Loop: ');
	loopstext.size(100,0);
	loopstext.position(8,760);
	let loops_input = createInput(-1,type="number");
	loops_input.size(50);
	loops_input.input(loopsInput);
	loops_input.position(50,780);


	//LEVEL FILENAME
	let name_button = createInput("level.txt",type="text");
	name_button.size(100);
	name_button.input(nameInput);
	name_button.position(8,810)
	//EXPORT BUTTON
	let button = createButton('Export Level');
	button.size(100,20);
	button.position(110,810);
	button.mousePressed(exportLevel);

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

function movesInput() {
	allowed_move_blocks = this.value();
}

function ifsInput() {
	allowed_if_blocks = this.value();
}

function loopsInput() {
	allowed_loop_blocks = this.value();
}

function nameInput() {
	console.log('filename: ', this.value());
	filename = this.value();
}
function exportLevel() {
	writer = createWriter(filename);
	//width
	//writer.print(curr_Width);
	//height
	//writer.print(curr_Height);

	//picture of map
	curr_enemy_num = 1;
	for(var j = 0;j<curr_Width;j++){
		for(var i=0;i<curr_Height;i++){
			curr_char = tiles[i][j];
			if(curr_char == 'e'){
				curr_char = curr_enemy_num;
				curr_enemy_num += 1;
			}
			writer.write(curr_char);
		}
		writer.write('\n');
	}

	//objective num line
	if(sel2.value() == "Reach Goal"){
		obj_num = 1;
	}else if(sel2.value() == "Collect Coins"){
		obj_num = 2;
	}else if(sel2.value() == "Eliminate Enemies"){
		obj_num = 3;
	}
	writer.print(obj_num);
	//code block outputs
	writer.print(allowed_move_blocks);
	writer.print(allowed_if_blocks);
	writer.print(allowed_loop_blocks);

	//enemy output
	for(var e = 1;e<curr_enemy_num;e++){
		writer.print(e);
		writer.print(0);
	}
	writer.close();
	writer.clear();


}