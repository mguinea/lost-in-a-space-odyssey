/* Tuple structure */
// 0: x
// 1: y
// 2: radius
// 3: angle (in degrees)

function updateJumpPoint(e){
	//e[1] += Math.sin(t*10)*0.2;

	if(e[2] > 256){
		e[2] = 0;
	}
	e[2] += 100 * dt;
}

function drawJumpPoint(e){
	var pts = [
		[0,0],
		[0,3],
		[-2,5],
		[-1,6],
		[-1,8],
		[-2,9],
		[0,11],
		[0,14],
		[0,11],
		[2,9],
		[1,8],
		[1,6],
		[2,5],
		[0,3],
		[0,0]
	];
	setContextAtrribute(6, 1);
	setContextAtrribute(17, 0);
	ctx.lineWidth = 3;
	strokePath(e[0], e[1], e[3], pts, 3).fill();
	ctx.lineWidth = 1;
	strokeCircle(e[0], e[1], e[2]);
}
