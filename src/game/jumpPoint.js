/* Tuple structure */
// 0: x
// 1: y
// 2: radius
// 3: angle (in degrees)

function updateJumpPoint(e){
	if(e[2] > 256){
		e[2] = 0;
	}
	e[2] += 100 * dt;
}

function drawJumpPoint(e){
	setContextAtrribute(6, 1);
	setContextAtrribute(17, 0);
	ctx.lineWidth = 3;
	strokePath(e[0], e[1], e[3], jumpPts, 3).fill();
	ctx.lineWidth = 1;
	strokeCircle(e[0], e[1], e[2]);
}
