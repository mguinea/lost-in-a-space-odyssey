function drawCharacter(){
	var bounceY = Math.sin(t * 4);


	setContextAtrribute(26, 1);
	var chx = player[0] + shipPositions[player[8]][0] - 6;
	var chy = player[1] + 14;
	// Legs
	fillRectangle(chx + 2, chy + 10, 3, 6);
	fillRectangle(chx + 7, chy + 10, 3, 6);
	// Body
	fillRectangle(chx, chy + bounceY, 12, 12);
	// Head
	fillRectangle(chx + 2, chy - 7 + bounceY, 9, 8);
	// Eyes
	setContextAtrribute(17, 1);
	fillRectangle(chx + 3, chy  - 6 + bounceY, 3, 3);
	fillRectangle(chx + 7, chy  - 6 + bounceY, 3, 3);
}
