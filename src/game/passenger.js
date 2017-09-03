/* Tuple structure */
// 0: x
// 1: y
// 2: radius
// 3: angle (in degrees)

function updatePassenger(e){
	e[1] += Math.sin(t*5)*0.5;
	e[3] += 64 * dt;
}

function drawPassenger(e){
	setContextAtrribute(4, 1);
	setContextAtrribute(17, 0);
	ctx.lineWidth = 3;
	strokePath(e[0], e[1], e[3], passengerPts, 3).fill();
}
