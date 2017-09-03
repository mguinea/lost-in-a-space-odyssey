/* Tuple structure */
// 0: x
// 1: y
// 2: radius
// 3: angle (in degrees)
// 4: vel
// 5: timer end
// 6: alpha
// 7: colors
// 8: shape (0 stroke Circle, 1 fill Circle, 2 stroke Rect, 3 fill Rect)
// 9: state (0 dead, 1 active)
// 10: Selected color on spawn

function updateParticle(e){
	if(e[9] == 1){
		// Detroy if timer ends
		if(t > e[5]){
			e[9] = 0;
		}
		// Move
		e[0] += e[4] * Math.cos((e[3]).toRad()) * dt;
		e[1] += e[4] * Math.sin((e[3]).toRad()) * dt;
	}
}

function drawParticle(e){
	if(e[9] == 1){
		ctx.lineWidth = 1;
		setContextAtrribute(e[10], 0);
		setContextAtrribute(e[10], 1);
		if(e[8] == 0){ strokeCircle(e[0], e[1], e[2]); }
		else if(e[8] == 1){ fillCircle(e[0], e[1], e[2]); }
		else if(e[8] == 2){ strokeRectangle(e[0], e[1], e[2], e[2], e[3]); }
		else if(e[8] == 3){ fillRectangle(e[0], e[1], e[2], e[2], e[3]); }
	}
}

function initParticles(){
	// Add max possible simultaneous particles in game
	for(var i = 50; i > 0; --i){
		particles.push([0,0,0,0,0,0,0,0,0,0]);
	}
}

function spawnParticle(particle){
	for(var i = particles.length - 1; i >= 0; --i){
		// If particle dead.. recycle it
		if(particles[i][9] == 0){
			for(var j = 8; j >= 0; --j){
				particles[i][j] = particle[j];
			}
			particles[i][9] = 1;
			var indexColor = ~~random(0, particles[i][7].length-1);
			particles[i][10] = particles[i][7][indexColor];
			i = -1;
		}
	}
}
