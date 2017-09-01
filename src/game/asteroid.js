/* Tuple structure */
// 0: x
// 1: y
// 2: radius
// 3: angle (in degrees)
// 4: force X
// 5: force Y
// 6: life
// 7: scale
function updateAsteroid(e, params, j){
	// Move orbit
	/*
    var op = getOrbitPosition(stars[0], e[3], stars[0][2] + e[2] + 128); // origin, angle, distance
    e[0] = op[0];
    e[1] = op[1];
	//*/
	// Go where forces say
    e[0] += e[4] * dt;
    e[1] += e[5] * dt;

	e[3]+= 10 * dt;

	// If collides with player bullet, destroy
    for( var i = playerBullets.length - 1 ; i >= 0; --i){
        var distanceToPlayerBullet = distanceTo(e, playerBullets[i]);
        if(distanceToPlayerBullet <= 0){
            // Sound
            play(Aexplosion2);
            // Particles when die
            for(var i = 3; i >= 0; --i){
                var particle = [
                        e[0],
                        e[1],
                        random(e[2] / 2, e[2]),
                        random(0, 360),
                        random(7, 25),
                        t + random(0.6, 1.0),
                        1,
                        [14],
                        2
                    ];
                spawnParticle(particle);
            }
			// Add new asteroids
			var scale = e[7] / 2; // change scale
			if(scale >= 0.5){
				asteroids.push( [e[0] + random(e[2] * scale, e[2]), e[1] + random(e[2] * scale, e[2]), e[2] * scale, random(0, 360), 0, 0, 100, scale] );
				asteroids.push( [e[0] - random(e[2] * scale, e[2]), e[1] - random(e[2] * scale, e[2]), e[2] * scale, random(0, 360), 0, 0, 100, scale] );
			}
            // Remove
            playerBullets.splice(i--, 1);
            asteroids.splice(j--, 1);
        }
    }
}

function drawAsteroid(e){
	setContextAtrribute(24, 0);
	setContextAtrribute(25, 1);
	ctx.lineWidth = 10;
	strokePath(e[0], e[1], e[3], scalePath(asteroidPts, e[7]), 26).fill();

	/*
	setContextAtrribute(22, 0);
	ctx.lineWidth = 2;
	strokeCircle(e[0], e[1], e[2]);
	//*/
}
