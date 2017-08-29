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
	var pts = [
		[0, 0],
		[-2, 2],
		[-1, 3],
		[0, 2],
		[0, 7],
		[1, 7],
		[1, 4],
		[2, 4],
		[2, 7],
		[3, 7],
		[3, 2],
		[4, 3],
		[5, 2],
		[3, 0],
		[2, 0],
		[2,-1],
		[3,-1],
		[3,-4],
		[0,-4],
		[0,-1],
		[1,-1],
		[1, 0],
		[0, 0]
	];
	setContextAtrribute(4, 1);
	setContextAtrribute(17, 0);
	ctx.lineWidth = 3;
	strokePath(e[0], e[1], e[3], pts, 3).fill();
}

function createPassengers(n){
	for(var i = n - 1; i >= 0; --i){
		passengers.push([
			128,
			128,
			20,
			random(0, 360)
		]);
	}
}
