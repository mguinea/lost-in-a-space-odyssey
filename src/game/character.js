/*
// Draw Character
ctx.fillStyle = "#2c3e50";

var chx = player[0] - cam[0]        + shipPositions[player[8]][0];
var chy = player[1] + 10 - cam[1]   + shipPositions[player[8]][1] + 9;
// Legs
ctx.fillRect(chx + 2, chy + 10, 3, 6);
ctx.fillRect(chx + 7, chy + 10, 3, 6);
// Arms
ctx.fillRect(chx + 2, chy + 12, 3, 2);
ctx.fillRect(chx + 7, chy + 12, 3, 2);
// Body
ctx.fillRect(chx, chy + bounceY, 12, 12);
// Head
ctx.fillRect(chx + 2, chy - 7 + bounceY, 9, 8);
// Eyes
setContextAtrribute(46, 1);
ctx.fillRect(chx + 3, chy  - 6 + bounceY, 3, 3);
ctx.fillRect(chx + 7, chy  - 6 + bounceY, 3, 3);

ctx.restore();*/
function drawCharacter(){
	var bounceY = Math.sin(t * 4);
}
