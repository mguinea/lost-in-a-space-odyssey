/* Tuple structure */
// 0: x
// 1: y
// 2: radius
// 3: angle (in degrees)
// 4: color
// 5: rotation velocity


function updatePlanet( e, s ){
    // Move orbit
    var op = getOrbitPosition(stars[0], e[3], stars[0][2] + e[2] + 128); // origin, angle, distance
    e[0] = op[0];
    e[1] = op[1];
    // Rotate
    e[3] += e[5] * dt;
}

function drawPlanet( e, s ){
    setContextAtrribute(e[4], 1);
    fillCircle(e[0], e[1], e[2]);
}
