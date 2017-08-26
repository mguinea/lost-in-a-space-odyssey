var hal = [
    0,      // 0: x
    0,      // 1: y
    14,     // 2: w
    21,     // 3: h
    0,      // 4: state {0: idle, 1: walking, 2: acting}
    2,      // 5: index position up, down, left, right
];

function updateHal(){
    /*var px  = player[0] - cam[0],
        py  = player[1] - cam[1];
        r   = player[2]
        a   = player[3];*/

    goToPosition(hal[5]);
}

function goToPosition(position){
    // First, go to center
    var cx = 0 - cam[0],
        cy = 0 - cam[1];
    // If center reached, go to position
    hal[0] = player[0] - cam[0] + shipPositions[position][0];
    hal[1] = player[1] - cam[1] + shipPositions[position][1] + 9;
}

function drawHal(){
    var bounceY = Math.sin(t * 10);
    // Body
    ctx.fillStyle   = '#324C4E';
    ctx.fillRect(hal[0], hal[1] + bounceY, hal[2], hal[3]);
    // Legs
    setContextAtrribute(44, 1);
    ctx.fillRect(hal[0] + 2, hal[1] - 15 + 20, 4, 20);
    ctx.fillRect(hal[0] + 8, hal[1] - 15 + 20, 4, 20);
    // Eye
    /*var grd = ctx.createRadialGradient(hx + 8, hal[1] + 12, 0, hx + 8, hy + 10, 7);
    grd.addColorStop(0, "#c0392b");
    grd.addColorStop(1, "#01080E");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(hal[0] + 8, hy + 12, 6, 0, Math.PI * 2, true);
    ctx.fill();
*/
    ctx.fillStyle   = '#f1c40f';
    ctx.beginPath();
    ctx.arc(hal[0] + 8, hal[1] + 12 + bounceY, 1, 0, Math.PI * 2, true);
    ctx.fill();
}
