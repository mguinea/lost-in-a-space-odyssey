/* Tuple structure */
// 0: x
// 1: y
// 2: radius
// 3: angle (in degrees)

function updateItemScore(e){
	e[1] += Math.sin(t*2)*0.2;
}

function drawItemScore(e){
	setContextAtrribute(5, 1);
	setContextAtrribute(17, 0);
	fillCircle(e[0], e[1], e[2]);
	ctx.save();
	ctx.translate(e[0] - cam[0] + 4, e[1] - cam[1] - 5);
	font("S", 1, 0, 2);
	ctx.restore();
}
