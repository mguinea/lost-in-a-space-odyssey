function drawMouse(){
	setContextAtrribute(11, 0);
    strokeCircle(mouse[0]+cam[0], mouse[1]+cam[1], 16);
}

function getMousePosition(){
	return [mouse[0]+cam[0], mouse[1]+cam[1]];
}
