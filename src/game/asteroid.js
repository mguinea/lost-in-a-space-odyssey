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
	// Go where forces say
    e[0] += e[4] * dt;
    e[1] += e[5] * dt;
    // Rotate
	e[3]+= 10 * dt;
	// If collides with player bullet, destroy bullet
    for( var i = playerBullets.length - 1 ; i >= 0; --i){
        var distanceToPlayerBullet = distanceTo(e, playerBullets[i]);
        if(distanceToPlayerBullet <= 0){
            // Remove bullet
			playerBullets.splice(i--, 1);
        }
    }
    // If laser insersection collides
    var mpInWorld = getMousePositionInWorld();
    if(mouse[3] === 2 && collides([mpInWorld[0], mpInWorld[1], 2], e) && player[14] > 0){
        // Decrease asteroid life
        e[6] -= 100 * dt;
        // Particles when damaged
        var particle = [
                mpInWorld[0],
                mpInWorld[1],
                random(6, 12),
                random(0, 360),
                random(25, 25),
                t + random(0.6, 1.0),
                1,
                [14],
                2
            ];
        spawnParticle(particle);
    }

    // Dead
    if(e[6]<= 0){
        // Spawn item score
        // If rand, spawn powerup
        if(random(0, 10) > 9){
            itemsScore.push([e[0], e[1], 16, 0]);
        }
        // Sound
        play(Aexplosion2);
        // Add new asteroids
        var scale = e[7] / 2; // change scale
        if(scale >= 0.5){
            asteroids.push( [e[0] + random(e[2] * scale, e[2]), e[1] + random(e[2] * scale, e[2]), e[2] * scale, random(0, 360), 0, 0, 150, scale] );
            asteroids.push( [e[0] - random(e[2] * scale, e[2]), e[1] - random(e[2] * scale, e[2]), e[2] * scale, random(0, 360), 0, 0, 150, scale] );
        }
        // Remove
        asteroids.splice(j--, 1);
    }
}

function drawAsteroid(e){
	setContextAtrribute(24, 0);
	setContextAtrribute(25, 1);
	ctx.lineWidth = 10;
	strokePath(e[0], e[1], e[3], scalePath(asteroidPts, e[7]), 26).fill();
}
