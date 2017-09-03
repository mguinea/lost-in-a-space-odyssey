/* Tuple structure */
// 0: x
// 1: y
// 2: radius
// 3: angle (in degrees)

function updateItemLife(e){
	e[1] += Math.sin(t*2)*0.2;
}

function drawItemLife(e){
	setContextAtrribute(8, 1);
	setContextAtrribute(17, 0);
	fillCircle(e[0], e[1], e[2]);
	ctx.save();
	ctx.translate(e[0] - cam[0] + 4, e[1] - cam[1] - 5);
	font("L", 1, 0, 2);
	ctx.restore();
}
