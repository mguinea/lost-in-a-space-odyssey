function drawMouse(){
	setContextAtrribute(11, 0);
    strokeCircle(mouse[0] + cam[0], mouse[1] + cam[1], 8);
}

function getMousePositionInWorld(){
	return [mouse[0] + cam[0], mouse[1] + cam[1]];
}

function getMousePositionInScreen(){
	return [mouse[0] - W/2, mouse[1] - H/2];
}
