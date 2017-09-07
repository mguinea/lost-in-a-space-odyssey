function drawCharacter(){
	var bounceY = Math.sin(t * 4),
		chx = player[0],
		chy = player[1] + 14;
	// Head
	setContextAtrribute(14, 1);
	fillCircle(chx, chy + bounceY, 18);
	// Ears
	fillCircle(chx - 14, chy + bounceY, 6);
	fillCircle(chx + 14, chy + bounceY, 6);
	// Eyes (white)
	setContextAtrribute(17, 1);
	fillCircle(chx - 4, chy + bounceY, 8);
	fillCircle(chx + 4, chy + bounceY, 8);
	// Eyes (black)
	setContextAtrribute(26, 1);
	if((~~(t * 12) % 12) == 1){
		fillRectangle(chx - 3, chy + bounceY, 3, 2);
		fillRectangle(chx + 3, chy + bounceY, 3, 2);
	}else{
		fillCircle(chx - 3, chy + bounceY, 2);
		fillCircle(chx + 3, chy + bounceY, 2);
	}
}
