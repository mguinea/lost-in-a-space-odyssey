var hal = [
    0,      // 0: x
    0,      // 1: y
    14,     // 2: w
    21,     // 3: h
    0,      // 4: state {0: idle, 1: walking, 2: acting}
    2,      // 5: index position up, down, left, right
];

function updateHal(){
    hal[0] = player[0] - cam[0] + shipPositions[hal[5]][0];
    hal[1] = player[1] - cam[1] + shipPositions[hal[5]][1] + 9;
}

function drawHal(){
    var bounceY = Math.sin(t * 10);
    // Body
    ctx.fillStyle   = '#0C2032';
    ctx.fillRect(hal[0], hal[1] + bounceY, hal[2], hal[3]);
    // Legs
    //setContextAtrribute(44, 1);
    ctx.fillStyle   = '#0C2032';
    ctx.fillRect(hal[0] + 2, hal[1] - 15 + 20, 4, 20);
    ctx.fillRect(hal[0] + 8, hal[1] - 15 + 20, 4, 20);
    // Arms
    ctx.fillRect(hal[0] - 3, hal[1] + 9 + bounceY, 3, 8);
    ctx.fillRect(hal[0] + 14, hal[1] + 9 + bounceY, 3, 8);
    // Eye
    //var grd = ctx.createRadialGradient(hal[0] + 8, hal[1] + 12, 0, hal[0] + 8, hal[1] + 10, 7);
    var grd=ctx.createRadialGradient(1, 50,5,90,60,100);
    grd.addColorStop(0, "#c0392b");
    grd.addColorStop(1, "#01080E");
    ctx.fillStyle = grd;
    ctx.fillStyle = "#c0392b";
    ctx.beginPath();
    ctx.arc(hal[0] + 8, hal[1] + 12 + bounceY, 5, 0, Math.PI * 2, true);
    ctx.fill();
    // Eye center
    ctx.fillStyle   = '#f1c40f';
    ctx.beginPath();
    ctx.arc(hal[0] + 8, hal[1] + 12 + bounceY, 1, 0, Math.PI * 2, true);
    ctx.fill();
}
